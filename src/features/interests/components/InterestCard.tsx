import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
  MoreVertical,
  Briefcase,
  MapPin,
  Building2,
  Ruler,
  CheckCircle2,
  Heart,
  Send,
  MessageSquare,
  Star,
} from 'lucide-react-native';
import { InterestProfileItem } from '../data/mockInterestsData';
import { useTheme } from '../../../hooks/useTheme';
import { fontFamilies } from '../../../theme/typography';

interface InterestCardProps {
  item: InterestProfileItem;
  onPressProfile: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  onMessage?: () => void;
  onShortlistToggle?: () => void;
}

export const InterestCard: React.FC<InterestCardProps> = ({
  item,
  onPressProfile,
  onAccept,
  onDecline,
  onMessage,
  onShortlistToggle,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPressProfile}
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
    >
      {/* Upper Info Row */}
      <View style={styles.topSection}>
        {/* Left Photo Avatar */}
        <Image
          source={{ uri: item.photo }}
          style={styles.avatarImage}
          resizeMode="cover"
        />

        {/* Center/Right Info Details */}
        <View style={styles.infoContent}>
          {/* Header Row: Name, Verified Badge, Time & Menu */}
          <View style={styles.headerRow}>
            <View style={styles.nameVerifiedRow}>
              <Text style={[styles.nameText, { color: theme.colors.text }]}>
                {item.name}, {item.age}
              </Text>
              {item.isVerified ? (
                <CheckCircle2 size={16} color="#E05638" fill="#FFF4EE" style={{ marginLeft: 4 }} />
              ) : null}
            </View>

            <View style={styles.headerRightGroup}>
              {item.tabCategory === 'shortlisted' ? (
                <TouchableOpacity onPress={onShortlistToggle} style={{ marginRight: 6 }}>
                  <Star size={18} color="#F57C00" fill="#F57C00" />
                </TouchableOpacity>
              ) : item.time ? (
                <Text style={[styles.timeText, { color: theme.colors.textMuted }]}>
                  {item.time}
                </Text>
              ) : null}
              <MoreVertical size={16} color={theme.colors.textMuted} style={{ marginLeft: 4 }} />
            </View>
          </View>

          {/* Detail Items */}
          <View style={styles.detailsList}>
            <View style={styles.detailRow}>
              <Briefcase size={13} color={theme.colors.textSecondary} style={styles.detailIcon} />
              <Text style={[styles.detailText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                {item.profession}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <MapPin size={13} color={theme.colors.textSecondary} style={styles.detailIcon} />
              <Text style={[styles.detailText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                {item.location}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Building2 size={13} color={theme.colors.textSecondary} style={styles.detailIcon} />
              <Text style={[styles.detailText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                {item.community}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Ruler size={13} color={theme.colors.textSecondary} style={styles.detailIcon} />
              <Text style={[styles.detailText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                {item.heightReligion}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* VARIANT 1: RECEIVED INTERESTS (Tags + Accept & Decline Buttons) */}
      {item.tabCategory === 'received' ? (
        <View style={styles.bottomSection}>
          {item.tags && item.tags.length > 0 ? (
            <View style={styles.tagsRow}>
              {item.tags.map((tag, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.tagPill,
                    { backgroundColor: theme.colors.primarySoft, borderColor: theme.colors.borderLight },
                  ]}
                >
                  <Text style={[styles.tagText, { color: theme.colors.text }]}>{tag}</Text>
                </View>
              ))}
            </View>
          ) : null}

          <View style={styles.actionButtonsRow}>
            {/* Accept Button (Solid Orange) */}
            <TouchableOpacity
              onPress={onAccept}
              activeOpacity={0.8}
              style={[styles.btnBase, styles.acceptBtn, { backgroundColor: theme.colors.primary }]}
            >
              <Heart size={16} color="#FFFFFF" fill="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.acceptBtnText}>Accept</Text>
            </TouchableOpacity>

            {/* Decline Button (Outline Orange) */}
            <TouchableOpacity
              onPress={onDecline}
              activeOpacity={0.8}
              style={[styles.btnBase, styles.declineBtn, { borderColor: theme.colors.primary }]}
            >
              <Text style={[styles.declineBtnText, { color: theme.colors.primary }]}>
                Decline
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      {/* VARIANT 2: SENT INTERESTS (Status Banner: Interest Sent / Waiting for response) */}
      {item.tabCategory === 'sent' ? (
        <View style={styles.bottomSection}>
          <View style={[styles.sentStatusBanner, { backgroundColor: theme.colors.badgeBackground }]}>
            <View style={styles.sentStatusRow}>
              <Send size={15} color={theme.colors.primary} style={{ marginRight: 6 }} />
              <Text style={[styles.sentTitle, { color: theme.colors.primary }]}>
                {item.statusLabel || 'Interest Sent'}
              </Text>
            </View>
            <Text style={[styles.sentSubtext, { color: theme.colors.textSecondary }]}>
              {item.statusSubtext || 'Waiting for response'}
            </Text>
          </View>
        </View>
      ) : null}

      {/* VARIANT 3: ACCEPTED INTERESTS (Accepted Badge + Message Button) */}
      {item.tabCategory === 'accepted' ? (
        <View style={styles.bottomSection}>
          <View style={styles.acceptedRow}>
            {/* Soft Green Accepted Badge */}
            <View style={styles.acceptedBadge}>
              <CheckCircle2 size={14} color="#2E7D32" style={{ marginRight: 4 }} />
              <Text style={styles.acceptedBadgeText}>Accepted</Text>
            </View>

            {/* Green Outline Message Button */}
            <TouchableOpacity
              onPress={onMessage}
              activeOpacity={0.8}
              style={styles.messageBtn}
            >
              <MessageSquare size={14} color="#2E7D32" style={{ marginRight: 6 }} />
              <Text style={styles.messageBtnText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  topSection: {
    flexDirection: 'row',
  },
  avatarImage: {
    width: 82,
    height: 82,
    borderRadius: 12,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  nameVerifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: fontFamilies.bold,
    fontSize: 17,
    lineHeight: 22,
  },
  headerRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
  },
  detailsList: {
    marginTop: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  detailIcon: {
    marginRight: 6,
  },
  detailText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    flex: 1,
  },
  bottomSection: {
    marginTop: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  tagPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
  },
  tagText: {
    fontFamily: fontFamilies.medium,
    fontSize: 11,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  btnBase: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptBtn: {},
  acceptBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  declineBtn: {
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },
  declineBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
  },
  sentStatusBanner: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  sentStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sentTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
  },
  sentSubtext: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    marginTop: 2,
  },
  acceptedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  acceptedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  acceptedBadgeText: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#2E7D32',
  },
  messageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#2E7D32',
  },
  messageBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: '#2E7D32',
  },
});
