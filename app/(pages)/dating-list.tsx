import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data
const scheduledDates = [
  {
    id: 1,
    name: "Wisdom Ogbonna",
    image: require("../../assets/images/5.jpg"),
    location: "San Diego, California",
    address: "11 Fulton St, New York, NY 10038, USA",
    date: "18 January, 2025",
    time: "7:00 PM",
    status: "scheduled",
  },
  {
    id: 2,
    name: "Sarah Williams",
    image: require("../../assets/images/2.jpg"),
    location: "Los Angeles, CA",
    address: "345 Sunset Blvd, Los Angeles, CA 90028, USA",
    date: "20 January, 2025",
    time: "8:30 PM",
    status: "scheduled",
  },
  {
    id: 3,
    name: "Emma Davis",
    image: require("../../assets/images/3.jpg"),
    location: "San Francisco, CA",
    address: "789 Market St, San Francisco, CA 94103, USA",
    date: "22 January, 2025",
    time: "6:00 PM",
    status: "scheduled",
  },
];

const declinedDates = [
  {
    id: 4,
    name: "Jessica Brown",
    image: require("../../assets/images/1.jpg"),
    location: "Miami, Florida",
    address: "567 Ocean Dr, Miami Beach, FL 33139, USA",
    date: "15 January, 2025",
    time: "7:30 PM",
    status: "declined",
    reason: "Schedule conflict",
  },
  {
    id: 5,
    name: "Lisa Taylor",
    image: require("../../assets/images/4.jpg"),
    location: "Chicago, IL",
    address: "123 Michigan Ave, Chicago, IL 60601, USA",
    date: "12 January, 2025",
    time: "8:00 PM",
    status: "declined",
    reason: "Not interested",
  },
];

export default function DatingList() {
  const [activeTab, setActiveTab] = useState<"scheduled" | "declined">(
    "scheduled",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const currentData =
    activeTab === "scheduled" ? scheduledDates : declinedDates;

  const filteredData = currentData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleAccept = (id: number, name: string) => {
    Alert.alert("Date Confirmed", `Your date with ${name} has been confirmed!`);
    setExpandedCard(null);
  };

  const handleDecline = (id: number, name: string) => {
    Alert.alert(
      "Decline Date",
      `Are you sure you want to decline the date with ${name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Decline",
          style: "destructive",
          onPress: () => {
            Alert.alert("Date Declined", `Date with ${name} has been declined`);
            setExpandedCard(null);
          },
        },
      ],
    );
  };

  const renderDateCard = (item: (typeof scheduledDates)[0]) => {
    const isExpanded = expandedCard === item.id;

    return (
      <View key={item.id} style={styles.card}>
        {/* Date Header */}
        <View style={styles.dateHeader}>
          <FontAwesome name="calendar-check-o" size={18} color="#4B164C" />
          <Text style={styles.dateText}>
            {item.date} • {item.time}
          </Text>
        </View>

        {/* Person Info */}
        <TouchableOpacity
          style={styles.personInfo}
          onPress={() => toggleCard(item.id)}
          activeOpacity={0.7}
        >
          <Image source={item.image} style={styles.personImage} />
          <View style={styles.personDetails}>
            <Text style={styles.personName}>{item.name}</Text>
            <Text style={styles.personLocation}>{item.location}</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome6 name="phone" size={18} color="#4B164C" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="chatbubble-ellipses" size={18} color="#4B164C" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Location Info */}
        <View style={styles.locationInfo}>
          <Ionicons name="location-outline" size={20} color="#9CA4AB" />
          <Text style={styles.locationText}>{item.address}</Text>
        </View>

        {/* Expanded Content */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.divider} />

            {activeTab === "scheduled" ? (
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => router.push(`/date-details/${item.id}`)}
                >
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>

                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.declineButton}
                    onPress={() => handleDecline(item.id, item.name)}
                  >
                    <Feather name="x" size={16} color="#FF3B30" />
                    <Text style={styles.declineButtonText}>Decline</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => handleAccept(item.id, item.name)}
                  >
                    <Feather name="check" size={16} color="#ffffff" />
                    <Text style={styles.acceptButtonText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.declinedInfo}>
                <Text style={styles.declinedLabel}>Reason:</Text>
                <Text style={styles.declinedReason}>{item.reason}</Text>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => router.push(`/date-details/${item.id}`)}
                >
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Expand Indicator */}
        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => toggleCard(item.id)}
        >
          <Feather
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#9CA4AB"
          />
        </TouchableOpacity>
      </View>
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
        <Text style={styles.headerTitle}>Dating Schedule</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "scheduled" && styles.tabActive]}
          onPress={() => setActiveTab("scheduled")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "scheduled" && styles.tabTextActive,
            ]}
          >
            Scheduled
          </Text>
          {activeTab === "scheduled" && <View style={styles.tabIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "declined" && styles.tabActive]}
          onPress={() => setActiveTab("declined")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "declined" && styles.tabTextActive,
            ]}
          >
            Declined
          </Text>
          {activeTab === "declined" && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#9CA4AB" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search dates..."
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

      {/* Date List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredData.length > 0 ? (
          filteredData.map((item) => renderDateCard(item))
        ) : (
          <View style={styles.emptyState}>
            <FontAwesome
              name={
                activeTab === "scheduled" ? "calendar-o" : "calendar-times-o"
              }
              size={64}
              color="#E3E7EC"
            />
            <Text style={styles.emptyTitle}>
              {searchQuery
                ? "No results found"
                : activeTab === "scheduled"
                  ? "No scheduled dates"
                  : "No declined dates"}
            </Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery
                ? "Try a different search term"
                : activeTab === "scheduled"
                  ? "Your upcoming dates will appear here"
                  : "Dates you've declined will appear here"}
            </Text>
          </View>
        )}
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
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
    backgroundColor: "#F6F8FE",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    position: "relative",
  },
  tabActive: {},
  tabText: {
    fontSize: 15,
    fontFamily: "PlusJakartaSans_500Medium",
    color: "#9CA4AB",
  },
  tabTextActive: {
    color: "#4B164C",
    fontFamily: "PlusJakartaSans_700Bold",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#4B164C",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F8FE",
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 40,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#111111",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    position: "relative",
  },
  dateHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 13,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#4B164C",
  },
  personInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  personImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  personDetails: {
    flex: 1,
  },
  personName: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#111111",
    marginBottom: 4,
  },
  personLocation: {
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#66707A",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8,
  },
  locationText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#66707A",
    lineHeight: 20,
  },
  expandButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  expandedContent: {
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#E3E7EC",
    marginBottom: 16,
  },
  buttonRow: {
    gap: 12,
  },
  detailsButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#4B164C",
    alignItems: "center",
    marginBottom: 12,
  },
  detailsButtonText: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#4B164C",
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  declineButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  declineButtonText: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#FF3B30",
  },
  acceptButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#4B164C",
  },
  acceptButtonText: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#ffffff",
  },
  declinedInfo: {
    gap: 8,
  },
  declinedLabel: {
    fontSize: 13,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#9CA4AB",
  },
  declinedReason: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#66707A",
    marginBottom: 12,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
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
});
