export interface User {
  id: string;
  email: string;
  role: 'admin' | 'pilot';
  name: string;
  created_at: string;
}

export interface Bin {
  id: string;
  bin_id: string;
  type: 'recyclables' | 'organic' | 'hazardous';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  fill_level: number;
  pilot_id?: string;
  last_updated: string;
  images?: string[];
}

export interface Pilot {
  id: string;
  name: string;
  email: string;
  assigned_bins: string[];
  current_location?: {
    lat: number;
    lng: number;
  };
  performance: {
    bins_collected_today: number;
    bins_pending: number;
    total_distance: number;
  };
}

export interface Alert {
  id: string;
  bin_id: string;
  type: 'almost_full' | 'full';
  message: string;
  created_at: string;
  acknowledged: boolean;
}

export const BIN_TYPES = {
  recyclables: {
    color: '#3B82F6',
    label: 'Recyclables',
    bgColor: 'bg-blue-500'
  },
  organic: {
    color: '#10B981',
    label: 'Organic',
    bgColor: 'bg-green-500'
  },
  hazardous: {
    color: '#EF4444',
    label: 'Hazardous',
    bgColor: 'bg-red-500'
  }
} as const;