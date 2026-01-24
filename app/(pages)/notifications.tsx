import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Notification settings data
const notificationTypes = [
  {
    id: 1,
    category: "Messages",
    items: [
      {
        id: "msg-1",
        title: "New Messages",
        description: "Get notified when you receive new messages",
        icon: "message-circle",
        iconType: "Feather",
        enabled: true,
      },
      {
        id: "msg-2",
        title: "Message Reactions",
        description: "When someone reacts to your message",
        icon: "heart",
        iconType: "Feather",
        enabled: true,
      },
    ],
  },
  {
    id: 2,
    category: "Activity",
    items: [
      {
        id: "act-1",
        title: "Likes",
        description: "When someone likes your post or profile",
        icon: "favorite",
        iconType: "MaterialIcons",
        enabled: false,
      },
      {
        id: "act-2",
        title: "Comments",
        description: "When someone comments on your posts",
        icon: "chatbox",
        iconType: "Ionicons",
        enabled: true,
      },
      {
        id: "act-3",
        title: "New Followers",
        description: "When someone starts following you",
        icon: "person-add",
        iconType: "Ionicons",
        enabled: true,
      },
    ],
  },
  {
    id: 3,
    category: "Matches",
    items: [
      {
        id: "match-1",
        title: "New Matches",
        description: "When you get a new match",
        icon: "people",
        iconType: "Ionicons",
        enabled: true,
      },
      {
        id: "match-2",
        title: "Match Messages",
        description: "When your matches send you messages",
        icon: "mail",
        iconType: "Feather",
        enabled: true,
      },
    ],
  },
  {
    id: 4,
    category: "Updates",
    items: [
      {
        id: "upd-1",
        title: "App Updates",
        description: "Notifications about new app features",
        icon: "notifications",
        iconType: "Ionicons",
        enabled: false,
      },
      {
        id: "upd-2",
        title: "Promotional",
        description: "Special offers and promotions",
        icon: "gift",
        iconType: "Feather",
        enabled: false,
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

export default function Notifications() {
  const [notifications, setNotifications] = useState(notificationTypes);

  const toggleNotification = (categoryId: number, itemId: string) => {
    setNotifications((prev) =>
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
        return <Feather name="bell" {...iconProps} />;
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
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        <Text style={styles.description}>
          Manage your notification preferences to stay updated on what matters
          most to you
        </Text>

        {/* Notification Categories */}
        {notifications.map((category) => (
          <View key={category.id} style={styles.category}>
            <Text style={styles.categoryTitle}>{category.category}</Text>
            <View style={styles.categoryContent}>
              {category.items.map((item, index) => (
                <View
                  key={item.id}
                  style={[
                    styles.notificationItem,
                    index === category.items.length - 1 &&
                      styles.notificationItemLast,
                  ]}
                >
                  <View style={styles.iconContainer}>
                    {renderIcon(item.icon, item.iconType)}
                  </View>
                  <View style={styles.notificationInfo}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationDescription}>
                      {item.description}
                    </Text>
                  </View>
                  <ToggleSwitch
                    value={item.enabled}
                    onToggle={() => toggleNotification(category.id, item.id)}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color="#4B164C" />
          <Text style={styles.infoText}>
            You can change these settings at any time. Some notifications may
            still be sent for important account updates.
          </Text>
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
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E7EC",
  },
  notificationItemLast: {
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
  notificationInfo: {
    flex: 1,
    marginRight: 12,
  },
  notificationTitle: {
    color: "#111111",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_600SemiBold",
    marginBottom: 4,
  },
  notificationDescription: {
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
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#F6F8FE",
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4B164C",
  },
  infoText: {
    flex: 1,
    color: "#66707A",
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 20,
  },
});
