import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { fontFamilies } from '../../theme/typography';

interface StepProgressBarProps {
  currentStep: number;
  totalSteps?: number;
  onBackPress: () => void;
  showBack?: boolean;
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({
  currentStep,
  totalSteps = 13,
  onBackPress,
  showBack = true,
}) => {
  const theme = useTheme();

  // Progress percentage (bounded between 0 and 100%)
  const progressPercent = Math.min(
    Math.max((currentStep / totalSteps) * 100, 0),
    100,
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Back Arrow */}
        {showBack ? (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            activeOpacity={0.7}
          >
            <ArrowLeft size={22} color={theme.colors.text} />
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        {/* Center Progress Bar */}
        <View style={styles.progressTrackContainer}>
          <View
            style={[
              styles.progressTrackBg,
              { backgroundColor: theme.colors.border },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progressPercent}%`,
                  backgroundColor: theme.colors.primary,
                },
              ]}
            />
          </View>
        </View>

        {/* Right Step Counter Fraction (e.g., 2/13) */}
        <View style={styles.counterWrapper}>
          <Text
            style={[styles.counterText, { color: theme.colors.primary }]}
          >
            {currentStep}/{totalSteps}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backPlaceholder: {
    width: 36,
    height: 36,
  },
  progressTrackContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  progressTrackBg: {
    height: 4,
    borderRadius: 2,
    width: '100%',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  counterWrapper: {
    minWidth: 36,
    alignItems: 'flex-end',
  },
  counterText: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
  },
});
