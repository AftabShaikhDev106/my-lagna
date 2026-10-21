import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  FileCode,
  Globe,
  Mail,
  Star,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { FloatingNavTabBar } from '../../../components/navigation/FloatingNavTabBar';
import { logoAsset, welcomeFortAsset } from '../../../assets';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'AboutMyLagna'>;

export const AboutMyLagnaScreen: React.FC<Props> = ({ navigation }) => {
  const handleOpenWebsite = () => {
    Linking.openURL('https://www.mylagna.in').catch(() => {
      Alert.alert('Website', 'Visit us online at https://www.mylagna.in');
    });
  };

  const handleContactEmail = () => {
    Linking.openURL('mailto:support@mylagna.in').catch(() => {
      Alert.alert('Contact Support', 'Write to our support team at support@mylagna.in');
    });
  };

  const handleRateApp = () => {
    Alert.alert(
      'Rate My Lagna',
      'Thank you for your love and support! Please rate us 5 stars on the app store.',
      [{ text: 'Rate 5 Stars ⭐⭐⭐⭐⭐' }, { text: 'Later', style: 'cancel' }]
    );
  };

  return (
    <View style={styles.rootContainer}>
      <ScreenContainer paddingHorizontal={0} style={{ backgroundColor: '#FFEFE6' }}>
        {/* Top Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <ChevronLeft size={22} color="#1E1E1E" strokeWidth={2.2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About My Lagna</Text>
        </View>

        {/* Scrollable Body */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Brand Section */}
          <View style={styles.heroBrandCol}>
            <Image
              source={logoAsset}
              style={styles.brandLogoImage}
              resizeMode="contain"
            />
            <Text style={styles.brandTitle}>My Lagna</Text>
            <Text style={styles.brandTagline}>
              Trusted Connections. Happily Ever After.
            </Text>
          </View>

          {/* Callout Card */}
          <View style={styles.calloutCard}>
            <View style={styles.heartIconCircle}>
              <Heart size={18} color="#E05638" fill="#FFF0E6" />
            </View>
            <View style={styles.calloutTextCol}>
              <Text style={styles.calloutTitle}>Made for meaningful connections</Text>
              <Text style={styles.calloutSubtitle}>
                My Lagna helps you discover meaningful connections within your community in a safe, simple and modern way.
              </Text>
            </View>
          </View>

          {/* About Links Menu Card */}
          <View style={styles.menuCard}>
            {/* Version */}
            <View style={styles.menuRow}>
              <View style={styles.menuIconBox}>
                <FileCode size={16} color="#E05638" />
              </View>
              <View style={styles.menuTextCol}>
                <Text style={styles.menuTitle}>Version</Text>
                <Text style={styles.menuSubtitle}>1.0.0</Text>
              </View>
              <ChevronRight size={16} color="#A0A0A0" />
            </View>

            <View style={styles.menuDivider} />

            {/* Website */}
            <TouchableOpacity
              style={styles.menuRow}
              onPress={handleOpenWebsite}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconBox}>
                <Globe size={16} color="#E05638" />
              </View>
              <View style={styles.menuTextCol}>
                <Text style={styles.menuTitle}>Website</Text>
                <Text style={styles.menuSubtitle}>www.mylagna.in</Text>
              </View>
              <ChevronRight size={16} color="#A0A0A0" />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* Contact Us */}
            <TouchableOpacity
              style={styles.menuRow}
              onPress={handleContactEmail}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconBox}>
                <Mail size={16} color="#E05638" />
              </View>
              <View style={styles.menuTextCol}>
                <Text style={styles.menuTitle}>Contact Us</Text>
                <Text style={styles.menuSubtitle}>support@mylagna.in</Text>
              </View>
              <ChevronRight size={16} color="#A0A0A0" />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* Rate My Lagna */}
            <TouchableOpacity
              style={styles.menuRow}
              onPress={handleRateApp}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconBox}>
                <Star size={16} color="#E05638" />
              </View>
              <View style={styles.menuTextCol}>
                <Text style={styles.menuTitle}>Rate My Lagna</Text>
                <Text style={styles.menuSubtitle}>Share your love on the App Store</Text>
              </View>
              <ChevronRight size={16} color="#A0A0A0" />
            </TouchableOpacity>
          </View>

          {/* Footer: Made with Love in India */}
          <View style={styles.footerSection}>
            <Text style={styles.footerIndiaText}>Made with ❤️ in India</Text>
            <Text style={styles.footerSubtext}>
              For a stronger community, a brighter tomorrow.
            </Text>

            {/* Heritage Fort Silhouette Skyline */}
            <Image
              source={welcomeFortAsset}
              style={styles.fortSkylineImage}
              resizeMode="cover"
            />
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 10,
    backgroundColor: '#FFEFE6',
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100,
  },
  heroBrandCol: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingTop: 8,
  },
  brandLogoImage: {
    width: 76,
    height: 76,
    marginBottom: 10,
  },
  brandTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 24,
    color: '#1E1E1E',
    letterSpacing: 0.4,
  },
  brandTagline: {
    fontFamily: fontFamilies.regular,
    fontSize: 11.5,
    color: '#777777',
    marginTop: 4,
    fontStyle: 'italic',
  },
  calloutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E8',
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#FDE0CF',
  },
  heartIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
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
    fontSize: 12.5,
    color: '#3D2D24',
    marginBottom: 3,
  },
  calloutSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#6D5C52',
    lineHeight: 15,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },
  menuIconBox: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTextCol: {
    flex: 1,
    paddingRight: 6,
  },
  menuTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13.5,
    color: '#1E1E1E',
  },
  menuSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#777777',
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F3E9E2',
  },
  footerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    position: 'relative',
  },
  footerIndiaText: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
    color: '#444444',
  },
  footerSubtext: {
    fontFamily: fontFamilies.regular,
    fontSize: 10,
    color: '#8E8A85',
    marginTop: 2,
    marginBottom: 16,
  },
  fortSkylineImage: {
    width: '100%',
    height: 80,
    opacity: 0.35,
    borderRadius: 16,
  },
});
