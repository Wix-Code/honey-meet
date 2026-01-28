import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Mock data
const stories = [
  {
    id: 1,
    name: "Your Story",
    image: require("../../assets/images/1.jpg"),
    isYourStory: true,
  },
  {
    id: 2,
    name: "Sarah",
    image: require("../../assets/images/2.jpg"),
    isViewed: false,
  },
  {
    id: 3,
    name: "Emma",
    image: require("../../assets/images/3.jpg"),
    isViewed: false,
  },
  {
    id: 4,
    name: "Jessica",
    image: require("../../assets/images/4.jpg"),
    isViewed: true,
  },
  {
    id: 5,
    name: "Lisa",
    image: require("../../assets/images/5.jpg"),
    isViewed: false,
  },
  {
    id: 6,
    name: "Rachel",
    image: require("../../assets/images/1.jpg"),
    isViewed: true,
  },
];

const profiles = [
  {
    id: 1,
    name: "Sarah Williams",
    age: 28,
    image: require("../../assets/images/1.jpg"),
    location: "Los Angeles, CA",
    distance: "2 km",
    bio: "Love traveling and trying new restaurants 🍕✈️",
    interests: ["Music", "Travel", "Photography"],
    verified: true,
  },
  {
    id: 2,
    name: "Emma Davis",
    age: 25,
    image: require("../../assets/images/2.jpg"),
    location: "San Francisco, CA",
    distance: "5 km",
    bio: "Coffee lover ☕ | Dog mom 🐕 | Yoga enthusiast",
    interests: ["Fitness", "Cooking", "Art"],
    verified: true,
  },
  {
    id: 3,
    name: "Jessica Brown",
    age: 27,
    image: require("../../assets/images/3.jpg"),
    location: "Miami, FL",
    distance: "3 km",
    bio: "Entrepreneur | Foodie | Beach lover 🏖️",
    interests: ["Business", "Travel", "Music"],
    verified: false,
  },
];

export default function Home() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState<number[]>([]);
  const [passedProfiles, setPassedProfiles] = useState<number[]>([]);

  const currentProfile = profiles[currentProfileIndex];

  const handleLike = () => {
    if (currentProfile) {
      setLikedProfiles([...likedProfiles, currentProfile.id]);
      nextProfile();
    }
  };

  const handlePass = () => {
    if (currentProfile) {
      setPassedProfiles([...passedProfiles, currentProfile.id]);
      nextProfile();
    }
  };

  const handleSuperLike = () => {
    if (currentProfile) {
      setLikedProfiles([...likedProfiles, currentProfile.id]);
      // Show super like animation
      nextProfile();
    }
  };

  const nextProfile = () => {
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      // No more profiles
      setCurrentProfileIndex(profiles.length);
    }
  };

  const handleRewind = () => {
    if (currentProfileIndex > 0) {
      setCurrentProfileIndex(currentProfileIndex - 1);
      // Remove from liked/passed
      if (likedProfiles.includes(profiles[currentProfileIndex - 1].id)) {
        setLikedProfiles(
          likedProfiles.filter(
            (id) => id !== profiles[currentProfileIndex - 1].id,
          ),
        );
      }
      if (passedProfiles.includes(profiles[currentProfileIndex - 1].id)) {
        setPassedProfiles(
          passedProfiles.filter(
            (id) => id !== profiles[currentProfileIndex - 1].id,
          ),
        );
      }
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <FontAwesome name="heart" size={24} color="#4B164C" />
          <Text style={styles.logoText}>HoneyMeet</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="notifications-outline" size={24} color="#111111" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push("/filters")}
          >
            <Feather name="sliders" size={24} color="#111111" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stories */}
      <View style={styles.storiesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesContent}
        >
          {stories.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={styles.storyItem}
              onPress={() => console.log("View story")}
            >
              <View
                style={[
                  styles.storyImageContainer,
                  story.isYourStory && styles.yourStoryContainer,
                  !story.isViewed && !story.isYourStory && styles.unviewedStory,
                  story.isViewed && styles.viewedStory,
                ]}
              >
                <Image source={story.image} style={styles.storyImage} />
                {story.isYourStory && (
                  <View style={styles.addStoryButton}>
                    <Feather name="plus" size={16} color="#ffffff" />
                  </View>
                )}
              </View>
              <Text style={styles.storyName} numberOfLines={1}>
                {story.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentProfile ? (
          <View style={styles.profileCard}>
            {/* Profile Image */}
            <View style={styles.imageContainer}>
              <Image
                source={currentProfile.image}
                style={styles.profileImage}
              />

              {/* Distance Badge */}
              <View style={styles.distanceBadge}>
                <Ionicons name="location" size={14} color="#ffffff" />
                <Text style={styles.distanceText}>
                  {currentProfile.distance}
                </Text>
              </View>

              {/* Verified Badge */}
              {currentProfile.verified && (
                <View style={styles.verifiedBadge}>
                  <MaterialIcons name="verified" size={20} color="#4B164C" />
                </View>
              )}

              {/* Profile Info Overlay */}
              <View style={styles.profileInfoOverlay}>
                <View style={styles.profileNameRow}>
                  <Text style={styles.profileName}>
                    {currentProfile.name}, {currentProfile.age}
                  </Text>
                </View>
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={16} color="#ffffff" />
                  <Text style={styles.locationText}>
                    {currentProfile.location}
                  </Text>
                </View>
              </View>
            </View>

            {/* Bio */}
            <View style={styles.bioContainer}>
              <Text style={styles.bioText}>{currentProfile.bio}</Text>
            </View>

            {/* Interests */}
            <View style={styles.interestsContainer}>
              <Text style={styles.interestsTitle}>Interests</Text>
              <View style={styles.interestsGrid}>
                {currentProfile.interests.map((interest, index) => (
                  <View key={index} style={styles.interestChip}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButtonRewind}
                onPress={handleRewind}
              >
                <Ionicons name="reload" size={24} color="#ffffff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButtonPass}
                onPress={handlePass}
              >
                <MaterialIcons name="close" size={32} color="#ffffff" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButtonSuperLike}
                onPress={handleSuperLike}
              >
                <FontAwesome name="star" size={24} color="#E53935" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButtonLike}
                onPress={handleLike}
              >
                <FontAwesome name="heart" size={28} color="#ffffff" />
              </TouchableOpacity>

              {/* <TouchableOpacity style={styles.actionButtonBoost}>
                <Ionicons name="flash" size={24} color="#9C27B0" />
              </TouchableOpacity> */}
            </View>
          </View>
        ) : (
          // No More Profiles
          <View style={styles.noMoreProfiles}>
            <FontAwesome name="heart-o" size={80} color="#E3E7EC" />
            <Text style={styles.noMoreTitle}>That's everyone for now!</Text>
            <Text style={styles.noMoreSubtitle}>
              Check back later for new people in your area
            </Text>
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={() => setCurrentProfileIndex(0)}
            >
              <Ionicons name="refresh" size={20} color="#ffffff" />
              <Text style={styles.refreshButtonText}>Start Over</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Premium Banner */}
        <View style={styles.premiumBanner}>
          <View style={styles.premiumContent}>
            <View style={styles.premiumIcon}>
              <FontAwesome name="diamond" size={24} color="#FFD700" />
            </View>
            <View style={styles.premiumText}>
              <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
              <Text style={styles.premiumSubtitle}>
                Unlimited likes, rewinds, and more!
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade</Text>
          </TouchableOpacity>
        </View>
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
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoText: {
    fontSize: 20,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#4B164C",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  storiesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  storiesContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  storyItem: {
    alignItems: "center",
    width: 72,
  },
  storyImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 2,
    marginBottom: 6,
    position: "relative",
  },
  yourStoryContainer: {
    borderWidth: 2,
    borderColor: "#E3E7EC",
    borderStyle: "dashed",
  },
  unviewedStory: {
    borderWidth: 2,
    borderColor: "#4B164C",
  },
  viewedStory: {
    borderWidth: 2,
    borderColor: "#E3E7EC",
  },
  storyImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  addStoryButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4B164C",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  storyName: {
    fontSize: 11,
    fontFamily: "PlusJakartaSans_500Medium",
    color: "#66707A",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: "#F6F8FE",
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    height: 500,
    position: "relative",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  distanceBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  distanceText: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  verifiedBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfoOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "linear-gradient(transparent, rgba(0,0,0,0.7))",
  },
  profileNameRow: {
    marginBottom: 8,
  },
  profileName: {
    color: "#ffffff",
    fontSize: 28,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  bioContainer: {
    padding: 20,
    paddingTop: 16,
  },
  bioText: {
    fontSize: 15,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#66707A",
    lineHeight: 22,
  },
  interestsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  interestsTitle: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#111111",
    marginBottom: 12,
  },
  interestsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  interestChip: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E3E7EC",
  },
  interestText: {
    fontSize: 13,
    fontFamily: "PlusJakartaSans_500Medium",
    color: "#4B164C",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //gap: 12,
    padding: 20,
  },
  actionButtonRewind: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#DD88CF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonPass: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#111111",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonSuperLike: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonLike: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  // actionButtonBoost: {
  //   width: 60,
  //   height: 60,
  //   borderRadius: 30,
  //   backgroundColor: "#ffffff",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 3,
  // },
  noMoreProfiles: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  noMoreTitle: {
    fontSize: 24,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#111111",
    marginTop: 24,
    marginBottom: 8,
  },
  noMoreSubtitle: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#9CA4AB",
    textAlign: "center",
    marginBottom: 32,
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#4B164C",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  refreshButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  premiumBanner: {
    backgroundColor: "#F6F8FE",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    marginBottom: 40,
    borderColor: "#FFD700",
  },
  premiumContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  premiumIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  premiumText: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#111111",
    marginBottom: 4,
  },
  premiumSubtitle: {
    fontSize: 12,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#66707A",
  },
  upgradeButton: {
    backgroundColor: "#4B164C",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  upgradeButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
});
