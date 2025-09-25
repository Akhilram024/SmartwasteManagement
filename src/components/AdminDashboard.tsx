import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockBins, mockAlerts, mockPilots } from '../data/mockData';
import { Bin, Alert, Pilot, BIN_TYPES } from '../types';
import { 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Trash2, 
  LogOut,
  Bell,
  Eye,
  Navigation
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [bins, setBins] = useState<Bin[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [pilots, setPilots] = useState<Pilot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setBins(mockBins);
      setAlerts(mockAlerts.filter(alert => !alert.acknowledged));
      setPilots(mockPilots);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    const totalBins = bins.length;
    const almostFull = bins.filter(b => b.fill_level >= 80 && b.fill_level < 100).length;
    const full = bins.filter(b => b.fill_level >= 100).length;
    const activePilots = pilots.length;
    
    return { totalBins, almostFull, full, activePilots };
  };

  const stats = getStats();

  const acknowledgeAlert = async (alertId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 200));
      setAlerts(alerts.filter(a => a.id !== alertId));
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    }
  };

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
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bins</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBins}</p>
              </div>
              <MapPin className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Almost Full</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.almostFull}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Full Bins</p>
                <p className="text-2xl font-bold text-red-600">{stats.full}</p>
              </div>
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Pilots</p>
                <p className="text-2xl font-bold text-green-600">{stats.activePilots}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Alerts</h2>
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
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Acknowledge
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bins List */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">All Bins</h2>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {bins.map(bin => (
                <div
                  key={bin.id}
                  className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedBin(bin)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-4 h-4 rounded-full ${BIN_TYPES[bin.type].bgColor}`}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-900">{bin.bin_id}</p>
                        <p className="text-sm text-gray-600">{BIN_TYPES[bin.type].label}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${
                        bin.fill_level >= 100 ? 'text-red-600' : 
                        bin.fill_level >= 80 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {bin.fill_level}%
                      </p>
                      <p className="text-sm text-gray-500">{bin.location.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pilot Performance */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Pilot Performance</h2>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {pilots.map(pilot => (
                <div key={pilot.id} className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{pilot.name}</h3>
                    <span className="text-sm text-gray-500">
                      {pilot.performance.bins_collected_today} bins today
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Pending: {pilot.performance.bins_pending}</span>
                    <span>Distance: {pilot.performance.total_distance}km</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Bin Details Modal */}
        {selectedBin && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Bin Details - {selectedBin.bin_id}
                </h3>
                <button
                  onClick={() => setSelectedBin(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${BIN_TYPES[selectedBin.type].bgColor}`}></div>
                  <span>{BIN_TYPES[selectedBin.type].label}</span>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Fill Level</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className={`h-2 rounded-full ${
                        selectedBin.fill_level >= 100 ? 'bg-red-500' : 
                        selectedBin.fill_level >= 80 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${selectedBin.fill_level}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{selectedBin.fill_level}%</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Location</p>
                  <p className="text-sm text-gray-600">{selectedBin.location.address}</p>
                  <p className="text-xs text-gray-500">
                    {selectedBin.location.lat}, {selectedBin.location.lng}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Last Updated</p>
                  <p className="text-sm text-gray-600">
                    {new Date(selectedBin.last_updated).toLocaleString()}
                  </p>
                </div>
                
                {selectedBin.images && selectedBin.images.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Images</p>
                    <div className="flex gap-2 mt-2">
                      {selectedBin.images.map((image, idx) => (
                        <div key={idx} className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;