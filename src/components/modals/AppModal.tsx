import React from 'react';
import {
  Modal as RNModal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { X } from 'lucide-react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from '../common/AppText';

export interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  contentStyle?: ViewStyle;
}

export const AppModal: React.FC<AppModalProps> = ({
  visible,
  onClose,
  title,
  children,
  contentStyle,
}) => {
  const theme = useTheme();

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            padding: theme.spacing.lg,
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={[
                {
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.radius.xl,
                  padding: theme.spacing.lg,
                  ...theme.shadows.lg,
                },
                contentStyle,
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: theme.spacing.md,
                }}
              >
                {title ? <AppText variant="h3">{title}</AppText> : <View />}
                <TouchableOpacity onPress={onClose} style={{ padding: 4 }}>
                  <X size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};
