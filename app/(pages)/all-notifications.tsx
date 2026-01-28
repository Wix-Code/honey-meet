import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock notifications data
const allNotifications = [
  {
    id: 1,
    type: "like",
    user: "Sarah Williams",
    image: require("../../assets/images/1.jpg"),
    message: "liked your post",
    time: "2 hours ago",
    date: new Date(),
    read: false,
  },
  {
    id: 2,
    type: "comment",
    user: "Mike Johnson",
    image: require("../../assets/images/2.jpg"),
    message: "commented on your post",
    time: "4 hours ago",
    date: new Date(),
    read: false,
  },
  {
    id: 3,
    type: "follow",
    user: "Emma Davis",
    image: require("../../assets/images/3.jpg"),
    message: "started following you",
    time: "6 hours ago",
    date: new Date(),
    read: true,
  },
  {
    id: 4,
    type: "match",
    user: "Jessica Brown",
    image: require("../../assets/images/4.jpg"),
    message: "You have a new match!",
    time: "Yesterday",
    date: new Date(Date.now() - 86400000), // Yesterday
    read: true,
  },
  {
    id: 5,
    type: "message",
    user: "David Wilson",
    image: require("../../assets/images/5.jpg"),
    message: "sent you a message",
    time: "Yesterday",
    date: new Date(Date.now() - 86400000),
    read: true,
  },
  {
    id: 6,
    type: "invitation",
    user: "Lisa Taylor",
    image: require("../../assets/images/1.jpg"),
    message: "sent you a date invitation",
    time: "Yesterday",
    date: new Date(Date.now() - 86400000),
    read: true,
  },
];

export default function AllNotifications() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notifications, setNotifications] = useState(allNotifications);

  const handleDateSelect = (date: any) => {
    const selected = new Date(date.dateString);
    setSelectedDate(selected);
    setShowCalendar(false);
    // Filter notifications by selected date
    // In a real app, you'd fetch notifications for this date
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <FontAwesome name="heart" size={16} color="#FF3B30" />;
      case "comment":
        return <Ionicons name="chatbubble" size={16} color="#4B164C" />;
      case "follow":
        return <Ionicons name="person-add" size={16} color="#4B164C" />;
      case "match":
        return <FontAwesome name="star" size={16} color="#FFD700" />;
      case "message":
        return <Ionicons name="mail" size={16} color="#4B164C" />;
      case "invitation":
        return <MaterialIcons name="event" size={16} color="#4B164C" />;
      default:
        return <Feather name="bell" size={16} color="#4B164C" />;
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isYesterday = (date: Date) => {
    const yesterday = new Date(Date.now() - 86400000);
    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  };

  const groupNotificationsByDate = () => {
    const grouped: { [key: string]: typeof notifications } = {
      Today: [],
      Yesterday: [],
      Older: [],
    };

    notifications.forEach((notif) => {
      if (isToday(notif.date)) {
        grouped.Today.push(notif);
      } else if (isYesterday(notif.date)) {
        grouped.Yesterday.push(notif);
      } else {
        grouped.Older.push(notif);
      }
    });

    return grouped;
  };

  const groupedNotifications = groupNotificationsByDate();

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif,
      ),
    );
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
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setShowCalendar(true)}
        >
          <Feather name="calendar" size={20} color="#4B164C" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Today Section */}
        {groupedNotifications.Today.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today</Text>
            {groupedNotifications.Today.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  !notification.read && styles.notificationCardUnread,
                ]}
                onPress={() => markAsRead(notification.id)}
                activeOpacity={0.7}
              >
                <View style={styles.notificationContent}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={notification.image}
                      style={styles.userImage}
                    />
                    <View style={styles.iconBadge}>
                      {getNotificationIcon(notification.type)}
                    </View>
                  </View>

                  <View style={styles.notificationText}>
                    <Text style={styles.notificationMessage}>
                      <Text style={styles.userName}>{notification.user}</Text>{" "}
                      {notification.message}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {notification.time}
                    </Text>
                  </View>

                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Yesterday Section */}
        {groupedNotifications.Yesterday.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Yesterday</Text>
            {groupedNotifications.Yesterday.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  !notification.read && styles.notificationCardUnread,
                ]}
                onPress={() => markAsRead(notification.id)}
                activeOpacity={0.7}
              >
                <View style={styles.notificationContent}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={notification.image}
                      style={styles.userImage}
                    />
                    <View style={styles.iconBadge}>
                      {getNotificationIcon(notification.type)}
                    </View>
                  </View>

                  <View style={styles.notificationText}>
                    <Text style={styles.notificationMessage}>
                      <Text style={styles.userName}>{notification.user}</Text>{" "}
                      {notification.message}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {notification.time}
                    </Text>
                  </View>

                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Older Section */}
        {groupedNotifications.Older.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Older</Text>
            {groupedNotifications.Older.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  !notification.read && styles.notificationCardUnread,
                ]}
                onPress={() => markAsRead(notification.id)}
                activeOpacity={0.7}
              >
                <View style={styles.notificationContent}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={notification.image}
                      style={styles.userImage}
                    />
                    <View style={styles.iconBadge}>
                      {getNotificationIcon(notification.type)}
                    </View>
                  </View>

                  <View style={styles.notificationText}>
                    <Text style={styles.notificationMessage}>
                      <Text style={styles.userName}>{notification.user}</Text>{" "}
                      {notification.message}
                    </Text>
                    <Text style={styles.notificationTime}>
                      {notification.time}
                    </Text>
                  </View>

                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Empty State */}
        {notifications.length === 0 && (
          <View style={styles.emptyState}>
            <Feather name="bell-off" size={64} color="#E3E7EC" />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptySubtitle}>
              You're all caught up! Check back later for updates.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.calendarModalContainer}>
          <TouchableOpacity
            style={styles.calendarBackdrop}
            activeOpacity={1}
            onPress={() => setShowCalendar(false)}
          />
          <View style={styles.calendarContent}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>Select Date</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowCalendar(false)}
              >
                <Feather name="x" size={24} color="#111111" />
              </TouchableOpacity>
            </View>

            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{
                [selectedDate.toISOString().split("T")[0]]: {
                  selected: true,
                  selectedColor: "#4B164C",
                },
              }}
              theme={{
                todayTextColor: "#4B164C",
                selectedDayBackgroundColor: "#4B164C",
                selectedDayTextColor: "#ffffff",
                arrowColor: "#4B164C",
                monthTextColor: "#111111",
                textDayFontFamily: "PlusJakartaSans_500Medium",
                textMonthFontFamily: "PlusJakartaSans_700Bold",
                textDayHeaderFontFamily: "PlusJakartaSans_600SemiBold",
              }}
            />
          </View>
        </View>
      </Modal>
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
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#111111",
    marginBottom: 12,
  },
  notificationCard: {
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  notificationCardUnread: {
    backgroundColor: "#EEE5F5",
    borderLeftWidth: 4,
    borderLeftColor: "#4B164C",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    marginRight: 12,
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  iconBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#F6F8FE",
  },
  notificationText: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#111111",
    lineHeight: 20,
    marginBottom: 4,
  },
  userName: {
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#111111",
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#9CA4AB",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4B164C",
    marginLeft: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#111111",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#9CA4AB",
    textAlign: "center",
  },
  // Calendar Modal
  calendarModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  calendarBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  calendarContent: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 20,
    width: "90%",
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 18,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#111111",
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
