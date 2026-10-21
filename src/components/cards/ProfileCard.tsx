import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { CheckCircle2, MapPin, Briefcase, Heart } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from '../common/AppText';
import { UserProfile } from '../../types/common';

export interface ProfileCardProps {
  profile: UserProfile;
  onPress: () => void;
  onConnectPress?: () => void;
  style?: ViewStyle;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onPress,
  onConnectPress,
  style,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.xl,
          overflow: 'hidden',
          marginBottom: theme.spacing.lg,
          borderWidth: 1,
          borderColor: theme.colors.border,
          ...theme.shadows.sm,
        },
        style,
      ]}
    >
      <View style={{ height: 240, width: '100%', backgroundColor: theme.colors.surfaceElevated }}>
        {profile.photos[0] ? (
          <Image
            source={{ uri: profile.photos[0] }}
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          />
        ) : null}

        {profile.matchScore ? (
          <View
            style={{
              position: 'absolute',
              top: theme.spacing.sm,
              right: theme.spacing.sm,
              backgroundColor: 'rgba(0,0,0,0.65)',
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: 4,
              borderRadius: theme.radius.full,
            }}
          >
            <AppText variant="label" color={theme.colors.white}>
              {profile.matchScore}% Match
            </AppText>
          </View>
        ) : null}
      </View>

      <View style={{ padding: theme.spacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <AppText variant="h3" numberOfLines={1}>
              {profile.name}, {profile.age}
            </AppText>
            {profile.isVerified ? (
              <CheckCircle2
                size={18}
                color={theme.colors.primary}
                style={{ marginLeft: theme.spacing.xs }}
              />
            ) : null}
          </View>

          <AppText variant="caption" color={theme.colors.textSecondary}>
            {profile.height}
          </AppText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: theme.spacing.xs,
          }}
        >
          <Briefcase size={14} color={theme.colors.textSecondary} />
          <AppText
            variant="caption"
            color={theme.colors.textSecondary}
            numberOfLines={1}
            style={{ marginLeft: 6 }}
          >
            {profile.profession} • {profile.education}
          </AppText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: theme.spacing.xs,
          }}
        >
          <MapPin size={14} color={theme.colors.textSecondary} />
          <AppText
            variant="caption"
            color={theme.colors.textSecondary}
            style={{ marginLeft: 6 }}
          >
            {profile.location}
          </AppText>
        </View>

        {onConnectPress ? (
          <View style={{ marginTop: theme.spacing.md }}>
            <TouchableOpacity
              onPress={onConnectPress}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.primarySoft,
                paddingVertical: theme.spacing.sm,
                borderRadius: theme.radius.full,
              }}
            >
              <Heart size={16} color={theme.colors.primary} />
              <AppText
                variant="button"
                color={theme.colors.primary}
                style={{ marginLeft: theme.spacing.xs, fontSize: 14 }}
              >
                Send Interest
              </AppText>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
