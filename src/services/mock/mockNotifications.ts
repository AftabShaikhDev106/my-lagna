import { AppNotification } from '../../types/common';

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_01',
    title: 'New Interest Expressed',
    body: 'Ananya Sharma has expressed interest in your profile.',
    timestamp: '2h ago',
    isRead: false,
    type: 'interest',
    profileId: 'prof_101',
  },
  {
    id: 'notif_02',
    title: 'Match Alert!',
    body: 'You have a 94% mutual preference match with Priya Patel.',
    timestamp: '1d ago',
    isRead: true,
    type: 'match',
    profileId: 'prof_103',
  },
];
