import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { fontFamilies } from '../../theme/typography';

interface HeightRulerPickerProps {
  selectedHeight: string; // e.g. "5'8\""
  onHeightChange: (height: string) => void;
}

const HEIGHTS = [
  `4'8"`, `4'9"`, `4'10"`, `4'11"`,
  `5'0"`, `5'1"`, `5'2"`, `5'3"`, `5'4"`, `5'5"`, `5'6"`, `5'7"`,
  `5'8"`, `5'9"`, `5'10"`, `5'11"`,
  `6'0"`, `6'1"`, `6'2"`, `6'3"`, `6'4"`, `6'5"`, `6'6"`
];

export const HeightRulerPicker: React.FC<HeightRulerPickerProps> = ({
  selectedHeight,
  onHeightChange,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Top Display Value */}
      <View style={styles.headerDisplay}>
        <Text style={[styles.selectedText, { color: theme.colors.primary }]}>
          {selectedHeight}
        </Text>
      </View>

      {/* Vertical Ruler Scroll Card */}
      <View
        style={[
          styles.rulerCard,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {HEIGHTS.map((h) => {
            const isSelected = h === selectedHeight;
            return (
              <TouchableOpacity
                key={h}
                onPress={() => onHeightChange(h)}
                style={[
                  styles.heightRow,
                  isSelected && {
                    backgroundColor: theme.colors.primarySoft,
                    borderRadius: 8,
                  },
                ]}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.heightText,
                    {
                      fontFamily: isSelected
                        ? fontFamilies.bold
                        : fontFamilies.regular,
                      fontSize: isSelected ? 18 : 14,
                      color: isSelected
                        ? theme.colors.primary
                        : theme.colors.textMuted,
                    },
                  ]}
                >
                  {h}
                </Text>
                {isSelected ? (
                  <Text style={[styles.arrowIndicator, { color: theme.colors.primary }]}>
                    ➔
                  </Text>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 12,
  },
  headerDisplay: {
    marginBottom: 16,
    alignItems: 'center',
  },
  selectedText: {
    fontFamily: fontFamilies.bold,
    fontSize: 42,
    lineHeight: 50,
  },
  rulerCard: {
    width: 220,
    height: 240,
    borderRadius: 16,
    borderWidth: 1.5,
    overflow: 'hidden',
    paddingVertical: 8,
  },
  scrollContent: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  heightRow: {
    width: 180,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  heightText: {
    textAlign: 'center',
  },
  arrowIndicator: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
