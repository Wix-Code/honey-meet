import Feather from "@expo/vector-icons/Feather";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
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

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    if (email.trim()) {
      // Navigate to OTP screen
      // router.push({
      //   //pathname: "/(auth)/otp-verification",
      //   //params: { email },
      // });
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={20} color="#4B164C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Forgot Password</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          {/* <Text style={styles.title}>Forgot Your Password?</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you an OTP code to reset
            your password
          </Text> */}

          {/* Info Box */}
          <View style={styles.infoBox}>
            <View style={styles.iconContainer}>
              <SimpleLineIcons name="exclamation" size={20} color="#4B164C" />
            </View>
            <Text style={styles.infoText}>
              We will send the OTP code to your email for security in forgetting
              your password
            </Text>
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Feather name="mail" size={20} color="#9CA4AB" />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#9CA4AB"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
        </ScrollView>

        {/* Fixed Submit Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !email.trim() && styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!email.trim()}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Submit</Text>
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
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 20,
  },
  title: {
    color: "#111111",
    fontSize: 28,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 12,
  },
  subtitle: {
    color: "#66707A",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 24,
    marginBottom: 32,
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#F6F8FE",
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: "#4B164C",
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    color: "#111111",
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 32,
  },
  label: {
    color: "#111111",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E3E7EC",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#ffffff",
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    height: "100%",
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
    backgroundColor: "#4B164C",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  continueButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
});
