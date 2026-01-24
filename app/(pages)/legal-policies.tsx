import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const termsData = [
  {
    id: 1,
    title: "Terms of Service",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien, consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien, consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.",
    ],
  },
  {
    id: 2,
    title: "Changes to the Service and/or Terms",
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien, consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien, consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.",
    ],
  },
  {
    id: 3,
    title: "Privacy Policy",
    content: [
      "We take your privacy seriously and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data when you use our services.",
      "By using our app, you consent to the collection and use of information in accordance with this policy. We will never sell your personal information to third parties.",
    ],
  },
  {
    id: 4,
    title: "User Responsibilities",
    content: [
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
      "You agree not to use the service for any unlawful purposes or to violate any applicable laws or regulations in your jurisdiction.",
    ],
  },
  {
    id: 5,
    title: "Intellectual Property",
    content: [
      "All content, features, and functionality on our platform are owned by us and are protected by international copyright, trademark, and other intellectual property laws.",
      "You may not reproduce, distribute, or create derivative works from our content without express written permission.",
    ],
  },
  {
    id: 6,
    title: "Limitation of Liability",
    content: [
      "To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service.",
      "Our total liability for any claims under these terms shall not exceed the amount you paid us in the past twelve months.",
    ],
  },
];

export default function LegalPolicies() {
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
        <Text style={styles.headerTitle}>Legal & Policies</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Introduction */}
        <View style={styles.introSection}>
          <Text style={styles.introTitle}>Terms & Conditions</Text>
          <Text style={styles.introText}>Last updated: January 24, 2026</Text>
          <Text style={styles.introDescription}>
            Please read these terms and conditions carefully before using our
            service. By accessing or using the service, you agree to be bound by
            these terms.
          </Text>
        </View>

        {/* Terms Sections */}
        {termsData.map((section, index) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {index + 1}. {section.title}
            </Text>
            {section.content.map((paragraph, pIndex) => (
              <Text key={pIndex} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </View>
        ))}

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Contact Us</Text>
          <Text style={styles.contactText}>
            If you have any questions about these Terms & Conditions, please
            contact us at:
          </Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Feather name="mail" size={16} color="#4B164C" />
              <Text style={styles.contactItemText}>support@example.com</Text>
            </View>
            <View style={styles.contactItem}>
              <Feather name="globe" size={16} color="#4B164C" />
              <Text style={styles.contactItemText}>www.example.com</Text>
            </View>
          </View>
        </View>

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
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  introSection: {
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  introTitle: {
    color: "#111111",
    fontSize: 28,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 8,
  },
  introText: {
    color: "#9CA4AB",
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
    marginBottom: 16,
  },
  introDescription: {
    color: "#66707A",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 24,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    color: "#111111",
    fontSize: 18,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 12,
    lineHeight: 28,
  },
  paragraph: {
    color: "#66707A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 24,
    marginBottom: 12,
  },
  contactSection: {
    marginTop: 16,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  contactTitle: {
    color: "#111111",
    fontSize: 18,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 12,
  },
  contactText: {
    color: "#66707A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 22,
    marginBottom: 16,
  },
  contactInfo: {
    backgroundColor: "#F6F8FE",
    borderRadius: 12,
    padding: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  contactItemText: {
    color: "#111111",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_500Medium",
  },
});
