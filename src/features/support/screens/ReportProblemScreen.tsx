import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Settings,
  User,
  MessageSquare,
  CreditCard,
  ShieldAlert,
  MoreHorizontal,
  Camera,
  Info,
  Check,
  X,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { FloatingNavTabBar } from '../../../components/navigation/FloatingNavTabBar';
import { feedbackIllustrationAsset } from '../../../assets';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'ReportProblem'>;

interface HelpTopic {
  id: string;
  title: string;
  icon: React.ComponentType<{ size: number; color: string }>;
}

const HELP_TOPICS: HelpTopic[] = [
  { id: 'app_bug', title: 'App not working properly', icon: Settings },
  { id: 'account_issue', title: 'Account or profile issue', icon: User },
  { id: 'chat_issue', title: 'Chat or messaging problem', icon: MessageSquare },
  { id: 'payment_issue', title: 'Payment / Premium issue', icon: CreditCard },
  { id: 'safety_concern', title: 'Safety concern', icon: ShieldAlert },
  { id: 'other', title: 'Something else', icon: MoreHorizontal },
];

export const ReportProblemScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedIssue, setSelectedIssue] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [screenshotAttached, setScreenshotAttached] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSelectTopic = (topicTitle: string) => {
    setSelectedIssue(topicTitle);
    setIsDropdownOpen(false);
  };

  const handleToggleScreenshot = () => {
    if (screenshotAttached) {
      setScreenshotAttached(false);
    } else {
      setScreenshotAttached(true);
      Alert.alert('Screenshot Attached', 'Sample issue_capture.png selected.');
    }
  };

  const handleSubmit = () => {
    if (!description.trim() && !selectedIssue) {
      Alert.alert('Notice', 'Please select an issue or describe the problem.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Thank You!',
        'Your report has been submitted. Our support team will review it shortly.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, 600);
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
          <Text style={styles.headerTitle}>Report a Problem</Text>
        </View>

        {/* Scrollable Form Body */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Feedback Illustration Banner */}
          <View style={styles.illustrationCard}>
            <Image
              source={feedbackIllustrationAsset}
              style={styles.feedbackImage}
              resizeMode="contain"
            />
            <Text style={styles.feedbackTagline}>Your feedback helps us do better ♡</Text>
          </View>

          {/* Select an Issue Dropdown Header */}
          <TouchableOpacity
            style={styles.dropdownSelector}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            activeOpacity={0.8}
          >
            <View style={styles.selectorLeft}>
              <View style={styles.gearIconBox}>
                <Settings size={18} color="#E05638" />
              </View>
              <Text
                style={[
                  styles.selectorText,
                  selectedIssue ? styles.selectorTextActive : null,
                ]}
                numberOfLines={1}
              >
                {selectedIssue || 'Select an issue'}
              </Text>
            </View>
            {isDropdownOpen ? (
              <ChevronUp size={18} color="#8E8A85" />
            ) : (
              <ChevronDown size={18} color="#8E8A85" />
            )}
          </TouchableOpacity>

          {/* Popular Help Topics */}
          <View style={styles.popularTopicsHeader}>
            <Text style={styles.sectionTitle}>Popular Help Topics</Text>
            <TouchableOpacity
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
              activeOpacity={0.7}
            >
              <Text style={styles.seeAllText}>See All &gt;</Text>
            </TouchableOpacity>
          </View>

          {/* Help Topics Card List */}
          <View style={styles.topicsCard}>
            {HELP_TOPICS.map((topic, index) => {
              const IconComp = topic.icon;
              const isSelected = selectedIssue === topic.title;

              return (
                <React.Fragment key={topic.id}>
                  <TouchableOpacity
                    style={[
                      styles.topicRow,
                      isSelected ? styles.topicRowSelected : null,
                    ]}
                    onPress={() => handleSelectTopic(topic.title)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.topicIconBox}>
                      <IconComp size={16} color="#E05638" />
                    </View>
                    <Text
                      style={[
                        styles.topicTitle,
                        isSelected ? styles.topicTitleSelected : null,
                      ]}
                    >
                      {topic.title}
                    </Text>
                    {isSelected && (
                      <View style={styles.checkBadge}>
                        <Check size={14} color="#E05638" strokeWidth={2.4} />
                      </View>
                    )}
                  </TouchableOpacity>
                  {index < HELP_TOPICS.length - 1 && <View style={styles.topicDivider} />}
                </React.Fragment>
              );
            })}
          </View>

          {/* Describe the problem Section */}
          <View style={styles.formSection}>
            <Text style={styles.fieldLabel}>
              Describe the problem <Text style={styles.requiredAsterisk}>*</Text>
            </Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textAreaInput}
                multiline
                numberOfLines={4}
                maxLength={500}
                placeholder="Tell us more about the issue..."
                placeholderTextColor="#A89F97"
                value={description}
                onChangeText={setDescription}
                textAlignVertical="top"
              />
              <Text style={styles.charCounter}>{description.length}/500</Text>
            </View>
          </View>

          {/* Add Screenshot (Optional) Section */}
          <View style={styles.formSection}>
            <Text style={styles.fieldLabel}>
              Add Screenshot (Optional) <Text style={styles.requiredAsterisk}>*</Text>
            </Text>

            {screenshotAttached ? (
              <View style={styles.screenshotPreviewCard}>
                <View style={styles.screenshotThumbBox}>
                  <Camera size={22} color="#E05638" />
                </View>
                <View style={styles.screenshotInfo}>
                  <Text style={styles.screenshotName}>screenshot_issue_01.png</Text>
                  <Text style={styles.screenshotSize}>2.4 MB • Ready to send</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeScreenshotBtn}
                  onPress={handleToggleScreenshot}
                  activeOpacity={0.7}
                >
                  <X size={16} color="#E53935" />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.dashedUploadBox}
                onPress={handleToggleScreenshot}
                activeOpacity={0.8}
              >
                <View style={styles.cameraIconCircle}>
                  <Camera size={22} color="#E05638" />
                </View>
                <Text style={styles.uploadTitle}>Add Screenshot</Text>
                <Text style={styles.uploadSubtitle}>JPG, PNG up to 5MB</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Feedback Matters Callout Box */}
          <View style={styles.feedbackInfoBanner}>
            <View style={styles.infoIconCircle}>
              <Info size={14} color="#E05638" />
            </View>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoTitle}>Your feedback matters</Text>
              <Text style={styles.infoDescription}>
                We review all reports and work to resolve issue as quickly as possible.
              </Text>
            </View>
          </View>

          {/* Submit Action Button */}
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting ? styles.submitButtonDisabled : null]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Text>
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
    paddingTop: 6,
    paddingBottom: 100,
  },
  illustrationCard: {
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
  feedbackImage: {
    width: 140,
    height: 120,
    marginBottom: 10,
  },
  feedbackTagline: {
    fontFamily: fontFamilies.medium,
    fontStyle: 'italic',
    fontSize: 17,
    color: '#E05638',
    textAlign: 'center',
  },
  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(239, 230, 225, 0.8)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  selectorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  gearIconBox: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectorText: {
    fontFamily: fontFamilies.medium,
    fontSize: 14,
    color: '#777777',
  },
  selectorTextActive: {
    color: '#1E1E1E',
    fontFamily: fontFamilies.semiBold,
  },
  popularTopicsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: '#1E1E1E',
  },
  seeAllText: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: '#E05638',
  },
  topicsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  topicRowSelected: {
    backgroundColor: '#FFF8F4',
    borderRadius: 12,
    marginHorizontal: -4,
    paddingHorizontal: 4,
  },
  topicIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  topicTitle: {
    flex: 1,
    fontFamily: fontFamilies.medium,
    fontSize: 13.5,
    color: '#222222',
  },
  topicTitleSelected: {
    color: '#E05638',
    fontFamily: fontFamilies.semiBold,
  },
  checkBadge: {
    marginLeft: 8,
  },
  topicDivider: {
    height: 1,
    backgroundColor: '#F3E9E2',
  },
  formSection: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: '#1E1E1E',
    marginBottom: 8,
  },
  requiredAsterisk: {
    color: '#E05638',
  },
  textAreaContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EFE4DC',
    padding: 14,
    minHeight: 120,
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  textAreaInput: {
    fontFamily: fontFamilies.regular,
    fontSize: 13.5,
    color: '#1E1E1E',
    minHeight: 80,
    padding: 0,
    margin: 0,
  },
  charCounter: {
    fontFamily: fontFamilies.regular,
    fontSize: 11.5,
    color: '#8E8A85',
    textAlign: 'right',
    marginTop: 4,
  },
  dashedUploadBox: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#DAC8BC',
    borderRadius: 18,
    backgroundColor: '#FFF8F4',
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  uploadTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 14,
    color: '#1E1E1E',
    marginBottom: 2,
  },
  uploadSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 11.5,
    color: '#8E8A85',
  },
  screenshotPreviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EFE4DC',
  },
  screenshotThumbBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#FFF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  screenshotInfo: {
    flex: 1,
  },
  screenshotName: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 13,
    color: '#1E1E1E',
  },
  screenshotSize: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#8E8A85',
    marginTop: 2,
  },
  removeScreenshotBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFEBEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  feedbackInfoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF3E8',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDE0CF',
    padding: 12,
    marginBottom: 18,
  },
  infoIconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFE5D4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 1,
  },
  infoTextWrapper: {
    flex: 1,
  },
  infoTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 12,
    color: '#3D2D24',
    marginBottom: 2,
  },
  infoDescription: {
    fontFamily: fontFamilies.regular,
    fontSize: 11,
    color: '#6D5C52',
    lineHeight: 15,
  },
  submitButton: {
    backgroundColor: '#E05638',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E05638',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 10,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: '#FFFFFF',
  },
});
