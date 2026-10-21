import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ArrowLeft,
  Camera,
  Plus,
  User,
  BookOpen,
  GraduationCap,
  MapPin,
  FileText,
  Heart,
  Users,
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';
import { AppStackParamList } from '../../../navigation/types';
import { ScreenContainer } from '../../../components/common/ScreenContainer';
import { useAuthStore } from '../../../store/authStore';
import { fontFamilies } from '../../../theme/typography';

type Props = NativeStackScreenProps<AppStackParamList, 'EditProfile'>;

export const EditProfileScreen: React.FC<Props> = ({ navigation }) => {
  const user = useAuthStore((state) => state.user);

  // Form State
  const [name, setName] = useState(user?.name || 'Aftab Shaikh');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('22 Nov 2004');
  const [height, setHeight] = useState('5\'8" (172.7 cm)');
  const [religion, setReligion] = useState('Islam');
  const [community, setCommunity] = useState('Muslim');
  const [education, setEducation] = useState('Bachelor\'s Degree');
  const [occupation, setOccupation] = useState('Software Developer');
  const [city, setCity] = useState('Pimpri Chinchwad');
  const [about, setAbout] = useState(
    'Believe in kindness, laughter and good conversations. Love traveling and exploring new places.',
  );
  const [diet, setDiet] = useState('Non-Vegetarian');
  const [smoking, setSmoking] = useState('No');
  const [drinking, setDrinking] = useState('No');

  // Partner Preferences State
  const [prefAgeRange, setPrefAgeRange] = useState('22 - 28 Years');
  const [prefHeight, setPrefHeight] = useState('5\'3" - 5\'8"');
  const [prefReligion, setPrefReligion] = useState('Islam');
  const [prefCommunity, setPrefCommunity] = useState('Muslim');
  const [prefEducation, setPrefEducation] = useState('Graduate & Above');
  const [prefLocation, setPrefLocation] = useState('India');
  const [prefMaritalStatus, setPrefMaritalStatus] = useState('Never Married');
  const [prefDiet, setPrefDiet] = useState('Any');
  const [prefSmoking, setPrefSmoking] = useState('No');
  const [prefDrinking, setPrefDrinking] = useState('No');

  // Accordion Expand/Collapse States
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basic: true,
    religion: true,
    education: true,
    location: true,
    about: true,
    lifestyle: true,
    preferences: true,
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <ScreenContainer paddingHorizontal={0} style={{ backgroundColor: '#FFEFE6' }}>
      {/* Top Navigation Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.headerCircleBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Go Back"
        >
          <ArrowLeft size={20} color="#1E1E1E" />
        </TouchableOpacity>

        <Text style={styles.headerTitleText}>Edit Profile</Text>

        <TouchableOpacity onPress={handleSave} activeOpacity={0.8}>
          <Text style={styles.saveLinkText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Main Form Scroll View */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Profile Completion Bar Card */}
        <View style={styles.completionPillCard}>
          <Text style={styles.completionPillTitle}>Profile Complete</Text>
          <View style={styles.completionProgressBarTrack}>
            <View style={[styles.completionProgressBarFill, { width: '92%' }]} />
          </View>
          <Text style={styles.completionPillPercent}>92%</Text>
        </View>

        {/* Profile Photos Upload Section Card */}
        <View style={styles.photosCard}>
          <Text style={styles.photosTitle}>Profile Photos</Text>
          <Text style={styles.photosSubtitle}>Add up to 4 photos</Text>

          <View style={styles.photosRow}>
            {/* Main Photo 1 */}
            <View style={styles.photoWrapper}>
              <Image
                source={{
                  uri:
                    (user as { photos?: string[] })?.photos && (user as { photos?: string[] }).photos!.length > 0
                      ? (user as { photos?: string[] }).photos![0]
                      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
                }}
                style={styles.photoImage}
              />
              <TouchableOpacity style={styles.photoEditBadge} activeOpacity={0.8}>
                <Camera size={12} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Add Photo Slot 2 */}
            <TouchableOpacity style={styles.addPhotoDashedBox} activeOpacity={0.8}>
              <Plus size={18} color="#E05638" />
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>

            {/* Add Photo Slot 3 */}
            <TouchableOpacity style={styles.addPhotoDashedBox} activeOpacity={0.8}>
              <Plus size={18} color="#E05638" />
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>

            {/* Add Photo Slot 4 */}
            <TouchableOpacity style={styles.addPhotoDashedBox} activeOpacity={0.8}>
              <Plus size={18} color="#E05638" />
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 1: Basic Information */}
        <View style={styles.accordionCard}>
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSection('basic')}
            activeOpacity={0.7}
          >
            <View style={styles.accordionHeaderLeft}>
              <User size={18} color="#E05638" style={{ marginRight: 8 }} />
              <Text style={styles.accordionHeaderTitle}>Basic Information</Text>
            </View>
            {expandedSections.basic ? (
              <ChevronUp size={18} color="#888888" />
            ) : (
              <ChevronDown size={18} color="#888888" />
            )}
          </TouchableOpacity>

          {expandedSections.basic ? (
            <View style={styles.accordionBody}>
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Name</Text>
                <TextInput style={styles.fieldValueInput} value={name} onChangeText={setName} />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Gender</Text>
                <TextInput style={styles.fieldValueInput} value={gender} onChangeText={setGender} />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Date of Birth</Text>
                <TextInput style={styles.fieldValueInput} value={dob} onChangeText={setDob} />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Height</Text>
                <TextInput style={styles.fieldValueInput} value={height} onChangeText={setHeight} />
              </View>
            </View>
          ) : null}
        </View>

        {/* Section 2: Religion & Community */}
        <View style={styles.accordionCard}>
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSection('religion')}
            activeOpacity={0.7}
          >
            <View style={styles.accordionHeaderLeft}>
              <BookOpen size={18} color="#E05638" style={{ marginRight: 8 }} />
              <Text style={styles.accordionHeaderTitle}>Religion & Community</Text>
            </View>
            {expandedSections.religion ? (
              <ChevronUp size={18} color="#888888" />
            ) : (
              <ChevronDown size={18} color="#888888" />
            )}
          </TouchableOpacity>

          {expandedSections.religion ? (
            <View style={styles.accordionBody}>
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Religion</Text>
                <TextInput style={styles.fieldValueInput} value={religion} onChangeText={setReligion} />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Marathi Community</Text>
                <TextInput
                  style={styles.fieldValueInput}
                  value={community}
                  onChangeText={setCommunity}
                />
              </View>
            </View>
          ) : null}
        </View>

        {/* Section 3: Education & Career */}
        <View style={styles.accordionCard}>
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSection('education')}
            activeOpacity={0.7}
          >
            <View style={styles.accordionHeaderLeft}>
              <GraduationCap size={18} color="#E05638" style={{ marginRight: 8 }} />
              <Text style={styles.accordionHeaderTitle}>Education & Career</Text>
            </View>
            {expandedSections.education ? (
              <ChevronUp size={18} color="#888888" />
            ) : (
              <ChevronDown size={18} color="#888888" />
            )}
          </TouchableOpacity>

          {expandedSections.education ? (
            <View style={styles.accordionBody}>
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Education</Text>
                <TextInput
                  style={styles.fieldValueInput}
                  value={education}
                  onChangeText={setEducation}
                />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Occupation</Text>
                <TextInput
                  style={styles.fieldValueInput}
                  value={occupation}
                  onChangeText={setOccupation}
                />
              </View>
            </View>
          ) : null}
        </View>

        {/* Section 4: Location */}
        <View style={styles.accordionCard}>
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSection('location')}
            activeOpacity={0.7}
          >
            <View style={styles.accordionHeaderLeft}>
              <MapPin size={18} color="#E05638" style={{ marginRight: 8 }} />
              <Text style={styles.accordionHeaderTitle}>Location</Text>
            </View>
            {expandedSections.location ? (
              <ChevronUp size={18} color="#888888" />
            ) : (
              <ChevronDown size={18} color="#888888" />
            )}
          </TouchableOpacity>

          {expandedSections.location ? (
            <View style={styles.accordionBody}>
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>City</Text>
                <TextInput style={styles.fieldValueInput} value={city} onChangeText={setCity} />
              </View>
            </View>
          ) : null}
        </View>

        {/* Section 5: About You */}
        <View style={styles.accordionCard}>
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSection('about')}
            activeOpacity={0.7}
          >
            <View style={styles.accordionHeaderLeft}>
              <FileText size={18} color="#E05638" style={{ marginRight: 8 }} />
              <Text style={styles.accordionHeaderTitle}>About You</Text>
            </View>
            {expandedSections.about ? (
              <ChevronUp size={18} color="#888888" />
            ) : (
              <ChevronDown size={18} color="#888888" />
            )}
          </TouchableOpacity>

          {expandedSections.about ? (
            <View style={styles.accordionBody}>
              <View style={[styles.fieldRow, { alignItems: 'flex-start' }]}>
                <Text style={[styles.fieldLabel, { marginTop: 4 }]}>About</Text>
                <TextInput
                  style={[styles.fieldValueInput, { textAlign: 'right', minHeight: 60 }]}
                  value={about}
                  onChangeText={setAbout}
                  multiline
                />
              </View>
            </View>
          ) : null}
        </View>

        {/* Section 6: Lifestyle */}
        <View style={styles.accordionCard}>
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSection('lifestyle')}
            activeOpacity={0.7}
          >
            <View style={styles.accordionHeaderLeft}>
              <Heart size={18} color="#E05638" style={{ marginRight: 8 }} />
              <Text style={styles.accordionHeaderTitle}>Lifestyle</Text>
            </View>
            {expandedSections.lifestyle ? (
              <ChevronUp size={18} color="#888888" />
            ) : (
              <ChevronDown size={18} color="#888888" />
            )}
          </TouchableOpacity>

          {expandedSections.lifestyle ? (
            <View style={styles.accordionBody}>
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Diet Preference</Text>
                <TextInput style={styles.fieldValueInput} value={diet} onChangeText={setDiet} />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Smoking</Text>
                <TextInput
                  style={styles.fieldValueInput}
                  value={smoking}
                  onChangeText={setSmoking}
                />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Drinking</Text>
                <TextInput
                  style={styles.fieldValueInput}
                  value={drinking}
                  onChangeText={setDrinking}
                />
              </View>
            </View>
          ) : null}
        </View>

        {/* Section 7: Partner Preferences */}
        <View style={styles.accordionCard}>
          <TouchableOpacity
            style={styles.accordionHeader}
            onPress={() => toggleSection('preferences')}
            activeOpacity={0.7}
          >
            <View style={styles.accordionHeaderLeft}>
              <Users size={18} color="#E05638" style={{ marginRight: 8 }} />
              <Text style={styles.accordionHeaderTitle}>Partner Preferences</Text>
            </View>
            {expandedSections.preferences ? (
              <ChevronUp size={18} color="#888888" />
            ) : (
              <ChevronDown size={18} color="#888888" />
            )}
          </TouchableOpacity>

          {expandedSections.preferences ? (
            <View style={styles.accordionBody}>
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Age Range</Text>
                <TextInput
                  style={styles.fieldValueInput}
                  value={prefAgeRange}
                  onChangeText={setPrefAgeRange}
                />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Height</Text>
                <TextInput
                  style={styles.fieldValueInput}
                  value={prefHeight}
                  onChangeText={setPrefHeight}
                />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Religion</Text>
                <TextInput
                  style={styles.fieldValueInput}
                  value={prefReligion}
                  onChangeText={setPrefReligion}
                />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Community</Text>
                <TextInput
                  style={styles.fieldValueInput}
                  value={prefCommunity}
                  onChangeText={setPrefCommunity}
                />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Education</Text>
                <TextInput
                  style={styles.fieldValueInput}
                  value={prefEducation}
                  onChangeText={setPrefEducation}
                />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Location</Text>
                <TextInput
                  style={styles.fieldValueInput}
                  value={prefLocation}
                  onChangeText={setPrefLocation}
                />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Marital Status</Text>
                <TextInput
                  style={styles.fieldValueInput}
                  value={prefMaritalStatus}
                  onChangeText={setPrefMaritalStatus}
                />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Diet Preference</Text>
                <TextInput
                  style={styles.fieldValueInput}
                  value={prefDiet}
                  onChangeText={setPrefDiet}
                />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Smoking</Text>
                <TextInput
                  style={styles.fieldValueInput}
                  value={prefSmoking}
                  onChangeText={setPrefSmoking}
                />
              </View>
              <View style={styles.fieldDivider} />
              <View style={styles.fieldRow}>
                <Text style={styles.fieldLabel}>Drinking</Text>
                <TextInput
                  style={styles.fieldValueInput}
                  value={prefDrinking}
                  onChangeText={setPrefDrinking}
                />
              </View>
            </View>
          ) : null}
        </View>

        {/* Save Changes Floating Action Button */}
        <TouchableOpacity style={styles.saveChangesBtn} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveChangesBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFEFE6',
  },
  headerCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitleText: {
    fontFamily: fontFamilies.bold,
    fontSize: 22,
    color: '#1E1E1E',
  },
  saveLinkText: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: '#E05638',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
  },
  completionPillCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  completionPillTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: '#1E1E1E',
    marginRight: 10,
  },
  completionProgressBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#F0E0D6',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 10,
  },
  completionProgressBarFill: {
    height: '100%',
    backgroundColor: '#E05638',
    borderRadius: 3,
  },
  completionPillPercent: {
    fontFamily: fontFamilies.bold,
    fontSize: 13,
    color: '#E05638',
  },
  photosCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  photosTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: '#1E1E1E',
    marginBottom: 2,
  },
  photosSubtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    color: '#888888',
    marginBottom: 14,
  },
  photosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoWrapper: {
    width: 68,
    height: 68,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#EFE6E1',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoEditBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E05638',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  addPhotoDashedBox: {
    width: 68,
    height: 68,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#FFD6C2',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF9F6',
  },
  addPhotoText: {
    fontFamily: fontFamilies.medium,
    fontSize: 9,
    color: '#E05638',
    marginTop: 2,
  },
  accordionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accordionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionHeaderTitle: {
    fontFamily: fontFamilies.bold,
    fontSize: 15,
    color: '#1E1E1E',
  },
  accordionBody: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0E0D6',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  fieldLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: '#666666',
  },
  fieldValueInput: {
    fontFamily: fontFamilies.medium,
    fontSize: 13,
    color: '#1E1E1E',
    textAlign: 'right',
    flex: 1,
    marginLeft: 12,
    paddingVertical: 0,
  },
  fieldDivider: {
    height: 1,
    backgroundColor: '#F8EFEA',
  },
  saveChangesBtn: {
    backgroundColor: '#E05638',
    borderRadius: 18,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
    shadowColor: '#E05638',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  saveChangesBtnText: {
    fontFamily: fontFamilies.bold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
