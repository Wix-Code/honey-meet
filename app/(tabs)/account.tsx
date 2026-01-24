import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Account settings data with icons
const accounts = [
  {
    name: "Personal Info",
    details: [
      {
        id: 1,
        name: "Profile",
        icon: "account-circle-outline",
        iconType: "MaterialCommunityIcons",
        route: "/profile",
      },
      {
        id: 2,
        name: "Payment Method",
        icon: "credit-card",
        iconType: "Feather",
        route: "/payment",
      },
    ],
  },
  {
    name: "Security",
    details: [
      {
        id: 1,
        name: "Change Password",
        icon: "lock-outline",
        iconType: "MaterialCommunityIcons",
        route: "/(pages)/change-password",
      },
      {
        id: 2,
        name: "Forgot Password",
        icon: "lock-reset",
        iconType: "MaterialCommunityIcons",
        route: "/(pages)/forgot-password",
      },
      {
        id: 3,
        name: "Security",
        icon: "shield-checkmark-outline",
        iconType: "Ionicons",
        route: "/(pages)/security",
      },
    ],
  },
  {
    name: "General",
    details: [
      {
        id: 1,
        name: "Language",
        icon: "language",
        iconType: "MaterialIcons",
        route: "/(pages)/languages",
      },
      {
        id: 2,
        name: "Clear Cache",
        icon: "trash-2",
        iconType: "Feather",
        route: "/cache",
      },
      {
        id: 3,
        name: "Notifications",
        icon: "bell",
        iconType: "Feather",
        route: "/(pages)/notifications",
      },
    ],
  },
  {
    name: "About",
    details: [
      {
        id: 1,
        name: "Legal and Policies",
        icon: "file-text",
        iconType: "Feather",
        route: "/(pages)/legal-policies",
      },
      {
        id: 2,
        name: "Help & Support",
        icon: "help-circle",
        iconType: "Feather",
        route: "/(pages)/help-support",
      },
      {
        id: 3,
        name: "About App",
        icon: "info",
        iconType: "Feather",
        route: "/about",
      },
    ],
  },
];

export default function Account() {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // Handle logout logic
          console.log("User logged out");
          router.replace("/(auth)/sign-in");
        },
      },
    ]);
  };

  const renderIcon = (iconName: string, iconType: string) => {
    const iconProps = {
      size: 22,
      color: "#4B164C",
    };

    switch (iconType) {
      case "MaterialCommunityIcons":
        return <MaterialCommunityIcons name={iconName as any} {...iconProps} />;
      case "Feather":
        return <Feather name={iconName as any} {...iconProps} />;
      case "MaterialIcons":
        return <MaterialIcons name={iconName as any} {...iconProps} />;
      case "Ionicons":
        return <Ionicons name={iconName as any} {...iconProps} />;
      case "FontAwesome5":
        return <FontAwesome5 name={iconName as any} {...iconProps} />;
      default:
        return <Feather name="circle" {...iconProps} />;
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
        <TouchableOpacity style={styles.editButton}>
          <Feather name="edit-2" size={20} color="#4B164C" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Section */}
        <TouchableOpacity style={styles.profileSection}>
          <Image
            style={styles.profileImage}
            source={require("../../assets/images/3.jpg")}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Wisdom Ogbonna</Text>
            <Text style={styles.profileUsername}>@wisdomogbonna</Text>
          </View>
          <Entypo name="chevron-thin-right" size={20} color="#9CA4AB" />
        </TouchableOpacity>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2.4K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1.2K</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>156</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
        </View>

        {/* Settings Sections */}
        {accounts.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.name}</Text>
            <View style={styles.sectionContent}>
              {section.details.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingItem,
                    itemIndex === section.details.length - 1 &&
                      styles.settingItemLast,
                  ]}
                  onPress={() => router.push(item.route as any)}
                >
                  <View style={styles.settingLeft}>
                    <View style={styles.iconContainer}>
                      {renderIcon(item.icon, item.iconType)}
                    </View>
                    <Text style={styles.settingName}>{item.name}</Text>
                  </View>
                  <Entypo name="chevron-thin-right" size={18} color="#9CA4AB" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>App Version</Text>
          <Text style={styles.versionNumber}>v1.0.0</Text>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Feather name="log-out" size={20} color="#FF3B30" />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>

        {/* Bottom Padding */}
        <View style={{ height: 60 }} />
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
  headerTitle: {
    color: "#111111",
    fontSize: 24,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: "#111111",
    fontSize: 18,
    fontFamily: "PlusJakartaSans_600SemiBold",
    marginBottom: 4,
  },
  profileUsername: {
    color: "#66707A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    marginHorizontal: 20,
    marginBottom: 8,
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "#111111",
    fontSize: 20,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 4,
  },
  statLabel: {
    color: "#78828A",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E3E7EC",
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#111111",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E7EC",
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingName: {
    color: "#111111",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_500Medium",
  },
  versionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 24,
  },
  versionText: {
    color: "#9CA4AB",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  versionNumber: {
    color: "#9CA4AB",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderWidth: 1.5,
    borderColor: "#FF3B30",
    borderRadius: 30,
    backgroundColor: "#ffffff",
  },
  logoutButtonText: {
    color: "#FF3B30",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
});
