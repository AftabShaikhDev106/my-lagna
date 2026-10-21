import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { OtpVerificationScreen } from './OtpVerificationScreen';

type Props = NativeStackScreenProps<AuthStackParamList, 'Otp'>;

export const OtpScreen: React.FC<Props> = (props) => {
  return <OtpVerificationScreen {...props} />;
};
