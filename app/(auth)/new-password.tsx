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

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.headerSubtitle}>
          Your new password must be different from previously used passwords
        </Text>
      </View>

      {/* Form Section */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.formSection}
        showsVerticalScrollIndicator={false}
      >
        {/* New Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter new password"
              placeholderTextColor="#9CA4AB"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={styles.eyeIcon}
              activeOpacity={0.7}
            >
              <Feather
                name={showNewPassword ? "eye" : "eye-off"}
                size={20}
                color="#78828A"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm new password"
              placeholderTextColor="#9CA4AB"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
              activeOpacity={0.7}
            >
              <Feather
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={20}
                color="#78828A"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Reset Password Button */}
        <TouchableOpacity style={styles.resetButton} activeOpacity={0.8}>
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>

        {/* Back to Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Remember your password?</Text>
          <Link href="/(auth)/sign-in" asChild>
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
    marginBottom: 10
  },
  title: {
    color: "#111111",
    fontSize: 24,
    fontFamily: "PlusJakartaSans_700Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    color: "#66707A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_500Medium",
    textAlign: "center",
    opacity: 0.8,
    lineHeight: 20,
  },
  scrollView: {
    flex: 1,
  },
  formSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: "#78828A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_500Medium",
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F8FE",
    borderRadius: 25,
    paddingRight: 16,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#111111",
  },
  eyeIcon: {
    padding: 4,
  },
  resetButton: {
    padding: 16,
    backgroundColor: "#4B164C",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  resetButtonText: {
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