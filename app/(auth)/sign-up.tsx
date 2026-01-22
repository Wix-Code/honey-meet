import { Link } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function SignUp() {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Create account</Text>
        <Text style={styles.headerSubtitle}>
          Lorem ipsum dolor sit amet
        </Text>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
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
          <Text style={styles.continueButtonText}>Continue with Email</Text>
        </TouchableOpacity>

        {/* Divider with "or continue with" */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialButtonsContainer}>
          {/* Google Button */}
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <AntDesign name="google" size={20} color="#111111" />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Apple Button */}
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <FontAwesome name="apple" size={22} color="#111111" />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Already have an account?</Text>
          <Link href="/(auth)/sign-up-email" asChild>
            <TouchableOpacity>
              <Text style={styles.signUpLink}>Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#4B164C",
  },
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  headerTitle: {
    color: "#FEFEFE",
    fontSize: 28,
    fontFamily: "PlusJakartaSans_700Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  headerSubtitle: {
    color: "#FEFEFE",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_500Medium",
    textAlign: "center",
    opacity: 0.8,
  },
  formSection: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
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
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#6C6C6C",
  },
  dividerText: {
    color: "#6C6C6C",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "PlusJakartaSans_500Medium",
    marginHorizontal: 16,
  },
  socialButtonsContainer: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 32,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 15,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#111111",
    borderRadius: 25,
  },
  socialButtonText: {
    color: "#111111",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 8,
  },
  signUpText: {
    color: "#6C6C6C",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  signUpLink: {
    color: "#4B164C",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
});