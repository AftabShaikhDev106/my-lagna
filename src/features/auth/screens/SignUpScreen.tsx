import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { LoginScreen } from './LoginScreen';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

export const SignUpScreen: React.FC<Props> = ({ navigation, route }) => {
  const registerRoute = {
    ...route,
    params: {
      ...route.params,
      mode: 'register' as const,
    },
  };

  return (
    <LoginScreen
      navigation={navigation as unknown as NativeStackScreenProps<AuthStackParamList, 'Login'>['navigation']}
      route={registerRoute as unknown as NativeStackScreenProps<AuthStackParamList, 'Login'>['route']}
    />
  );
};
