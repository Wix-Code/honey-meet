import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfile() {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("Andy");
  const [lastName, setLastName] = useState("Lexian");
  const [email, setEmail] = useState("Andylexian2@gmail.com");
  const [dateOfBirth, setDateOfBirth] = useState(new Date(1996, 1, 24));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState("Male");
  const [location, setLocation] = useState(
    "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  );

  const pickCoverImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please allow access to your photos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setCoverImage(result.assets[0].uri);
    }
  };

  const pickProfileImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please allow access to your photos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleSaveChanges = () => {
    Alert.alert("Success", "Your profile has been updated successfully!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={20} color="#111111" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Cover & Profile Image Section */}
          <View style={styles.imageSection}>
            {/* Cover Image */}
            <TouchableOpacity
              style={styles.coverImageContainer}
              onPress={pickCoverImage}
              activeOpacity={0.8}
            >
              {coverImage ? (
                <Image source={{ uri: coverImage }} style={styles.coverImage} />
              ) : (
                <View style={styles.coverImagePlaceholder}>
                  <MaterialIcons name="image" size={40} color="#9CA4AB" />
                </View>
              )}
              <View style={styles.coverEditButton}>
                <Feather name="camera" size={16} color="#ffffff" />
              </View>
            </TouchableOpacity>

            {/* Profile Image */}
            <TouchableOpacity
              style={styles.profileImageContainer}
              onPress={pickProfileImage}
              activeOpacity={0.8}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <MaterialIcons name="person" size={40} color="#9CA4AB" />
                </View>
              )}
              <View style={styles.profileEditButton}>
                <Feather name="camera" size={14} color="#ffffff" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            {/* First Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter first name"
                placeholderTextColor="#9CA4AB"
              />
            </View>

            {/* Last Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter last name"
                placeholderTextColor="#9CA4AB"
              />
            </View>

            {/* E-mail */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email"
                placeholderTextColor="#9CA4AB"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Date of Birth */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>{formatDate(dateOfBirth)}</Text>
                <MaterialIcons
                  name="calendar-today"
                  size={20}
                  color="#4B164C"
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={dateOfBirth}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                />
              )}
            </View>

            {/* Gender */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === "Male" && styles.genderButtonActive,
                  ]}
                  onPress={() => setGender("Male")}
                  activeOpacity={0.7}
                >
                  {gender === "Male" && (
                    <View style={styles.genderCheckmark}>
                      <Feather name="check" size={12} color="#111111" />
                    </View>
                  )}
                  <Text
                    style={[
                      styles.genderText,
                      gender === "Male" && styles.genderTextActive,
                    ]}
                  >
                    Male
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === "Female" && styles.genderButtonActive,
                  ]}
                  onPress={() => setGender("Female")}
                  activeOpacity={0.7}
                >
                  {gender === "Female" && (
                    <View style={styles.genderCheckmark}>
                      <Feather name="check" size={12} color="#111111" />
                    </View>
                  )}
                  <Text
                    style={[
                      styles.genderText,
                      gender === "Female" && styles.genderTextActive,
                    ]}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Location */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={location}
                onChangeText={setLocation}
                placeholder="Enter location"
                placeholderTextColor="#9CA4AB"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Save Changes Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveChanges}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

          {/* Bottom Padding */}
          <View style={{ height: 20 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
  },
  headerTitle: {
    color: "#111111",
    fontSize: 18,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageSection: {
    position: "relative",
    marginBottom: 60,
  },
  coverImageContainer: {
    width: "100%",
    height: 160,
    backgroundColor: "#B8E6F0",
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  coverImagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  coverEditButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#4B164C",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageContainer: {
    position: "absolute",
    bottom: -50,
    left: "50%",
    marginLeft: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ffffff",
    borderWidth: 4,
    borderColor: "#ffffff",
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileImagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
  },
  profileEditButton: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#4B164C",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  form: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "#9CA4AB",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_500Medium",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4B164C",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#111111",
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4B164C",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  dateText: {
    fontSize: 15,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#111111",
  },
  genderContainer: {
    flexDirection: "row",
    gap: 12,
  },
  genderButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#4B164C",
    backgroundColor: "#ffffff",
  },
  genderButtonActive: {
    backgroundColor: "#4B164C",
    borderColor: "#4B164C",
  },
  genderCheckmark: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  genderText: {
    fontSize: 15,
    fontFamily: "PlusJakartaSans_500Medium",
    color: "#111111",
  },
  genderTextActive: {
    color: "#ffffff",
  },
  textArea: {
    height: 100,
    borderRadius: 16,
    paddingTop: 14,
  },
  saveButton: {
    marginHorizontal: 20,
    marginTop: 12,
    backgroundColor: "#E3E7EC",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#9CA4AB",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
});
