import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

type Props = {
  prev: () => void;
  next: () => void;
  isLastStep?: boolean;
};

export default function DescribeYourself({ prev, next, isLastStep }: Props) {
  const [description, setDescription] = useState("");
  const maxCharacters = 500;

  const handleContinue = () => {
    if (isLastStep) {
      // Navigate to main app or complete onboarding
      router.replace("/(tabs)");
    } else {
      next();
    }
  };

  const remainingChars = maxCharacters - description.length;

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={prev} style={styles.backButton}>
            <Feather name="arrow-left" size={20} color="#4B164C" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Describe yourself</Text>
          <Text style={styles.subtitle}>
            Tell us a bit about yourself. What makes you unique?
          </Text>

          {/* Textarea */}
          <View style={styles.textareaContainer}>
            <TextInput
              style={styles.textarea}
              placeholder="Write something about yourself..."
              placeholderTextColor="#9CA4AB"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={10}
              maxLength={maxCharacters}
              textAlignVertical="top"
              autoCorrect={true}
              autoCapitalize="sentences"
            />
            <View style={styles.charCounter}>
              <Text
                style={[
                  styles.charCountText,
                  remainingChars < 50 && styles.charCountWarning,
                ]}
              >
                {remainingChars} characters remaining
              </Text>
            </View>
          </View>

          {/* Suggestions */}
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Need inspiration?</Text>
            <Text style={styles.suggestionText}>
              • What are your passions and hobbies?
            </Text>
            <Text style={styles.suggestionText}>
              • What do you do for fun?
            </Text>
            <Text style={styles.suggestionText}>
              • What are you looking for?
            </Text>
            <Text style={styles.suggestionText}>
              • What makes you smile?
            </Text>
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              description.trim().length < 20 && styles.continueButtonDisabled,
            ]}
            activeOpacity={0.8}
            disabled={description.trim().length < 20}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>
              {isLastStep ? "Complete" : "Continue"}
            </Text>
          </TouchableOpacity>
          {description.trim().length < 20 && (
            <Text style={styles.helperText}>
              Write at least 20 characters ({description.trim().length}/20)
            </Text>
          )}
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    color: "#111111",
    fontSize: 24,
    fontFamily: "PlusJakartaSans_700Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#66707A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  textareaContainer: {
    marginBottom: 24,
  },
  textarea: {
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#111111",
    minHeight: 180,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  charCounter: {
    marginTop: 8,
    alignItems: "flex-end",
  },
  charCountText: {
    fontSize: 12,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#9CA4AB",
  },
  charCountWarning: {
    color: "#FF6B6B",
  },
  suggestionsContainer: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#111111",
    marginBottom: 12,
  },
  suggestionText: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#66707A",
    marginBottom: 8,
    lineHeight: 20,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  continueButton: {
    padding: 16,
    backgroundColor: "#4B164C",
    borderRadius: 25,
    alignItems: "center",
  },
  continueButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  continueButtonText: {
    color: "#FEFEFE",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  helperText: {
    color: "#66707A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    textAlign: "center",
    marginTop: 12,
  },
});