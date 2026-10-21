import { InterestItem } from '../../types/common';
import { MOCK_PROFILES } from './mockProfiles';

export const MOCK_INTERESTS: InterestItem[] = [
  {
    id: 'int_01',
    profile: MOCK_PROFILES[0],
    status: 'accepted',
    type: 'received',
    timestamp: '2 hours ago',
  },
  {
    id: 'int_02',
    profile: MOCK_PROFILES[1],
    status: 'pending',
    type: 'received',
    timestamp: 'Yesterday',
  },
  {
    id: 'int_03',
    profile: MOCK_PROFILES[2],
    status: 'pending',
    type: 'sent',
    timestamp: '3 days ago',
  },
];
