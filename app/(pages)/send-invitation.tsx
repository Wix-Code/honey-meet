import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock users data
const users = [
  {
    id: 1,
    name: "Wisdom Ogbonna",
    image: require("../../assets/images/1.jpg"),
    location: "San Diego, California",
  },
  {
    id: 2,
    name: "Sarah Williams",
    image: require("../../assets/images/2.jpg"),
    location: "Los Angeles, CA",
  },
  {
    id: 3,
    name: "Emma Davis",
    image: require("../../assets/images/3.jpg"),
    location: "San Francisco, CA",
  },
  {
    id: 4,
    name: "Mike Johnson",
    image: require("../../assets/images/4.jpg"),
    location: "Seattle, Washington",
  },
  {
    id: 5,
    name: "Jessica Brown",
    image: require("../../assets/images/5.jpg"),
    location: "Miami, Florida",
  },
  {
    id: 6,
    name: "John Smith",
    image: require("../../assets/images/1.jpg"),
    location: "New York, NY",
  },
  {
    id: 7,
    name: "Lisa Taylor",
    image: require("../../assets/images/2.jpg"),
    location: "Chicago, Illinois",
  },
  {
    id: 8,
    name: "David Wilson",
    image: require("../../assets/images/3.jpg"),
    location: "Boston, MA",
  },
];

export default function SendInvitation() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectUser = (user: (typeof users)[0]) => {
    setSelectedUser(user);
    setShowUserModal(false);
    setSearchQuery("");
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSendInvitation = () => {
    if (!selectedUser) {
      Alert.alert("Error", "Please select a user");
      return;
    }
    if (!message.trim()) {
      Alert.alert("Error", "Please enter a message");
      return;
    }
    if (!location.trim()) {
      Alert.alert("Error", "Please enter a location");
      return;
    }

    setShowSuccessModal(true);
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={20} color="#4B164C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Send Invitation</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Section Title */}
          <Text style={styles.sectionTitle}>Select User</Text>

          {/* User Selector */}
          <TouchableOpacity
            style={styles.userSelector}
            onPress={() => setShowUserModal(true)}
            activeOpacity={0.7}
          >
            {selectedUser ? (
              <>
                <Image source={selectedUser.image} style={styles.userImage} />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{selectedUser.name}</Text>
                  <Text style={styles.userLocation}>
                    {selectedUser.location}
                  </Text>
                </View>
                <Feather name="chevron-down" size={20} color="#9CA4AB" />
              </>
            ) : (
              <>
                <View style={styles.placeholderIcon}>
                  <Feather name="user" size={24} color="#9CA4AB" />
                </View>
                <Text style={styles.placeholderText}>Select a user</Text>
                <Feather name="chevron-down" size={20} color="#9CA4AB" />
              </>
            )}
          </TouchableOpacity>

          {/* Detail Invitation Section */}
          <Text style={styles.sectionTitle}>Detail Invitation</Text>

          {/* Message */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Message</Text>
            <View style={styles.textAreaWrapper}>
              <TextInput
                style={styles.textArea}
                placeholder="Write your invitation message..."
                placeholderTextColor="#9CA4AB"
                multiline
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Date and Time Row */}
          <View style={styles.dateTimeRow}>
            {/* Date */}
            <View style={styles.dateTimeItem}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                style={styles.dateTimeInput}
                onPress={() => setShowDatePicker(true)}
              >
                <MaterialIcons
                  name="calendar-today"
                  size={20}
                  color="#4B164C"
                />
                <Text style={styles.dateTimeText}>{formatDate(date)}</Text>
              </TouchableOpacity>
            </View>

            {/* Time */}
            <View style={styles.dateTimeItem}>
              <Text style={styles.label}>Time</Text>
              <TouchableOpacity
                style={styles.dateTimeInput}
                onPress={() => setShowTimePicker(true)}
              >
                <Ionicons name="time-outline" size={20} color="#4B164C" />
                <Text style={styles.dateTimeText}>{formatTime(time)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Location */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="location-outline"
                size={20}
                color="#9CA4AB"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter location"
                placeholderTextColor="#9CA4AB"
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>

          {/* Date Picker */}
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}

          {/* Time Picker */}
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </ScrollView>

        {/* Send Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendInvitation}
            activeOpacity={0.8}
          >
            <Text style={styles.sendButtonText}>Send Invitation</Text>
          </TouchableOpacity>
        </View>

        {/* User Selection Modal */}
        <Modal
          visible={showUserModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowUserModal(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPress={() => setShowUserModal(false)}
            />
            <View style={styles.modalContent}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select User</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowUserModal(false)}
                >
                  <Feather name="x" size={24} color="#111111" />
                </TouchableOpacity>
              </View>

              {/* Search */}
              <View style={styles.searchContainer}>
                <Feather name="search" size={20} color="#9CA4AB" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search users..."
                  placeholderTextColor="#9CA4AB"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery("")}>
                    <Feather name="x" size={18} color="#9CA4AB" />
                  </TouchableOpacity>
                )}
              </View>

              {/* User List */}
              <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.userItem}
                    onPress={() => handleSelectUser(item)}
                    activeOpacity={0.7}
                  >
                    <Image source={item.image} style={styles.modalUserImage} />
                    <View style={styles.modalUserInfo}>
                      <Text style={styles.modalUserName}>{item.name}</Text>
                      <Text style={styles.modalUserLocation}>
                        {item.location}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.radioButton,
                        selectedUser?.id === item.id &&
                          styles.radioButtonSelected,
                      ]}
                    >
                      {selectedUser?.id === item.id && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                  <View style={styles.emptyState}>
                    <Feather name="users" size={48} color="#E3E7EC" />
                    <Text style={styles.emptyText}>No users found</Text>
                  </View>
                }
              />
            </View>
          </View>
        </Modal>

        {/* Success Modal */}
        <Modal
          visible={showSuccessModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowSuccessModal(false)}
        >
          <View style={styles.successModalContainer}>
            <View style={styles.successModalContent}>
              <Image
                source={require("../../assets/images/jet.png")}
                style={styles.successImage}
              />
              <Text style={styles.successTitle}>
                Your invitation has been successfully sent
              </Text>
              <Text style={styles.successMessage}>
                Your invitation has been successfully sent, please wait for the
                response to your invitation to see whether it was accepted or
                not, thank you
              </Text>

              <TouchableOpacity
                style={styles.homeButton}
                onPress={() => {
                  setShowSuccessModal(false);
                  router.push("/(tabs)/discover");
                }}
              >
                <Text style={styles.homeButtonText}>Back to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },
  sectionTitle: {
    color: "#111111",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 12,
  },
  userSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F8FE",
    borderRadius: 40,
    padding: 12,
    marginBottom: 32,
  },
  userImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#111111",
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#66707A",
  },
  placeholderIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E3E7EC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  placeholderText: {
    flex: 1,
    fontSize: 15,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#9CA4AB",
  },
  inputGroup: {
    marginBottom: 20,
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
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#111111",
  },
  textAreaWrapper: {
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    padding: 16,
  },
  textArea: {
    fontSize: 15,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#111111",
    minHeight: 100,
  },
  dateTimeRow: {
    flexDirection: "column",
    gap: 20,
    marginBottom: 20,
  },
  dateTimeItem: {
    flex: 1,
  },
  dateTimeInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 26,
    gap: 12,
  },
  dateTimeText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "PlusJakartaSans_500Medium",
    color: "#111111",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  sendButton: {
    backgroundColor: "#4B164C",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#111111",
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F8FE",
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 40,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#111111",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  modalUserImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  modalUserInfo: {
    flex: 1,
  },
  modalUserName: {
    fontSize: 15,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#111111",
    marginBottom: 4,
  },
  modalUserLocation: {
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#9CA4AB",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E3E7EC",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#4B164C",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4B164C",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: "PlusJakartaSans_500Medium",
    color: "#9CA4AB",
    marginTop: 12,
  },
  // Success Modal
  successModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  successModalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    width: "100%",
  },
  successImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 20,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#111111",
    textAlign: "center",
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#66707A",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  homeButton: {
    backgroundColor: "#4B164C",
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  homeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
});
