import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { matchesData } from "../dummyData";

const categories = ["All", "Online", "Favorite", "Nearby"];

export default function Matches() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getFilteredMatches = () => {
    switch (selectedCategory) {
      case "Online":
        return matchesData.filter((match) => match.isOnline);
      case "Favorite":
        return matchesData.filter((match) => match.isFavorite);
      case "Nearby":
        return matchesData
          .filter((match) => parseFloat(match.distance) < 3)
          .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      default:
        return matchesData;
    }
  };

  const filteredMatches = getFilteredMatches();

  const renderMatchItem = ({ item }: { item: (typeof matchesData)[0] }) => (
    <TouchableOpacity
      style={styles.matchCard}
      activeOpacity={0.7}
      //onPress={() => router.push(`/profile/${item.id}`)}
    >
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image style={styles.matchImage} source={item.image} />

        {/* Online Indicator */}
        {item.isOnline && <View style={styles.onlineIndicator} />}

        {/* Distance Badge */}
        <View style={styles.distanceBadge}>
          <Text style={styles.distanceText}>{item.distance} Away</Text>
        </View>

        {/* Favorite Icon */}
        {item.isFavorite && (
          <View style={styles.favoriteIcon}>
            <Ionicons name="heart" size={16} color="#FF3B30" />
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.matchInfo}>
        <Text style={styles.matchName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.matchLocation} numberOfLines={1}>
          {item.location}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Matches</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Entypo name="dots-three-vertical" size={20} color="#4B164C" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Matches Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {filteredMatches.length}{" "}
          {filteredMatches.length === 1 ? "match" : "matches"} with you
        </Text>
      </View>

      {/* Matches Grid */}
      {filteredMatches.length > 0 ? (
        <FlatList
          data={filteredMatches}
          renderItem={renderMatchItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.gridContent}
          columnWrapperStyle={styles.gridRow}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="heart-dislike-outline" size={64} color="#E6E6E6" />
          <Text style={styles.emptyTitle}>No matches found</Text>
          <Text style={styles.emptyMessage}>
            Try selecting a different category
          </Text>
        </View>
      )}
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
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#111111",
    fontSize: 18,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  categoriesContainer: {
    paddingVertical: 16,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F6F8FE",
    borderWidth: 1,
    borderColor: "transparent",
  },
  categoryChipActive: {
    backgroundColor: "#4B164C",
    borderColor: "#4B164C",
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#111111",
  },
  categoryTextActive: {
    color: "#ffffff",
  },
  countContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  countText: {
    color: "#111111",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  gridContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  gridRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  matchCard: {
    width: "48%",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 0.75,
    borderRadius: 15,
    marginBottom: 8,
    overflow: "hidden",
  },
  matchImage: {
    width: "100%",
    height: "100%",
  },
  onlineIndicator: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  distanceBadge: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#DD88CF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderTopRightRadius: 15,
  },
  distanceText: {
    color: "#4B164C",
    fontSize: 11,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  matchInfo: {
    paddingHorizontal: 4,
  },
  matchName: {
    color: "#111111",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 2,
  },
  matchLocation: {
    color: "#78828A",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#111111",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#9CA4AB",
  },
});
