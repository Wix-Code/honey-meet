import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Security settings data
const securitySettings = [
  {
    id: 1,
    category: "Biometric Authentication",
    items: [
      {
        id: "bio-1",
        title: "Face ID",
        description: "Use Face ID to unlock the app",
        icon: "face-recognition",
        iconType: "MaterialCommunityIcons",
        enabled: true,
        hasToggle: true,
      },
      {
        id: "bio-2",
        title: "Touch ID / Fingerprint",
        description: "Use fingerprint to unlock the app",
        icon: "fingerprint",
        iconType: "MaterialIcons",
        enabled: false,
        hasToggle: true,
      },
    ],
  },
  {
    id: 2,
    category: "App Security",
    items: [
      {
        id: "sec-1",
        title: "App Lock",
        description: "Require authentication to open app",
        icon: "lock-closed",
        iconType: "Ionicons",
        enabled: true,
        hasToggle: true,
      },
      {
        id: "sec-2",
        title: "PIN Code",
        description: "Set up a PIN code for additional security",
        icon: "keypad",
        iconType: "Ionicons",
        enabled: false,
        hasToggle: false,
        route: "/setup-pin",
      },
    ],
  },
  {
    id: 3,
    category: "Privacy",
    items: [
      {
        id: "priv-1",
        title: "Hide Profile",
        description: "Make your profile invisible to others",
        icon: "eye-off",
        iconType: "Feather",
        enabled: false,
        hasToggle: true,
      },
      {
        id: "priv-2",
        title: "Incognito Mode",
        description: "Browse without leaving traces",
        icon: "shield-checkmark",
        iconType: "Ionicons",
        enabled: false,
        hasToggle: true,
      },
      {
        id: "priv-3",
        title: "Screenshot Protection",
        description: "Prevent screenshots in sensitive screens",
        icon: "camera-off",
        iconType: "Feather",
        enabled: true,
        hasToggle: true,
      },
    ],
  },
  {
    id: 4,
    category: "Account Security",
    items: [
      {
        id: "acc-1",
        title: "Two-Factor Authentication",
        description: "Add an extra layer of security",
        icon: "shield-half",
        iconType: "Ionicons",
        enabled: true,
        hasToggle: false,
        route: "/two-factor-auth",
      },
      {
        id: "acc-2",
        title: "Login Alerts",
        description: "Get notified of new login attempts",
        icon: "alert-circle",
        iconType: "Feather",
        enabled: true,
        hasToggle: true,
      },
      {
        id: "acc-3",
        title: "Active Sessions",
        description: "Manage your active login sessions",
        icon: "devices",
        iconType: "Ionicons",
        enabled: false,
        hasToggle: false,
        route: "/active-sessions",
      },
    ],
  },
];

const ToggleSwitch = ({
  value,
  onToggle,
}: {
  value: boolean;
  onToggle: () => void;
}) => {
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E3E7EC", "#4B164C"],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      style={styles.switchContainer}
    >
      <Animated.View style={[styles.switch, { backgroundColor }]}>
        <Animated.View
          style={[styles.switchThumb, { transform: [{ translateX }] }]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function SecuritySettings() {
  const [settings, setSettings] = useState(securitySettings);

  const toggleSetting = (categoryId: number, itemId: string) => {
    setSettings((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId ? { ...item, enabled: !item.enabled } : item,
              ),
            }
          : category,
      ),
    );
  };

  const handleItemPress = (item: any, categoryId: number) => {
    if (item.hasToggle) {
      toggleSetting(categoryId, item.id);
    } else if (item.route) {
      router.push(item.route);
    }
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
      case "MaterialCommunityIcons":
        return <MaterialCommunityIcons name={iconName as any} {...iconProps} />;
      default:
        return <Feather name="shield" {...iconProps} />;
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
        <Text style={styles.headerTitle}>Security</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        <Text style={styles.description}>
          Protect your account with enhanced security features and privacy
          controls
        </Text>

        {/* Security Categories */}
        {settings.map((category) => (
          <View key={category.id} style={styles.category}>
            <Text style={styles.categoryTitle}>{category.category}</Text>
            <View style={styles.categoryContent}>
              {category.items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingItem,
                    index === category.items.length - 1 &&
                      styles.settingItemLast,
                  ]}
                  onPress={() => handleItemPress(item, category.id)}
                  activeOpacity={item.hasToggle ? 1 : 0.7}
                >
                  <View style={styles.iconContainer}>
                    {renderIcon(item.icon, item.iconType)}
                  </View>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingDescription}>
                      {item.description}
                    </Text>
                  </View>
                  {item.hasToggle ? (
                    <ToggleSwitch
                      value={item.enabled}
                      onToggle={() => toggleSetting(category.id, item.id)}
                    />
                  ) : (
                    <Feather name="chevron-right" size={20} color="#9CA4AB" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Security Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>🔒 Security Tips</Text>
          <View style={styles.tipItem}>
            <View style={styles.tipDot} />
            <Text style={styles.tipText}>
              Enable Face ID or Touch ID for quick and secure access
            </Text>
          </View>
          <View style={styles.tipItem}>
            <View style={styles.tipDot} />
            <Text style={styles.tipText}>
              Use two-factor authentication for extra protection
            </Text>
          </View>
          <View style={styles.tipItem}>
            <View style={styles.tipDot} />
            <Text style={styles.tipText}>
              Review your active sessions regularly
            </Text>
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
  category: {
    marginBottom: 24,
  },
  categoryTitle: {
    color: "#111111",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 12,
  },
  categoryContent: {
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E7EC",
  },
  settingItemLast: {
    borderBottomWidth: 0,
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
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingTitle: {
    color: "#111111",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_600SemiBold",
    marginBottom: 4,
  },
  settingDescription: {
    color: "#66707A",
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 18,
  },
  switchContainer: {
    padding: 4,
  },
  switch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipsContainer: {
    backgroundColor: "#F6F8FE",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#4B164C",
  },
  tipsTitle: {
    color: "#111111",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_600SemiBold",
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  tipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4B164C",
    marginTop: 7,
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    color: "#66707A",
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 20,
  },
});
