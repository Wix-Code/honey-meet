import { matchesData } from "@/app/dummyData";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const interests = [
  "Music",
  "Travel",
  "Photography",
  "Cooking",
  "Fitness",
  "Reading",
  "Dancing",
  "Art",
];

export default function UserDetails() {
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useLocalSearchParams();

  const userId = matchesData.find((match) => match.id === Number(id));

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={20} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Entypo name="dots-three-vertical" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover Image with Profile Picture Overlay */}
        <View style={styles.coverContainer}>
          {/* Cover Image */}
          <Image
            source={require("../../../assets/images/5.jpg")}
            style={styles.coverImage}
          />

          {/* Distance Badge */}
          <View style={styles.distanceBadge}>
            <MaterialIcons name="location-on" size={14} color="#ffffff" />
            <Text style={styles.distanceText}>16 km</Text>
          </View>

          {/* Profile Picture (Overlapping) */}
          <View style={styles.profileImageContainer}>
            <Image
              source={require("../../../assets/images/5.jpg")}
              style={styles.profileImage}
            />
            <View style={styles.onlineIndicator} />
          </View>
        </View>

        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <View style={styles.nameRow}>
            <View style={styles.nameColumn}>
              <Text style={styles.name}>Vada El Mona, 24</Text>
              <View style={styles.locationRow}>
                <FontAwesome6 name="location-dot" size={14} color="#9CA4AB" />
                <Text style={styles.city}>San Diego, California</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? (
                <AntDesign name="heart" size={24} color="#FF3B30" />
              ) : (
                <FontAwesome name="heart-o" size={24} color="#111111 " />
              )}
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>

            <View style={styles.iconButtons}>
              <TouchableOpacity style={styles.iconButton}>
                <AntDesign name="message" size={20} color="#4B164C" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Feather name="phone" size={20} color="#4B164C" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionText}>
            Hey, I'm Vada! I'm a finance manager who loves traveling. I would
            like to find someone that matches my energy.
          </Text>
        </View>

        {/* Interests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {interests.map((interest, index) => (
              <View key={index} style={styles.interestChip}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

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
            <Text style={styles.statLabel}>Matches</Text>
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More Info</Text>

          <View style={styles.infoRow}>
            <MaterialIcons name="work-outline" size={20} color="#9CA4AB" />
            <Text style={styles.infoText}>Finance Manager</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="school" size={20} color="#9CA4AB" />
            <Text style={styles.infoText}>University of California</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="height" size={20} color="#9CA4AB" />
            <Text style={styles.infoText}>5'7" (170 cm)</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="favorite-border" size={20} color="#9CA4AB" />
            <Text style={styles.infoText}>Looking for a relationship</Text>
          </View>
        </View>

        {/* Padding at bottom */}
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
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    zIndex: 10,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  scrollView: {
    flex: 1,
  },
  coverContainer: {
    position: "relative",
    width: "100%",
    height: 300,
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  distanceBadge: {
    position: "absolute",
    top: 20,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  distanceText: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  profileImageContainer: {
    position: "absolute",
    bottom: -60,
    left: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#ffffff",
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  userInfoContainer: {
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 20,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  nameColumn: {
    flex: 1,
  },
  name: {
    color: "#111111",
    fontSize: 24,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  city: {
    color: "#78828A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  followButton: {
    flex: 1,
    backgroundColor: "#4B164C",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },
  followButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  iconButtons: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#111111",
    fontSize: 18,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 12,
  },
  sectionText: {
    color: "#66707A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 22,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  interestChip: {
    backgroundColor: "#F6F8FE",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E3E7EC",
  },
  interestText: {
    color: "#4B164C",
    fontSize: 13,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 24,
    backgroundColor: "#F6F8FE",
    marginHorizontal: 20,
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
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  infoText: {
    color: "#111111",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_500Medium",
    flex: 1,
  },
});
