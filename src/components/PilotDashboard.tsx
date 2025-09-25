import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockBins, mockAlerts } from '../data/mockData';
import { Bin, Alert, BIN_TYPES } from '../types';
import { 
  MapPin, 
  Navigation, 
  Camera, 
  AlertTriangle, 
  Trash2, 
  LogOut,
  Bell,
  CheckCircle,
  Upload
} from 'lucide-react';

const PilotDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [assignedBins, setAssignedBins] = useState<Bin[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);

  useEffect(() => {
    fetchAssignedBins();
    fetchAlerts();
  }, [user]);

  const fetchAssignedBins = async () => {
    if (!user) return;
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const userBins = mockBins
        .filter(bin => bin.pilot_id === user.id)
        .sort((a, b) => b.fill_level - a.fill_level);
      
      setAssignedBins(userBins);
    } catch (error) {
      console.error('Error fetching assigned bins:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAlerts = async () => {
    if (!user) return;
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const userBinIds = assignedBins.map(b => b.bin_id);
      const userAlerts = mockAlerts
        .filter(alert => userBinIds.includes(alert.bin_id) && !alert.acknowledged)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      setAlerts(userAlerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const updateBinStatus = async (binId: string, newFillLevel: number) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      // Update local state
      setAssignedBins(bins => 
        bins.map(bin => 
          bin.id === binId 
            ? { ...bin, fill_level: newFillLevel, last_updated: new Date().toISOString() }
            : bin
        )
      );
      
      // Remove related alerts when bin is collected
      if (newFillLevel === 0) {
        const binData = assignedBins.find(b => b.id === binId);
        if (binData) {
          setAlerts(alerts => alerts.filter(alert => alert.bin_id !== binData.bin_id));
        }
      }
    } catch (error) {
      console.error('Error updating bin status:', error);
    }
  };

  const markBinAsCollected = async (binId: string) => {
    await updateBinStatus(binId, 0);
  };

  const getDirections = (bin: Bin) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${bin.location.lat},${bin.location.lng}`;
    window.open(url, '_blank');
  };

  const getStats = () => {
    const totalAssigned = assignedBins.length;
    const needsAttention = assignedBins.filter(b => b.fill_level >= 80).length;
    const collected = assignedBins.filter(b => b.fill_level === 0).length;
    
    return { totalAssigned, needsAttention, collected };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Trash2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Pilot Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {alerts.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {alerts.length}
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assigned Bins</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalAssigned}</p>
              </div>
              <MapPin className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Need Attention</p>
                <p className="text-2xl font-bold text-red-600">{stats.needsAttention}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Collected Today</p>
                <p className="text-2xl font-bold text-green-600">{stats.collected}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Priority Alerts</h2>
            <div className="space-y-3">
              {alerts.map(alert => (
                <div key={alert.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="font-medium text-red-900">{alert.message}</p>
                      <p className="text-sm text-red-600">Bin ID: {alert.bin_id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const bin = assignedBins.find(b => b.bin_id === alert.bin_id);
                      if (bin) getDirections(bin);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Navigate
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assigned Bins */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Assigned Bins</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {assignedBins.map(bin => (
              <div key={bin.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-4 h-4 rounded-full ${BIN_TYPES[bin.type].bgColor}`}
                    ></div>
                    <div>
                      <p className="font-medium text-gray-900">{bin.bin_id}</p>
                      <p className="text-sm text-gray-600">{BIN_TYPES[bin.type].label}</p>
                    </div>
                  </div>
                  {bin.fill_level >= 80 && (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Fill Level</span>
                    <span className={`text-sm font-medium ${
                      bin.fill_level >= 100 ? 'text-red-600' : 
                      bin.fill_level >= 80 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {bin.fill_level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        bin.fill_level >= 100 ? 'bg-red-500' : 
                        bin.fill_level >= 80 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${bin.fill_level}%` }}
                    ></div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{bin.location.address}</p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => getDirections(bin)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    Navigate
                  </button>
                  
                  {bin.fill_level > 0 && (
                    <button
                      onClick={() => markBinAsCollected(bin.id)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Collect
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      setSelectedBin(bin);
                      setShowImageUpload(true);
                    }}
                    className="px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload Modal */}
        {showImageUpload && selectedBin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Upload Image - {selectedBin.bin_id}
                </h3>
                <button
                  onClick={() => setShowImageUpload(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  Choose File
                </label>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowImageUpload(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PilotDashboard;