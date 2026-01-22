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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

type Props = {
  prev: () => void;
  next: () => void;
};

export default function AboutYou({ prev, next }: Props) {
  const [name, setName] = useState("");

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
          <Text style={styles.title}>What is your name?</Text>

          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="#9CA4AB"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !name.trim() && styles.continueButtonDisabled,
            ]}
            activeOpacity={0.8}
            disabled={!name.trim()}
            onPress={next}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
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
  inputGroup: {
    marginBottom: 24,
  },
  input: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 25,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#4B164C",
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#111111",
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