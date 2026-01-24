import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Available languages
const languages = [
  { id: 1, name: "English", code: "en", flag: "🇺🇸" },
  { id: 2, name: "Spanish", code: "es", flag: "🇪🇸" },
  { id: 3, name: "French", code: "fr", flag: "🇫🇷" },
  { id: 4, name: "German", code: "de", flag: "🇩🇪" },
  { id: 5, name: "Italian", code: "it", flag: "🇮🇹" },
  { id: 6, name: "Portuguese", code: "pt", flag: "🇵🇹" },
  { id: 7, name: "Chinese (Simplified)", code: "zh", flag: "🇨🇳" },
  { id: 8, name: "Japanese", code: "ja", flag: "🇯🇵" },
  { id: 9, name: "Korean", code: "ko", flag: "🇰🇷" },
  { id: 10, name: "Arabic", code: "ar", flag: "🇸🇦" },
  { id: 11, name: "Russian", code: "ru", flag: "🇷🇺" },
  { id: 12, name: "Hindi", code: "hi", flag: "🇮🇳" },
  { id: 13, name: "Turkish", code: "tr", flag: "🇹🇷" },
  { id: 14, name: "Dutch", code: "nl", flag: "🇳🇱" },
  { id: 15, name: "Polish", code: "pl", flag: "🇵🇱" },
  { id: 16, name: "Swedish", code: "sv", flag: "🇸🇪" },
  { id: 17, name: "Indonesian", code: "id", flag: "🇮🇩" },
  { id: 18, name: "Vietnamese", code: "vi", flag: "🇻🇳" },
];

export default function LanguageSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    // Here you would typically save the language preference
    // and apply it to your app
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={20} color="#4B164C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Language</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        <Text style={styles.description}>
          Select your preferred language. The app will restart to apply changes.
        </Text>

        {/* Language List */}
        <View style={styles.languageList}>
          {languages.map((language, index) => (
            <TouchableOpacity
              key={language.id}
              style={[
                styles.languageItem,
                index === languages.length - 1 && styles.languageItemLast,
              ]}
              onPress={() => handleLanguageSelect(language.code)}
              activeOpacity={0.7}
            >
              <View style={styles.languageLeft}>
                <Text style={styles.flag}>{language.flag}</Text>
                <View style={styles.languageInfo}>
                  <Text style={styles.languageName}>{language.name}</Text>
                  <Text style={styles.languageCode}>{language.code}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.radioButton,
                  selectedLanguage === language.code &&
                    styles.radioButtonSelected,
                ]}
              >
                {selectedLanguage === language.code && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color="#4B164C" />
          <Text style={styles.infoText}>
            Changing the language will restart the app. Your data and settings
            will be preserved.
          </Text>
        </View>

        {/* Apply Button */}
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply Language</Text>
        </TouchableOpacity>

        {/* Bottom Padding */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#111111",
    fontSize: 18,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  placeholder: {
    width: 48,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  description: {
    color: "#66707A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 22,
    marginBottom: 24,
  },
  languageList: {
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E7EC",
  },
  languageItemLast: {
    borderBottomWidth: 0,
  },
  languageLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  flag: {
    fontSize: 32,
    marginRight: 12,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    color: "#111111",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_600SemiBold",
    marginBottom: 2,
  },
  languageCode: {
    color: "#9CA4AB",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E3E7EC",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#4B164C",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4B164C",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#F6F8FE",
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4B164C",
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    color: "#66707A",
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 20,
  },
  applyButton: {
    backgroundColor: "#4B164C",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
});
