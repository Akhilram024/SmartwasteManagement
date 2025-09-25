import { User, Bin, Alert, Pilot } from '../types';

// Mock users data
export const mockUsers: User[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    email: 'admin@smartwaste.com',
    role: 'admin',
    name: 'Admin User',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    email: 'admin2@smartwaste.com',
    role: 'admin',
    name: 'Sarah Wilson',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    email: 'pilot1@smartwaste.com',
    role: 'pilot',
    name: 'John Rodriguez',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    email: 'pilot2@smartwaste.com',
    role: 'pilot',
    name: 'Maria Garcia',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    email: 'pilot3@smartwaste.com',
    role: 'pilot',
    name: 'David Chen',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '66666666-6666-6666-6666-666666666666',
    email: 'pilot4@smartwaste.com',
    role: 'pilot',
    name: 'Lisa Johnson',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '77777777-7777-7777-7777-777777777777',
    email: 'pilot5@smartwaste.com',
    role: 'pilot',
    name: 'Michael Brown',
    created_at: '2024-01-01T00:00:00Z'
  }
];

// Mock bins data (30 bins across 10 locations)
export const mockBins: Bin[] = [
  // Location 1: Downtown Plaza
  {
    id: 'bin-001',
    bin_id: 'BIN-001',
    type: 'recyclables',
    location: {
      lat: 40.7589,
      lng: -73.9851,
      address: 'Downtown Plaza, 123 Main St'
    },
    fill_level: 85,
    pilot_id: '33333333-3333-3333-3333-333333333333',
    last_updated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-002',
    bin_id: 'BIN-002',
    type: 'organic',
    location: {
      lat: 40.7590,
      lng: -73.9850,
      address: 'Downtown Plaza, 123 Main St'
    },
    fill_level: 45,
    pilot_id: '33333333-3333-3333-3333-333333333333',
    last_updated: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-003',
    bin_id: 'BIN-003',
    type: 'hazardous',
    location: {
      lat: 40.7588,
      lng: -73.9852,
      address: 'Downtown Plaza, 123 Main St'
    },
    fill_level: 100,
    pilot_id: '33333333-3333-3333-3333-333333333333',
    last_updated: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    images: []
  },
  // Location 2: City Park
  {
    id: 'bin-004',
    bin_id: 'BIN-004',
    type: 'recyclables',
    location: {
      lat: 40.7614,
      lng: -73.9776,
      address: 'City Park, Park Avenue'
    },
    fill_level: 65,
    pilot_id: '33333333-3333-3333-3333-333333333333',
    last_updated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-005',
    bin_id: 'BIN-005',
    type: 'organic',
    location: {
      lat: 40.7615,
      lng: -73.9775,
      address: 'City Park, Park Avenue'
    },
    fill_level: 90,
    pilot_id: '33333333-3333-3333-3333-333333333333',
    last_updated: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-006',
    bin_id: 'BIN-006',
    type: 'hazardous',
    location: {
      lat: 40.7613,
      lng: -73.9777,
      address: 'City Park, Park Avenue'
    },
    fill_level: 20,
    pilot_id: '33333333-3333-3333-3333-333333333333',
    last_updated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  // Location 3: Shopping District
  {
    id: 'bin-007',
    bin_id: 'BIN-007',
    type: 'recyclables',
    location: {
      lat: 40.7505,
      lng: -73.9934,
      address: 'Shopping District, 456 Commerce St'
    },
    fill_level: 75,
    pilot_id: '44444444-4444-4444-4444-444444444444',
    last_updated: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-008',
    bin_id: 'BIN-008',
    type: 'organic',
    location: {
      lat: 40.7506,
      lng: -73.9933,
      address: 'Shopping District, 456 Commerce St'
    },
    fill_level: 55,
    pilot_id: '44444444-4444-4444-4444-444444444444',
    last_updated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-009',
    bin_id: 'BIN-009',
    type: 'hazardous',
    location: {
      lat: 40.7504,
      lng: -73.9935,
      address: 'Shopping District, 456 Commerce St'
    },
    fill_level: 80,
    pilot_id: '44444444-4444-4444-4444-444444444444',
    last_updated: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  // Location 4: Residential Area A
  {
    id: 'bin-010',
    bin_id: 'BIN-010',
    type: 'recyclables',
    location: {
      lat: 40.7680,
      lng: -73.9665,
      address: 'Residential Area A, Oak Street'
    },
    fill_level: 40,
    pilot_id: '44444444-4444-4444-4444-444444444444',
    last_updated: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-011',
    bin_id: 'BIN-011',
    type: 'organic',
    location: {
      lat: 40.7681,
      lng: -73.9664,
      address: 'Residential Area A, Oak Street'
    },
    fill_level: 95,
    pilot_id: '44444444-4444-4444-4444-444444444444',
    last_updated: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-012',
    bin_id: 'BIN-012',
    type: 'hazardous',
    location: {
      lat: 40.7679,
      lng: -73.9666,
      address: 'Residential Area A, Oak Street'
    },
    fill_level: 15,
    pilot_id: '44444444-4444-4444-4444-444444444444',
    last_updated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  // Location 5: Industrial Zone
  {
    id: 'bin-013',
    bin_id: 'BIN-013',
    type: 'recyclables',
    location: {
      lat: 40.7448,
      lng: -74.0060,
      address: 'Industrial Zone, Factory Road'
    },
    fill_level: 70,
    pilot_id: '55555555-5555-5555-5555-555555555555',
    last_updated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-014',
    bin_id: 'BIN-014',
    type: 'organic',
    location: {
      lat: 40.7449,
      lng: -74.0059,
      address: 'Industrial Zone, Factory Road'
    },
    fill_level: 30,
    pilot_id: '55555555-5555-5555-5555-555555555555',
    last_updated: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-015',
    bin_id: 'BIN-015',
    type: 'hazardous',
    location: {
      lat: 40.7447,
      lng: -74.0061,
      address: 'Industrial Zone, Factory Road'
    },
    fill_level: 85,
    pilot_id: '55555555-5555-5555-5555-555555555555',
    last_updated: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  // Location 6: University Campus
  {
    id: 'bin-016',
    bin_id: 'BIN-016',
    type: 'recyclables',
    location: {
      lat: 40.7282,
      lng: -73.9942,
      address: 'University Campus, College Ave'
    },
    fill_level: 60,
    pilot_id: '55555555-5555-5555-5555-555555555555',
    last_updated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-017',
    bin_id: 'BIN-017',
    type: 'organic',
    location: {
      lat: 40.7283,
      lng: -73.9941,
      address: 'University Campus, College Ave'
    },
    fill_level: 100,
    pilot_id: '55555555-5555-5555-5555-555555555555',
    last_updated: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-018',
    bin_id: 'BIN-018',
    type: 'hazardous',
    location: {
      lat: 40.7281,
      lng: -73.9943,
      address: 'University Campus, College Ave'
    },
    fill_level: 25,
    pilot_id: '55555555-5555-5555-5555-555555555555',
    last_updated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  // Location 7: Hospital District
  {
    id: 'bin-019',
    bin_id: 'BIN-019',
    type: 'recyclables',
    location: {
      lat: 40.7831,
      lng: -73.9712,
      address: 'Hospital District, Medical Center Dr'
    },
    fill_level: 50,
    pilot_id: '66666666-6666-6666-6666-666666666666',
    last_updated: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-020',
    bin_id: 'BIN-020',
    type: 'organic',
    location: {
      lat: 40.7832,
      lng: -73.9711,
      address: 'Hospital District, Medical Center Dr'
    },
    fill_level: 80,
    pilot_id: '66666666-6666-6666-6666-666666666666',
    last_updated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-021',
    bin_id: 'BIN-021',
    type: 'hazardous',
    location: {
      lat: 40.7830,
      lng: -73.9713,
      address: 'Hospital District, Medical Center Dr'
    },
    fill_level: 90,
    pilot_id: '66666666-6666-6666-6666-666666666666',
    last_updated: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  // Location 8: Sports Complex
  {
    id: 'bin-022',
    bin_id: 'BIN-022',
    type: 'recyclables',
    location: {
      lat: 40.7899,
      lng: -73.9441,
      address: 'Sports Complex, Stadium Way'
    },
    fill_level: 35,
    pilot_id: '66666666-6666-6666-6666-666666666666',
    last_updated: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-023',
    bin_id: 'BIN-023',
    type: 'organic',
    location: {
      lat: 40.7900,
      lng: -73.9440,
      address: 'Sports Complex, Stadium Way'
    },
    fill_level: 70,
    pilot_id: '66666666-6666-6666-6666-666666666666',
    last_updated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-024',
    bin_id: 'BIN-024',
    type: 'hazardous',
    location: {
      lat: 40.7898,
      lng: -73.9442,
      address: 'Sports Complex, Stadium Way'
    },
    fill_level: 100,
    pilot_id: '66666666-6666-6666-6666-666666666666',
    last_updated: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    images: []
  },
  // Location 9: Waterfront
  {
    id: 'bin-025',
    bin_id: 'BIN-025',
    type: 'recyclables',
    location: {
      lat: 40.7061,
      lng: -74.0087,
      address: 'Waterfront, Harbor View Blvd'
    },
    fill_level: 45,
    pilot_id: '77777777-7777-7777-7777-777777777777',
    last_updated: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-026',
    bin_id: 'BIN-026',
    type: 'organic',
    location: {
      lat: 40.7062,
      lng: -74.0086,
      address: 'Waterfront, Harbor View Blvd'
    },
    fill_level: 85,
    pilot_id: '77777777-7777-7777-7777-777777777777',
    last_updated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-027',
    bin_id: 'BIN-027',
    type: 'hazardous',
    location: {
      lat: 40.7060,
      lng: -74.0088,
      address: 'Waterfront, Harbor View Blvd'
    },
    fill_level: 55,
    pilot_id: '77777777-7777-7777-7777-777777777777',
    last_updated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  // Location 10: Airport Area
  {
    id: 'bin-028',
    bin_id: 'BIN-028',
    type: 'recyclables',
    location: {
      lat: 40.6892,
      lng: -74.1745,
      address: 'Airport Area, Terminal Road'
    },
    fill_level: 65,
    pilot_id: '77777777-7777-7777-7777-777777777777',
    last_updated: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-029',
    bin_id: 'BIN-029',
    type: 'organic',
    location: {
      lat: 40.6893,
      lng: -74.1744,
      address: 'Airport Area, Terminal Road'
    },
    fill_level: 95,
    pilot_id: '77777777-7777-7777-7777-777777777777',
    last_updated: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    images: []
  },
  {
    id: 'bin-030',
    bin_id: 'BIN-030',
    type: 'hazardous',
    location: {
      lat: 40.6891,
      lng: -74.1746,
      address: 'Airport Area, Terminal Road'
    },
    fill_level: 75,
    pilot_id: '77777777-7777-7777-7777-777777777777',
    last_updated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    images: []
  }
];

// Mock pilots data
export const mockPilots: Pilot[] = [
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'John Rodriguez',
    email: 'pilot1@smartwaste.com',
    assigned_bins: ['BIN-001', 'BIN-002', 'BIN-003', 'BIN-004', 'BIN-005', 'BIN-006'],
    current_location: {
      lat: 40.7589,
      lng: -73.9851
    },
    performance: {
      bins_collected_today: 8,
      bins_pending: 4,
      total_distance: 15.2
    }
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    name: 'Maria Garcia',
    email: 'pilot2@smartwaste.com',
    assigned_bins: ['BIN-007', 'BIN-008', 'BIN-009', 'BIN-010', 'BIN-011', 'BIN-012'],
    current_location: {
      lat: 40.7505,
      lng: -73.9934
    },
    performance: {
      bins_collected_today: 6,
      bins_pending: 5,
      total_distance: 12.8
    }
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    name: 'David Chen',
    email: 'pilot3@smartwaste.com',
    assigned_bins: ['BIN-013', 'BIN-014', 'BIN-015', 'BIN-016', 'BIN-017', 'BIN-018'],
    current_location: {
      lat: 40.7448,
      lng: -74.0060
    },
    performance: {
      bins_collected_today: 7,
      bins_pending: 6,
      total_distance: 18.5
    }
  },
  {
    id: '66666666-6666-6666-6666-666666666666',
    name: 'Lisa Johnson',
    email: 'pilot4@smartwaste.com',
    assigned_bins: ['BIN-019', 'BIN-020', 'BIN-021', 'BIN-022', 'BIN-023', 'BIN-024'],
    current_location: {
      lat: 40.7831,
      lng: -73.9712
    },
    performance: {
      bins_collected_today: 9,
      bins_pending: 3,
      total_distance: 22.1
    }
  },
  {
    id: '77777777-7777-7777-7777-777777777777',
    name: 'Michael Brown',
    email: 'pilot5@smartwaste.com',
    assigned_bins: ['BIN-025', 'BIN-026', 'BIN-027', 'BIN-028', 'BIN-029', 'BIN-030'],
    current_location: {
      lat: 40.7061,
      lng: -74.0087
    },
    performance: {
      bins_collected_today: 5,
      bins_pending: 7,
      total_distance: 14.3
    }
  }
];

// Mock alerts data
export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    bin_id: 'BIN-001',
    type: 'almost_full',
    message: 'Recyclables bin at Downtown Plaza is 85% full - schedule pickup',
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    acknowledged: false
  },
  {
    id: 'alert-002',
    bin_id: 'BIN-003',
    type: 'full',
    message: 'Hazardous waste bin at Downtown Plaza is 100% full - IMMEDIATE PICKUP REQUIRED',
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    acknowledged: false
  },
  {
    id: 'alert-003',
    bin_id: 'BIN-005',
    type: 'almost_full',
    message: 'Organic bin at City Park is 90% full - schedule pickup',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    acknowledged: false
  },
  {
    id: 'alert-004',
    bin_id: 'BIN-011',
    type: 'almost_full',
    message: 'Organic bin at Residential Area A is 95% full - schedule pickup',
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    acknowledged: false
  },
  {
    id: 'alert-005',
    bin_id: 'BIN-015',
    type: 'almost_full',
    message: 'Hazardous waste bin at Industrial Zone is 85% full - schedule pickup',
    created_at: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    acknowledged: false
  },
  {
    id: 'alert-006',
    bin_id: 'BIN-017',
    type: 'full',
    message: 'Organic bin at University Campus is 100% full - IMMEDIATE PICKUP REQUIRED',
    created_at: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    acknowledged: false
  },
  {
    id: 'alert-007',
    bin_id: 'BIN-021',
    type: 'almost_full',
    message: 'Hazardous waste bin at Hospital District is 90% full - schedule pickup',
    created_at: new Date(Date.now() - 1.2 * 60 * 60 * 1000).toISOString(),
    acknowledged: false
  },
  {
    id: 'alert-008',
    bin_id: 'BIN-024',
    type: 'full',
    message: 'Hazardous waste bin at Sports Complex is 100% full - IMMEDIATE PICKUP REQUIRED',
    created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    acknowledged: false
  },
  {
    id: 'alert-009',
    bin_id: 'BIN-026',
    type: 'almost_full',
    message: 'Organic bin at Waterfront is 85% full - schedule pickup',
    created_at: new Date(Date.now() - 2.5 * 60 * 60 * 1000).toISOString(),
    acknowledged: false
  },
  {
    id: 'alert-010',
    bin_id: 'BIN-029',
    type: 'almost_full',
    message: 'Organic bin at Airport Area is 95% full - schedule pickup',
    created_at: new Date(Date.now() - 1.8 * 60 * 60 * 1000).toISOString(),
    acknowledged: false
  }
];

// Authentication credentials
export const authCredentials = {
  'admin@smartwaste.com': 'password123',
  'admin2@smartwaste.com': 'password123',
  'pilot1@smartwaste.com': 'password123',
  'pilot2@smartwaste.com': 'password123',
  'pilot3@smartwaste.com': 'password123',
  'pilot4@smartwaste.com': 'password123',
  'pilot5@smartwaste.com': 'password123'
};