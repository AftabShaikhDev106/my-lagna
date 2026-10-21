import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { fontFamilies } from '../../theme/typography';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  error?: string;
  countryCode?: string;
  onCountryCodePress?: () => void;
  containerStyle?: ViewStyle;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChangeText,
  label = 'Phone Number',
  error,
  countryCode = '+91',
  onCountryCodePress,
  containerStyle,
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  // Clean numeric string input (max 10 digits)
  const handleChangeText = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
    onChangeText(cleaned);
  };

  const borderColor = error
    ? theme.colors.error
    : isFocused
    ? theme.colors.primary
    : theme.colors.border;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? (
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.colors.surface,
            borderColor,
          },
        ]}
      >
        {/* Country Code Prefix Dropdown Button */}
        <TouchableOpacity
          style={styles.countryCodeButton}
          onPress={onCountryCodePress}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Select Country Code"
        >
          <Text style={[styles.countryCodeText, { color: theme.colors.text }]}>
            {countryCode}
          </Text>
          <ChevronDown
            size={16}
            color={theme.colors.textSecondary}
            style={styles.chevron}
          />
        </TouchableOpacity>

        {/* Vertical Divider */}
        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

        {/* Text Input */}
        <TextInput
          style={[styles.input, { color: theme.colors.text }]}
          placeholder="Enter your mobile number"
          placeholderTextColor={theme.colors.textMuted}
          value={value}
          onChangeText={handleChangeText}
          keyboardType="phone-pad"
          maxLength={10}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityLabel="Phone Number Input"
        />
      </View>

      {error ? (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  countryCodeText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 15,
  },
  chevron: {
    marginLeft: 4,
  },
  divider: {
    width: 1,
    height: 24,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: fontFamilies.regular,
    fontSize: 15,
    paddingVertical: 0,
  },
  errorText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    marginTop: 4,
  },
});
