import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
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
const interests = [
  { id: 1, name: "Music", icon: "🎵" },
  { id: 2, name: "Travel", icon: "✈️" },
  { id: 3, name: "Gaming", icon: "🎮" },
  { id: 4, name: "Photography", icon: "📷" },
  { id: 5, name: "Cooking", icon: "🍳" },
  { id: 6, name: "Fitness", icon: "💪" },
  { id: 7, name: "Reading", icon: "📚" },
  { id: 8, name: "Art", icon: "🎨" },
];

const users = [
  {
    id: 1,
    name: "Sarah Williams",
    age: 28,
    image: require("../../assets/images/1.jpg"),
    location: "Los Angeles, CA",
    distance: "2 km",
    isOnline: true,
    isNew: true,
    interests: ["Music", "Travel"],
  },
  {
    id: 2,
    name: "Emma Davis",
    age: 25,
    image: require("../../assets/images/2.jpg"),
    location: "San Francisco, CA",
    distance: "5 km",
    isOnline: true,
    isNew: false,
    interests: ["Photography", "Art"],
  },
  {
    id: 3,
    name: "Jessica Brown",
    age: 27,
    image: require("../../assets/images/3.jpg"),
    location: "Miami, FL",
    distance: "3 km",
    isOnline: false,
    isNew: true,
    interests: ["Fitness", "Cooking"],
  },
  {
    id: 4,
    name: "Lisa Taylor",
    age: 26,
    image: require("../../assets/images/4.jpg"),
    location: "New York, NY",
    distance: "8 km",
    isOnline: true,
    isNew: false,
    interests: ["Reading", "Music"],
  },
  {
    id: 5,
    name: "Amy Johnson",
    age: 24,
    image: require("../../assets/images/5.jpg"),
    location: "Chicago, IL",
    distance: "1 km",
    isOnline: false,
    isNew: true,
    interests: ["Gaming", "Travel"],
  },
  {
    id: 6,
    name: "Rachel Green",
    age: 29,
    image: require("../../assets/images/1.jpg"),
    location: "Boston, MA",
    distance: "10 km",
    isOnline: true,
    isNew: false,
    interests: ["Art", "Photography"],
  },
];

const categories = ["All", "Online", "Nearby", "Newest"];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const getFilteredUsers = () => {
    let filtered = users;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by category
    switch (activeCategory) {
      case "Online":
        filtered = filtered.filter((user) => user.isOnline);
        break;
      case "Nearby":
        filtered = filtered.sort(
          (a, b) => parseInt(a.distance) - parseInt(b.distance),
        );
        break;
      case "Newest":
        filtered = filtered.filter((user) => user.isNew);
        break;
      default:
        break;
    }

    // Filter by interests
    if (selectedInterests.length > 0) {
      filtered = filtered.filter((user) =>
        user.interests.some((interest) => selectedInterests.includes(interest)),
      );
    }

    return filtered;
  };

  const filteredUsers = getFilteredUsers();

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="sliders" size={20} color="#4B164C" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#9CA4AB" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
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

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                activeCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setActiveCategory(category)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Interest Section */}
        <View style={styles.interestSection}>
          <View style={styles.interestHeader}>
            <Text style={styles.sectionTitle}>What's your interest?</Text>
            <TouchableOpacity onPress={() => router.push("/interests")}>
              <Text style={styles.seeMoreText}>See more</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.interestGrid}>
            {interests.map((interest) => (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.interestChip,
                  selectedInterests.includes(interest.name) &&
                    styles.interestChipActive,
                ]}
                onPress={() => toggleInterest(interest.name)}
                activeOpacity={0.7}
              >
                <Text style={styles.interestIcon}>{interest.icon}</Text>
                <Text
                  style={[
                    styles.interestText,
                    selectedInterests.includes(interest.name) &&
                      styles.interestTextActive,
                  ]}
                >
                  {interest.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Results Count */}
        <Text style={styles.resultsCount}>
          {filteredUsers.length}{" "}
          {filteredUsers.length === 1 ? "person" : "people"} found
        </Text>

        {/* User Grid */}
        <View style={styles.userGrid}>
          {filteredUsers.map((user) => (
            <TouchableOpacity
              key={user.id}
              style={styles.userCard}
              onPress={() => router.push(`/profile/${user.id}`)}
              activeOpacity={0.9}
            >
              <View style={styles.imageContainer}>
                <Image source={user.image} style={styles.userImage} />
                {user.isOnline && <View style={styles.onlineBadge} />}
                {user.isNew && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                  </View>
                )}
              </View>

              <View style={styles.userInfo}>
                <Text style={styles.userName} numberOfLines={1}>
                  {user.name}, {user.age}
                </Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={14} color="#9CA4AB" />
                  <Text style={styles.distanceText}>{user.distance} away</Text>
                </View>
              </View>

              <View style={styles.userActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialIcons name="close" size={18} color="#FF3B30" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonPrimary}>
                  <MaterialIcons name="favorite" size={18} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <View style={styles.emptyState}>
            <Feather name="search" size={64} color="#E3E7EC" />
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your filters or search terms
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
  headerTitle: {
    color: "#111111",
    fontSize: 24,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
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
    paddingBottom: 20,
  },
  categoriesScroll: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: "#F6F8FE",
  },
  categoryChipActive: {
    backgroundColor: "#4B164C",
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#9CA4AB",
  },
  categoryTextActive: {
    color: "#ffffff",
  },
  interestSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  interestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#111111",
  },
  seeMoreText: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#4B164C",
  },
  interestGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  interestChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: "#F6F8FE",
    borderWidth: 1,
    borderColor: "#E3E7EC",
  },
  interestChipActive: {
    backgroundColor: "#EEE5F5",
    borderColor: "#4B164C",
  },
  interestIcon: {
    fontSize: 16,
  },
  interestText: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_500Medium",
    color: "#66707A",
  },
  interestTextActive: {
    color: "#4B164C",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  resultsCount: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_500Medium",
    color: "#9CA4AB",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  userGrid: {
    paddingHorizontal: 20,
    gap: 16,
  },
  userCard: {
    backgroundColor: "#F6F8FE",
    borderRadius: 20,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 280,
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  onlineBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#34C759",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  newBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#4B164C",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  newBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  userInfo: {
    padding: 16,
  },
  userName: {
    fontSize: 18,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#111111",
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  distanceText: {
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#9CA4AB",
  },
  userActions: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  actionButtonPrimary: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4B164C",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
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
