import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ChevronLeft,
  Shield,
  Globe,
  ArrowRight,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { FloatingNavTabBar } from '../../../components/navigation/FloatingNavTabBar';
import { languageIllustrationAsset } from '../../../assets';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'Language'>;

interface LanguageOption {
  id: 'en' | 'mr' | 'hi';
  title: string;
  nativeSubtitle?: string;
  englishSubtitle: string;
}

const LANGUAGES: LanguageOption[] = [
  {
    id: 'en',
    title: 'English',
    englishSubtitle: 'A global language for everyone',
  },
  {
    id: 'mr',
    title: 'मराठी',
    nativeSubtitle: 'आपली भाषा, आपलं नातं',
    englishSubtitle: 'The language of our community',
  },
  {
    id: 'hi',
    title: 'हिंदी',
    nativeSubtitle: 'हर दिल को जोड़ने वाली भाषा',
    englishSubtitle: 'A language that brings us closer',
  },
];

export const LanguageScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'mr' | 'hi'>('en');

  const handleSaveLanguage = () => {
    const selected = LANGUAGES.find((l) => l.id === selectedLanguage);
    Alert.alert(
      'Language Updated',
      `Language preference has been set to ${selected?.title || 'English'}.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.rootContainer}>
      <ScreenContainer paddingHorizontal={0} style={{ backgroundColor: '#FFEFE6' }}>
        {/* Top Header */}
        <View style={styles.topHeader}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <ChevronLeft size={22} color="#1E1E1E" strokeWidth={2.2} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Language</Text>
          </View>

          <View style={styles.headerRightShield}>
            <Shield size={18} color="#E05638" />
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Illustration Card */}
          <View style={styles.heroCard}>
            <Image
              source={languageIllustrationAsset}
              style={styles.heroImage}
              resizeMode="contain"
            />
            <Text style={styles.scriptQuoteLine1}>Different Languages</Text>
            <Text style={styles.scriptQuoteLine2}>Same Connections ♡</Text>
          </View>

          {/* Language Options List */}
          <View style={styles.languagesContainer}>
            {LANGUAGES.map((lang) => {
              const isSelected = selectedLanguage === lang.id;

              return (
                <TouchableOpacity
                  key={lang.id}
                  style={[
                    styles.languageCard,
                    isSelected ? styles.languageCardSelected : null,
                  ]}
                  onPress={() => setSelectedLanguage(lang.id)}
                  activeOpacity={0.8}
                >
                  {/* Left Circle Badge */}
                  <View style={styles.langBadgeCircle} />

                  {/* Middle Text Col */}
                  <View style={styles.langTextCol}>
                    <Text style={styles.langTitle}>{lang.title}</Text>
                    {lang.nativeSubtitle ? (
                      <Text style={styles.langNativeSubtitle}>{lang.nativeSubtitle}</Text>
                    ) : null}
                    <Text style={styles.langEnglishSubtitle}>{lang.englishSubtitle}</Text>
                  </View>

                  {/* Right Radio Indicator */}
                  <View
                    style={[
                      styles.radioOuterCircle,
                      isSelected ? styles.radioOuterSelected : null,
                    ]}
                  >
                    {isSelected && <View style={styles.radioInnerDot} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Info Callout Card */}
          <View style={styles.calloutCard}>
            <View style={styles.globeIconBox}>
              <Globe size={18} color="#E05638" />
            </View>
            <View style={styles.calloutTextCol}>
              <Text style={styles.calloutTitle}>You can change this anytime</Text>
              <Text style={styles.calloutSubtitle}>
                We use industry-standard encryption to keep your data safe and secure.
              </Text>
            </View>
          </View>

          {/* Save Language CTA Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveLanguage}
            activeOpacity={0.88}
          >
            <View style={styles.saveBtnContent}>
              <Text style={styles.saveBtnText}>Save Language</Text>
              <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.4} style={{ marginLeft: 8 }} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ScreenContainer>

      {/* Floating Bottom Navigation Tab Bar */}
      <FloatingNavTabBar activeTab="Home" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFEFE6',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
    backgroundColor: '#FFEFE6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  headerTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 18,
    color: '#1E1E1E',
  },
  headerRightShield: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  heroImage: {
    width: 140,
    height: 125,
    marginBottom: 8,
  },
  scriptQuoteLine1: {
    fontFamily: fontFamilies.bold,
    fontStyle: 'italic',
    fontSize: 17,
    color: '#E05638',
    textAlign: 'center',
  },
  scriptQuoteLine2: {
    fontFamily: fontFamilies.bold,
    fontStyle: 'italic',
    fontSize: 17,
    color: '#E05638',
    textAlign: 'center',
    marginTop: 2,
  },
  languagesContainer: {
    gap: 10,
    marginBottom: 16,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#EFE6E1',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  languageCardSelected: {
    borderColor: '#E05638',
    backgroundColor: '#FFFFFF',
    shadowColor: '#E05638',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  langBadgeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D32F2F',
    marginRight: 14,
  },
  langTextCol: {
    flex: 1,
    paddingRight: 8,
  },
  langTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: '#1E1E1E',
  },
  langNativeSubtitle: {
    fontFamily: fontFamilies.medium,
    fontSize: 11.5,
    color: '#444444',
    marginTop: 2,
  },
  langEnglishSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#777777',
    marginTop: 2,
  },
  radioOuterCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C4B7AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#E05638',
  },
  radioInnerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E05638',
  },
  calloutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E8',
    borderRadius: 16,
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#FDE0CF',
  },
  globeIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFE5D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  calloutTextCol: {
    flex: 1,
  },
  calloutTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#3D2D24',
    marginBottom: 2,
  },
  calloutSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 10.5,
    color: '#6D5C52',
    lineHeight: 14,
  },
  saveButton: {
    backgroundColor: '#FA6400',
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FA6400',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 10,
  },
  saveBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});
