import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Shield,
  Lock,
  CheckCircle2,
  Search,
  MapPin,
  Camera,
  Plus,
  ChevronRight,
  User,
} from 'lucide-react-native';
import { AuthStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { StepProgressBar } from '../../../components/common/StepProgressBar';
import { AppButton } from '../../../components/buttons/AppButton';
import { AppInput } from '../../../components/inputs/AppInput';
import { WheelDatePicker } from '../../../components/inputs/WheelDatePicker';
import { HeightRulerPicker } from '../../../components/inputs/HeightRulerPicker';
import { useProfileCreationStore } from '../../../store/profileCreationStore';
import { useAuthStore } from '../../../store/authStore';
import { useTheme } from '../../../hooks/useTheme';
import { couple1Asset } from '../../../assets';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AuthStackParamList, 'ProfileSetup'>;

const RELIGIONS = [
  { label: 'Hindu', icon: '🕉' },
  { label: 'Muslim', icon: '☪' },
  { label: 'Jain', icon: '🛕' },
  { label: 'Christian', icon: '✝' },
  { label: 'Sikh', icon: '🪯' },
  { label: 'Buddhist', icon: '☸' },
];

const COMMUNITIES = [
  'Maratha',
  'Brahman',
  'CKP',
  'Unbid',
  'Dhangar',
  'Mali',
];

const EDUCATIONS = [
  '10th Pass',
  '12th Pass',
  'Diploma',
  "Bachelor's Degree",
  "Master's Degree",
  'PhD / Doctorate',
  'Other',
];

const OCCUPATIONS = [
  'Software Engineer',
  'Business / Entrepreneur',
  'Doctor / Medical',
  'Banking / Finance',
  'Government Service',
  'Teacher / Professor',
  'Other',
];

const CITIES = [
  'Pune, Maharashtra',
  'Mumbai, Maharashtra',
  'Nashik, Maharashtra',
  'Nagpur, Maharashtra',
  'Aurangabad, Maharashtra',
  'Kolhapur, Maharashtra',
];

export const ProfileSetupWizardScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const login = useAuthStore((state) => state.login);

  const {
    currentStep,
    firstName,
    lastName,
    gender,
    dateOfBirth,
    height,
    religion,
    community,
    education,
    occupation,
    city,
    aboutYou,
    partnerPreferences,
    nextStep,
    prevStep,
    updateData,
  } = useProfileCreationStore();

  const [searchEdu, setSearchEdu] = useState('');
  const [searchOcc, setSearchOcc] = useState('');
  const [searchCity, setSearchCity] = useState('');

  const handleFinish = () => {
    // Commit profile & complete auth
    login('aarav.kulkarni@mylagna.com');
  };

  const handleBack = () => {
    if (currentStep > 1) {
      prevStep();
    } else {
      navigation.goBack();
    }
  };

  const renderRadioOption = (
    label: string,
    selected: boolean,
    onSelect: () => void,
    iconPrefix?: React.ReactNode,
  ) => (
    <TouchableOpacity
      key={label}
      onPress={onSelect}
      activeOpacity={0.7}
      style={[
        styles.radioCard,
        {
          backgroundColor: theme.colors.surface,
          borderColor: selected ? theme.colors.primary : theme.colors.border,
        },
      ]}
    >
      <View style={styles.radioCardLeft}>
        {iconPrefix ? <View style={{ marginRight: 10 }}>{iconPrefix}</View> : null}
        <Text
          style={[
            styles.radioCardText,
            {
              color: selected ? theme.colors.text : theme.colors.textSecondary,
              fontFamily: selected ? fontFamilies.semiBold : fontFamilies.regular,
            },
          ]}
        >
          {label}
        </Text>
      </View>
      <View
        style={[
          styles.radioCircle,
          {
            borderColor: selected ? theme.colors.primary : theme.colors.border,
            backgroundColor: selected ? theme.colors.primary : 'transparent',
          },
        ]}
      >
        {selected ? (
          <CheckCircle2 size={16} color="#FFFFFF" />
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer paddingHorizontal={0}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Step Progress Bar (Steps 1 to 13) */}
        {currentStep <= 13 ? (
          <StepProgressBar
            currentStep={currentStep}
            totalSteps={13}
            onBackPress={handleBack}
          />
        ) : null}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* STEP 1: WELCOME INTRO */}
          {currentStep === 1 ? (
            <View style={styles.stepContainer}>
              <Text style={[styles.heading, { color: theme.colors.text }]}>
                Welcome to{'\n'}
                <Text style={{ color: theme.colors.primary }}>My Lagna</Text>
              </Text>
              <Text style={[styles.subheading, { color: theme.colors.textSecondary }]}>
                Let's create your profile{'\n'}it only takes 2 minutes.{'\n\n'}We'll help you find better matches.
              </Text>

              <View style={styles.illustrationWrapper}>
                <Image
                  source={couple1Asset}
                  style={styles.circleImage}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.securityNoteRow}>
                <Shield size={16} color={theme.colors.textSecondary} style={{ marginRight: 6 }} />
                <Text style={[styles.securityNoteText, { color: theme.colors.textSecondary }]}>
                  Your information is safe and will never be shared
                </Text>
              </View>

              <AppButton
                title="Let's Begin"
                onPress={nextStep}
                style={styles.primaryBtn}
              />
            </View>
          ) : null}

          {/* STEP 2: NAME */}
          {currentStep === 2 ? (
            <View style={styles.stepContainer}>
              <Text style={[styles.heading, { color: theme.colors.text }]}>
                What's your name?
              </Text>

              <View style={{ width: '100%', marginTop: 24 }}>
                <AppInput
                  label="First Name"
                  placeholder="Enter your First name"
                  value={firstName}
                  onChangeText={(val) => updateData({ firstName: val })}
                  leftIcon={<User size={18} color={theme.colors.textMuted} />}
                />
                <AppInput
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChangeText={(val) => updateData({ lastName: val })}
                  leftIcon={<User size={18} color={theme.colors.textMuted} />}
                />
              </View>

              <AppButton
                title="Continue"
                onPress={nextStep}
                style={[styles.primaryBtn, { marginTop: 32 }]}
              />
            </View>
          ) : null}

          {/* STEP 3: GENDER */}
          {currentStep === 3 ? (
            <View style={styles.stepContainer}>
              <Text style={[styles.heading, { color: theme.colors.text }]}>
                I am
              </Text>

              <View style={{ width: '100%', marginTop: 24 }}>
                <TouchableOpacity
                  onPress={() => updateData({ gender: 'Male' })}
                  activeOpacity={0.8}
                  style={[
                    styles.genderCard,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor:
                        gender === 'Male'
                          ? theme.colors.primary
                          : theme.colors.border,
                    },
                  ]}
                >
                  <View style={styles.avatarCircle}>
                    <Text style={{ fontSize: 32 }}>👨‍💼</Text>
                  </View>
                  <Text
                    style={[
                      styles.genderText,
                      { color: theme.colors.text },
                    ]}
                  >
                    Male
                  </Text>
                  <View
                    style={[
                      styles.radioCircle,
                      {
                        borderColor:
                          gender === 'Male'
                            ? theme.colors.primary
                            : theme.colors.border,
                        backgroundColor:
                          gender === 'Male' ? theme.colors.primary : 'transparent',
                      },
                    ]}
                  >
                    {gender === 'Male' ? <CheckCircle2 size={16} color="#FFF" /> : null}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => updateData({ gender: 'Female' })}
                  activeOpacity={0.8}
                  style={[
                    styles.genderCard,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor:
                        gender === 'Female'
                          ? theme.colors.primary
                          : theme.colors.border,
                      marginTop: 16,
                    },
                  ]}
                >
                  <View style={styles.avatarCircle}>
                    <Text style={{ fontSize: 32 }}>👩‍💼</Text>
                  </View>
                  <Text
                    style={[
                      styles.genderText,
                      { color: theme.colors.text },
                    ]}
                  >
                    Female
                  </Text>
                  <View
                    style={[
                      styles.radioCircle,
                      {
                        borderColor:
                          gender === 'Female'
                            ? theme.colors.primary
                            : theme.colors.border,
                        backgroundColor:
                          gender === 'Female' ? theme.colors.primary : 'transparent',
                      },
                    ]}
                  >
                    {gender === 'Female' ? <CheckCircle2 size={16} color="#FFF" /> : null}
                  </View>
                </TouchableOpacity>
              </View>

              <AppButton
                title="Continue"
                onPress={nextStep}
                style={[styles.primaryBtn, { marginTop: 40 }]}
              />
            </View>
          ) : null}

          {/* STEP 4: DATE OF BIRTH */}
          {currentStep === 4 ? (
            <View style={styles.stepContainer}>
              <Text style={[styles.heading, { color: theme.colors.text }]}>
                Date of Birth
              </Text>
              <Text style={[styles.subheading, { color: theme.colors.textSecondary }]}>
                Your age helps us find better matches
              </Text>

              <WheelDatePicker
                day={dateOfBirth.day}
                month={dateOfBirth.month}
                year={dateOfBirth.year}
                onDateChange={(dob) => updateData({ dateOfBirth: dob })}
              />

              <View style={styles.securityNoteRow}>
                <Lock size={14} color={theme.colors.textSecondary} style={{ marginRight: 6 }} />
                <Text style={[styles.securityNoteText, { color: theme.colors.textSecondary }]}>
                  Your age will be private
                </Text>
              </View>

              <AppButton
                title="Continue"
                onPress={nextStep}
                style={[styles.primaryBtn, { marginTop: 24 }]}
              />
            </View>
          ) : null}

          {/* STEP 5: HEIGHT */}
          {currentStep === 5 ? (
            <View style={styles.stepContainer}>
              <Text style={[styles.heading, { color: theme.colors.text }]}>
                Height
              </Text>
              <Text style={[styles.subheading, { color: theme.colors.textSecondary }]}>
                Select your height
              </Text>

              <HeightRulerPicker
                selectedHeight={height}
                onHeightChange={(h) => updateData({ height: h })}
              />

              <AppButton
                title="Continue"
                onPress={nextStep}
                style={[styles.primaryBtn, { marginTop: 24 }]}
              />
            </View>
          ) : null}

          {/* STEP 6: RELIGION */}
          {currentStep === 6 ? (
            <View style={styles.stepContainer}>
              <Text style={[styles.heading, { color: theme.colors.text }]}>
                What is your religion?
              </Text>

              <View style={{ width: '100%', marginTop: 20 }}>
                {RELIGIONS.map((item) =>
                  renderRadioOption(
                    item.label,
                    religion === item.label,
                    () => updateData({ religion: item.label }),
                    <Text style={{ fontSize: 18 }}>{item.icon}</Text>,
                  ),
                )}
              </View>

              <AppButton
                title="Continue"
                onPress={nextStep}
                style={[styles.primaryBtn, { marginTop: 24 }]}
              />
            </View>
          ) : null}

          {/* STEP 7: MARATHI COMMUNITY */}
          {currentStep === 7 ? (
            <View style={styles.stepContainer}>
              <Text style={[styles.heading, { color: theme.colors.text }]}>
                Marathi Community
              </Text>
              <Text style={[styles.subheading, { color: theme.colors.textSecondary }]}>
                Select your community
              </Text>

              <View style={{ width: '100%', marginTop: 20 }}>
                {COMMUNITIES.map((c) =>
                  renderRadioOption(
                    c,
                    community === c,
                    () => updateData({ community: c }),
                    <Text style={{ fontSize: 16 }}>🪔</Text>,
                  ),
                )}
              </View>

              <AppButton
                title="Continue"
                onPress={nextStep}
                style={[styles.primaryBtn, { marginTop: 24 }]}
              />
            </View>
          ) : null}

          {/* STEP 8: EDUCATION */}
          {currentStep === 8 ? (
            <View style={styles.stepContainer}>
              <Text style={[styles.heading, { color: theme.colors.text }]}>
                Education
              </Text>
              <Text style={[styles.subheading, { color: theme.colors.textSecondary }]}>
                Select your highest education
              </Text>

              <View style={{ width: '100%', marginTop: 16 }}>
                <AppInput
                  placeholder="Search Education"
                  value={searchEdu}
                  onChangeText={setSearchEdu}
                  leftIcon={<Search size={18} color={theme.colors.textMuted} />}
                />

                {EDUCATIONS.filter((e) =>
                  e.toLowerCase().includes(searchEdu.toLowerCase()),
                ).map((e) =>
                  renderRadioOption(e, education === e, () =>
                    updateData({ education: e }),
                  ),
                )}
              </View>

              <AppButton
                title="Continue"
                onPress={nextStep}
                style={[styles.primaryBtn, { marginTop: 24 }]}
              />
            </View>
          ) : null}

          {/* STEP 9: OCCUPATION */}
          {currentStep === 9 ? (
            <View style={styles.stepContainer}>
              <Text style={[styles.heading, { color: theme.colors.text }]}>
                Occupation
              </Text>
              <Text style={[styles.subheading, { color: theme.colors.textSecondary }]}>
                Select your occupation
              </Text>

              <View style={{ width: '100%', marginTop: 16 }}>
                <AppInput
                  placeholder="Search occupation"
                  value={searchOcc}
                  onChangeText={setSearchOcc}
                  leftIcon={<Search size={18} color={theme.colors.textMuted} />}
                />

                {OCCUPATIONS.filter((o) =>
                  o.toLowerCase().includes(searchOcc.toLowerCase()),
                ).map((o) =>
                  renderRadioOption(o, occupation === o, () =>
                    updateData({ occupation: o }),
                  ),
                )}
              </View>

              <AppButton
                title="Continue"
                onPress={nextStep}
                style={[styles.primaryBtn, { marginTop: 24 }]}
              />
            </View>
          ) : null}

          {/* STEP 10: CITY */}
          {currentStep === 10 ? (
            <View style={styles.stepContainer}>
              <Text style={[styles.heading, { color: theme.colors.text }]}>
                City
              </Text>
              <Text style={[styles.subheading, { color: theme.colors.textSecondary }]}>
                Where do you live?
              </Text>

              <View style={{ width: '100%', marginTop: 16 }}>
                <AppInput
                  placeholder="Search city"
                  value={searchCity}
                  onChangeText={setSearchCity}
                  leftIcon={<Search size={18} color={theme.colors.textMuted} />}
                />

                {CITIES.filter((c) =>
                  c.toLowerCase().includes(searchCity.toLowerCase()),
                ).map((c) =>
                  renderRadioOption(
                    c,
                    city === c,
                    () => updateData({ city: c }),
                    <MapPin size={18} color={theme.colors.primary} />,
                  ),
                )}
              </View>

              <AppButton
                title="Continue"
                onPress={nextStep}
                style={[styles.primaryBtn, { marginTop: 24 }]}
              />
            </View>
          ) : null}

          {/* STEP 11: UPLOAD PHOTOS */}
          {currentStep === 11 ? (
            <View style={styles.stepContainer}>
              <Text style={[styles.heading, { color: theme.colors.text }]}>
                Upload Photos
              </Text>
              <Text style={[styles.subheading, { color: theme.colors.textSecondary }]}>
                Add your photos for better matches
              </Text>

              {/* Photos Badge */}
              <View style={[styles.photoBadge, { backgroundColor: theme.colors.primarySoft }]}>
                <Text style={[styles.photoBadgeText, { color: theme.colors.primary }]}>
                  ↗ Profile with photos get 70% more matches
                </Text>
              </View>

              {/* Main Photo Box */}
              <TouchableOpacity
                style={[
                  styles.mainPhotoBox,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.primary,
                  },
                ]}
                activeOpacity={0.8}
              >
                <View style={[styles.cameraIconCircle, { backgroundColor: theme.colors.primarySoft }]}>
                  <Camera size={32} color={theme.colors.primary} />
                </View>
                <Text style={[styles.mainPhotoText, { color: theme.colors.text }]}>
                  Add photo
                </Text>
                <Text style={[styles.mainPhotoSubtext, { color: theme.colors.textMuted }]}>
                  Tap to upload
                </Text>
              </TouchableOpacity>

              {/* 4 Thumb Sub-Slots */}
              <View style={styles.subPhotosRow}>
                {[1, 2, 3, 4].map((slot) => (
                  <TouchableOpacity
                    key={slot}
                    style={[
                      styles.subPhotoBox,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                      },
                    ]}
                    activeOpacity={0.8}
                  >
                    <Plus size={20} color={theme.colors.primary} />
                  </TouchableOpacity>
                ))}
              </View>

              <AppButton
                title="Continue"
                onPress={nextStep}
                style={[styles.primaryBtn, { marginTop: 32 }]}
              />
            </View>
          ) : null}

          {/* STEP 12: ABOUT YOU */}
          {currentStep === 12 ? (
            <View style={styles.stepContainer}>
              <Text style={[styles.heading, { color: theme.colors.text }]}>
                About You
              </Text>
              <Text style={[styles.subheading, { color: theme.colors.textSecondary }]}>
                Tell us about yourself
              </Text>

              <View
                style={[
                  styles.bioCard,
                  {
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
              >
                <TextInput
                  multiline
                  numberOfLines={5}
                  style={[styles.bioInput, { color: theme.colors.text }]}
                  placeholder="Write something about yourself, your hobbies, interests, and what makes you special..."
                  placeholderTextColor={theme.colors.textMuted}
                  value={aboutYou}
                  maxLength={300}
                  onChangeText={(text) => updateData({ aboutYou: text })}
                />
                <Text style={[styles.charCounter, { color: theme.colors.textMuted }]}>
                  {aboutYou.length}/300
                </Text>
              </View>

              {/* Suggestion Tag Pills */}
              <View style={{ width: '100%', marginTop: 16 }}>
                <Text style={[styles.suggestionTitle, { color: theme.colors.textSecondary }]}>
                  You can include:
                </Text>
                <View style={styles.tagPillsRow}>
                  {[
                    'Your Personality',
                    'Your Hobbies',
                    'Your Lifestyle',
                    "What you're looking for",
                  ].map((tag) => (
                    <TouchableOpacity
                      key={tag}
                      onPress={() => {
                        const newBio = aboutYou ? `${aboutYou} ${tag}` : tag;
                        updateData({ aboutYou: newBio.slice(0, 300) });
                      }}
                      style={[
                        styles.tagPill,
                        {
                          backgroundColor: theme.colors.surface,
                          borderColor: theme.colors.border,
                        },
                      ]}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.tagPillText, { color: theme.colors.primary }]}>
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <AppButton
                title="Continue"
                onPress={nextStep}
                style={[styles.primaryBtn, { marginTop: 32 }]}
              />
            </View>
          ) : null}

          {/* STEP 13: PARTNER PREFERENCES */}
          {currentStep === 13 ? (
            <View style={styles.stepContainer}>
              <Text style={[styles.heading, { color: theme.colors.text }]}>
                Partner Preferences
              </Text>
              <Text style={[styles.subheading, { color: theme.colors.textSecondary }]}>
                Tell us about your ideal partner
              </Text>

              <View style={{ width: '100%', marginTop: 24 }}>
                {[
                  { label: 'Age Range', value: partnerPreferences.ageRange, icon: '📅' },
                  { label: 'Height', value: partnerPreferences.heightRange, icon: '📏' },
                  { label: 'Religion', value: partnerPreferences.religion, icon: '🕉' },
                  { label: 'Marathi Community', value: partnerPreferences.community, icon: '🪔' },
                  { label: 'Education', value: partnerPreferences.education, icon: '🎓' },
                  { label: 'City', value: partnerPreferences.city, icon: '📍' },
                ].map((pref) => (
                  <TouchableOpacity
                    key={pref.label}
                    style={[
                      styles.prefCard,
                      {
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                      },
                    ]}
                    activeOpacity={0.7}
                  >
                    <View style={styles.prefLeft}>
                      <Text style={{ fontSize: 18, marginRight: 10 }}>{pref.icon}</Text>
                      <Text style={[styles.prefLabel, { color: theme.colors.text }]}>
                        {pref.label}
                      </Text>
                    </View>
                    <View style={styles.prefRight}>
                      <Text style={[styles.prefValue, { color: theme.colors.textSecondary }]}>
                        {pref.value}
                      </Text>
                      <ChevronRight size={18} color={theme.colors.textMuted} style={{ marginLeft: 6 }} />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <AppButton
                title="Continue"
                onPress={nextStep}
                style={[styles.primaryBtn, { marginTop: 32 }]}
              />
            </View>
          ) : null}

          {/* STEP 14: PROFILE READY COMPLETION */}
          {currentStep === 14 ? (
            <View style={[styles.stepContainer, { paddingTop: 40 }]}>
              {/* Circle Illustration */}
              <View style={styles.completionCircleWrapper}>
                <Image
                  source={couple1Asset}
                  style={styles.completionImage}
                  resizeMode="cover"
                />
                <View style={styles.checkBadge}>
                  <CheckCircle2 size={36} color="#4CAF50" fill="#FFFFFF" />
                </View>
              </View>

              <Text style={[styles.completionHeading, { color: theme.colors.primary }]}>
                Your profile is ready!
              </Text>
              <Text style={[styles.completionSubheading, { color: theme.colors.textSecondary }]}>
                You're all set to find your{'\n'}perfect life partner
              </Text>

              <AppButton
                title="Explore Matches"
                onPress={handleFinish}
                style={[styles.primaryBtn, { marginTop: 40 }]}
              />

              <TouchableOpacity
                onPress={handleFinish}
                style={{ marginTop: 16, padding: 8 }}
              >
                <Text style={[styles.goHomeText, { color: theme.colors.primary }]}>
                  Go to Home
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  stepContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontFamily: fontFamilies.bold,
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 6,
  },
  subheading: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  illustrationWrapper: {
    marginVertical: 24,
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#FFF1E8',
  },
  circleImage: {
    width: '100%',
    height: '100%',
  },
  securityNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  securityNoteText: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
  },
  primaryBtn: {
    height: 52,
    borderRadius: 12,
    marginTop: 16,
  },
  genderCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFF1E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  genderText: {
    flex: 1,
    fontFamily: fontFamilies.bold,
    fontSize: 18,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 10,
  },
  radioCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCardText: {
    fontSize: 15,
  },
  photoBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginVertical: 12,
  },
  photoBadgeText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
  },
  mainPhotoBox: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  cameraIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  mainPhotoText: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
  },
  mainPhotoSubtext: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    marginTop: 2,
  },
  subPhotosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  subPhotoBox: {
    width: '22%',
    height: 64,
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bioCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
    marginTop: 12,
  },
  bioInput: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    lineHeight: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCounter: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    textAlign: 'right',
    marginTop: 8,
  },
  suggestionTitle: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    marginBottom: 8,
  },
  tagPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
  },
  tagPillText: {
    fontFamily: fontFamilies.medium,
    fontSize: 12,
  },
  prefCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 10,
  },
  prefLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 15,
  },
  prefRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefValue: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
  },
  completionCircleWrapper: {
    position: 'relative',
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: 'visible',
    marginVertical: 24,
  },
  completionImage: {
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  checkBadge: {
    position: 'absolute',
    bottom: 4,
    alignSelf: 'center',
  },
  completionHeading: {
    fontFamily: fontFamilies.bold,
    fontSize: 26,
    lineHeight: 34,
    textAlign: 'center',
    marginBottom: 8,
  },
  completionSubheading: {
    fontFamily: fontFamilies.regular,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  goHomeText: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
  },
});
