import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

type Props = {
  prev: () => void;
  next: () => void;
};

const genderOptions = [
  { id: "male", label: "Male", icon: "♂" },
  { id: "female", label: "Female", icon: "♀" },
  { id: "other", label: "Other", icon: "⚧" },
  { id: "prefer-not", label: "Prefer not to say", icon: "—" },
];

export default function Gender({ prev, next }: Props) {
  const [selectedGender, setSelectedGender] = useState("");

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
        <View style={styles.content}>
          <Text style={styles.title}>What is your gender?</Text>

          <View style={styles.optionsContainer}>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.genderOption,
                  selectedGender === option.id && styles.genderOptionActive,
                ]}
                onPress={() => setSelectedGender(option.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.genderIcon}>{option.icon}</Text>
                <Text
                  style={[
                    styles.genderLabel,
                    selectedGender === option.id && styles.genderLabelActive,
                  ]}
                >
                  {option.label}
                </Text>
                {selectedGender === option.id && (
                  <View style={styles.checkmark}>
                    <Feather name="check" size={16} color="#4B164C" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedGender && styles.continueButtonDisabled,
            ]}
            activeOpacity={0.8}
            disabled={!selectedGender}
            onPress={next}
          >
            <Text style={styles.continueButtonText}>
              Continue
            </Text>
          </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    color: "#111111",
    fontSize: 24,
    fontFamily: "PlusJakartaSans_700Bold",
    textAlign: "center",
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  genderOptionActive: {
    backgroundColor: "#ffffff",
    borderColor: "#4B164C",
  },
  genderIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  genderLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: "PlusJakartaSans_500Medium",
    color: "#111111",
  },
  genderLabelActive: {
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
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
});