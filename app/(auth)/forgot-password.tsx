import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

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
      </View>

      <View style={styles.headerSection}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.headerSubtitle}>
          Recover your account password
        </Text>
      </View>

      {/* Form Section */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.formSection}
        showsVerticalScrollIndicator={false}
      >
        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#9CA4AB"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} activeOpacity={0.8}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        {/* Back to Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Remember your password?</Text>
          <Link href="/(auth)/new-password" asChild>
            <TouchableOpacity>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
  },
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 16,
  },
  title: {
    color: "#111111",
    fontSize: 24,
    fontFamily: "PlusJakartaSans_700Bold",
    textAlign: "center",
    marginBottom: 4,
  },
  headerSubtitle: {
    color: "#66707A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_500Medium",
    textAlign: "center",
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,
  },
  formSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    marginTop: 10
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    color: "#78828A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_500Medium",
    marginBottom: 8,
  },
  input: {
    padding: 16,
    backgroundColor: "#F6F8FE",
    borderRadius: 25,
    fontSize: 16,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#111111",
  },
  continueButton: {
    padding: 16,
    backgroundColor: "#4B164C",
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 24,
  },
  continueButtonText: {
    color: "#FEFEFE",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 8,
  },
  signInText: {
    color: "#6C6C6C",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  signInLink: {
    color: "#4B164C",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
});