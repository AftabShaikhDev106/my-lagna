import { z } from 'zod';

export const loginSchema = z.object({
  emailOrPhone: z.string().min(3, 'Please enter a valid email or 10-digit mobile number'),
});

export const signUpSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
});

export const otpSchema = z.object({
  otp: z.string().length(4, 'OTP must be exactly 4 digits'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
