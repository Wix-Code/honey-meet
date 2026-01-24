import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// FAQ data
const faqs = [
  {
    id: 1,
    question: "How do I reset my password?",
    answer:
      "Go to Settings > Security > Change Password. Enter your current password and choose a new one. Make sure your new password is at least 8 characters long.",
  },
  {
    id: 2,
    question: "How do I delete my account?",
    answer:
      "Go to Settings > Account > Delete Account. Please note that this action is permanent and cannot be undone. All your data will be permanently deleted.",
  },
  {
    id: 3,
    question: "How do I report inappropriate content?",
    answer:
      "Tap the three dots menu on any post or profile, then select 'Report'. Choose the reason for reporting and submit. Our team will review it within 24 hours.",
  },
  {
    id: 4,
    question: "How do I change my notification settings?",
    answer:
      "Go to Settings > Notifications. You can customize which notifications you want to receive for messages, likes, comments, and more.",
  },
  {
    id: 5,
    question: "How do I block a user?",
    answer:
      "Go to the user's profile, tap the three dots menu, and select 'Block User'. Blocked users cannot see your profile or contact you.",
  },
];

// Contact options
const contactOptions = [
  {
    id: 1,
    title: "Email Support",
    description: "Get help via email within 24 hours",
    icon: "mail",
    iconType: "Feather",
    action: () => Linking.openURL("mailto:support@example.com"),
  },
  {
    id: 2,
    title: "Live Chat",
    description: "Chat with our support team",
    icon: "message-circle",
    iconType: "Feather",
    action: () => console.log("Open live chat"),
  },
  {
    id: 3,
    title: "Call Us",
    description: "Mon-Fri, 9AM-5PM EST",
    icon: "phone",
    iconType: "Feather",
    action: () => Linking.openURL("tel:+1234567890"),
  },
  {
    id: 4,
    title: "Help Center",
    description: "Browse articles and guides",
    icon: "book-open",
    iconType: "Feather",
    action: () => Linking.openURL("https://help.example.com"),
  },
];

export default function HelpSupport() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const renderIcon = (iconName: string, iconType: string) => {
    const iconProps = {
      size: 20,
      color: "#4B164C",
    };

    switch (iconType) {
      case "Feather":
        return <Feather name={iconName as any} {...iconProps} />;
      case "MaterialIcons":
        return <MaterialIcons name={iconName as any} {...iconProps} />;
      case "Ionicons":
        return <Ionicons name={iconName as any} {...iconProps} />;
      default:
        return <Feather name="help-circle" {...iconProps} />;
    }
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
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        <Text style={styles.description}>
          Find answers to common questions or get in touch with our support team
        </Text>

        {/* Contact Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactGrid}>
            {contactOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.contactCard}
                onPress={option.action}
                activeOpacity={0.7}
              >
                <View style={styles.contactIconContainer}>
                  {renderIcon(option.icon, option.iconType)}
                </View>
                <Text style={styles.contactTitle}>{option.title}</Text>
                <Text style={styles.contactDescription}>
                  {option.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqList}>
            {faqs.map((faq, index) => (
              <View
                key={faq.id}
                style={[
                  styles.faqItem,
                  index === faqs.length - 1 && styles.faqItemLast,
                ]}
              >
                <TouchableOpacity
                  style={styles.faqQuestion}
                  onPress={() => toggleFaq(faq.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.faqQuestionText}>{faq.question}</Text>
                  <Feather
                    name={
                      expandedFaq === faq.id ? "chevron-up" : "chevron-down"
                    }
                    size={20}
                    color="#4B164C"
                  />
                </TouchableOpacity>
                {expandedFaq === faq.id && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.quickLinks}>
            <TouchableOpacity
              style={styles.quickLink}
              onPress={() => router.push("/legal-policies")}
            >
              <Feather name="file-text" size={18} color="#4B164C" />
              <Text style={styles.quickLinkText}>Terms & Conditions</Text>
              <Feather name="chevron-right" size={18} color="#9CA4AB" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickLink}
              //onPress={() => router.push("/privacy-policy")}
            >
              <Feather name="shield" size={18} color="#4B164C" />
              <Text style={styles.quickLinkText}>Privacy Policy</Text>
              <Feather name="chevron-right" size={18} color="#9CA4AB" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickLink}
              //onPress={() => router.push("/community-guidelines")}
            >
              <Feather name="users" size={18} color="#4B164C" />
              <Text style={styles.quickLinkText}>Community Guidelines</Text>
              <Feather name="chevron-right" size={18} color="#9CA4AB" />
            </TouchableOpacity>
          </View>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>App Version 1.0.0</Text>
          <Text style={styles.versionSubtext}>Last updated: Jan 24, 2026</Text>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: "#111111",
    fontSize: 18,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 16,
  },
  contactGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  contactCard: {
    width: "48%",
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  contactTitle: {
    color: "#111111",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
    marginBottom: 4,
    textAlign: "center",
  },
  contactDescription: {
    color: "#66707A",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_400Regular",
    textAlign: "center",
    lineHeight: 18,
  },
  faqList: {
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    overflow: "hidden",
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#E3E7EC",
  },
  faqItemLast: {
    borderBottomWidth: 0,
  },
  faqQuestion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  faqQuestionText: {
    flex: 1,
    color: "#111111",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_600SemiBold",
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    color: "#66707A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 22,
  },
  quickLinks: {
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    overflow: "hidden",
  },
  quickLink: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E7EC",
  },
  quickLinkText: {
    flex: 1,
    marginLeft: 12,
    color: "#111111",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_500Medium",
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  versionText: {
    color: "#9CA4AB",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_500Medium",
    marginBottom: 4,
  },
  versionSubtext: {
    color: "#9CA4AB",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_400Regular",
  },
});
