import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { fontFamilies } from '../../theme/typography';

interface WheelDatePickerProps {
  day: string;
  month: string;
  year: string;
  onDateChange: (date: { day: string; month: string; year: string }) => void;
}

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const YEARS = Array.from({ length: 45 }, (_, i) => String(2008 - i));

export const WheelDatePicker: React.FC<WheelDatePickerProps> = ({
  day,
  month,
  year,
  onDateChange,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.pickerCard,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
      >
        {/* Active Selection Highlight Bar */}
        <View
          style={[
            styles.activeRowHighlight,
            {
              borderColor: theme.colors.primary,
              backgroundColor: theme.colors.primarySoft,
            },
          ]}
        />

        <View style={styles.columnsRow}>
          {/* Day Column */}
          <View style={styles.column}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.columnContent}
            >
              {DAYS.map((d) => {
                const isSelected = d === day;
                return (
                  <TouchableOpacity
                    key={d}
                    onPress={() => onDateChange({ day: d, month, year })}
                    style={styles.itemButton}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        {
                          fontFamily: isSelected
                            ? fontFamilies.bold
                            : fontFamilies.regular,
                          fontSize: isSelected ? 22 : 16,
                          color: isSelected
                            ? theme.colors.primary
                            : theme.colors.textMuted,
                        },
                      ]}
                    >
                      {d}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Month Column */}
          <View style={styles.column}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.columnContent}
            >
              {MONTHS.map((m) => {
                const isSelected = m === month;
                return (
                  <TouchableOpacity
                    key={m}
                    onPress={() => onDateChange({ day, month: m, year })}
                    style={styles.itemButton}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        {
                          fontFamily: isSelected
                            ? fontFamilies.bold
                            : fontFamilies.regular,
                          fontSize: isSelected ? 22 : 16,
                          color: isSelected
                            ? theme.colors.primary
                            : theme.colors.textMuted,
                        },
                      ]}
                    >
                      {m}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Year Column */}
          <View style={styles.column}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.columnContent}
            >
              {YEARS.map((y) => {
                const isSelected = y === year;
                return (
                  <TouchableOpacity
                    key={y}
                    onPress={() => onDateChange({ day, month, year: y })}
                    style={styles.itemButton}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        {
                          fontFamily: isSelected
                            ? fontFamilies.bold
                            : fontFamilies.regular,
                          fontSize: isSelected ? 22 : 16,
                          color: isSelected
                            ? theme.colors.primary
                            : theme.colors.textMuted,
                        },
                      ]}
                    >
                      {y}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 16,
  },
  pickerCard: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    borderWidth: 1.5,
    overflow: 'hidden',
    position: 'relative',
  },
  activeRowHighlight: {
    position: 'absolute',
    top: 86,
    left: 12,
    right: 12,
    height: 48,
    borderRadius: 10,
    borderWidth: 1.5,
    zIndex: 1,
  },
  columnsRow: {
    flex: 1,
    flexDirection: 'row',
    zIndex: 2,
  },
  column: {
    flex: 1,
    height: '100%',
  },
  columnContent: {
    paddingVertical: 84,
    alignItems: 'center',
  },
  itemButton: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  itemText: {
    textAlign: 'center',
  },
});
