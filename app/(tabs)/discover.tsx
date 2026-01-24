import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
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

// Stories data
const stories = [
  {
    id: 0,
    name: "You",
    image: null, // null means add story button
    isAddButton: true,
  },
  {
    id: 1,
    name: "Wisdom",
    image: require("../../assets/images/5.jpg"),
    hasStory: true,
  },
  {
    id: 2,
    name: "Sarah",
    image: require("../../assets/images/1.jpg"),
    hasStory: true,
  },
  {
    id: 3,
    name: "Emma",
    image: require("../../assets/images/2.jpg"),
    hasStory: true,
  },
  {
    id: 4,
    name: "Grace",
    image: require("../../assets/images/4.jpg"),
    hasStory: true,
  },
  {
    id: 5,
    name: "Faith",
    image: require("../../assets/images/3.jpg"),
    hasStory: true,
  },
];

// Posts data
const posts = [
  {
    id: 1,
    user: {
      name: "Barry Jakubowski",
      image: require("../../assets/images/2.jpg"),
    },
    time: "2 hours ago",
    text: "Great, just missed the train and now my whole vacation plan is ruined! 😤 Honestly, it feels like nothing goes right when you need it the most. All I wanted was to relax and get away, but now I'm stuck here fuming. #Frustrated #VacationFail #CantCatchABreak",
    likes: 99,
    comments: 45,
    shares: 12,
  },
  {
    id: 2,
    user: {
      name: "Sarah Williams",
      image: require("../../assets/images/3.jpg"),
    },
    time: "5 hours ago",
    text: "Just finished an amazing hike! The view from the top was absolutely breathtaking. Sometimes you need to disconnect and enjoy nature. 🏔️✨ #NatureLover #HikingAdventures",
    likes: 234,
    comments: 67,
    shares: 23,
  },
  {
    id: 3,
    user: {
      name: "Michael Chen",
      image: require("../../assets/images/4.jpg"),
    },
    time: "1 day ago",
    text: "Coffee and coding on a Sunday morning ☕💻 Building something amazing! Can't wait to show you all what I've been working on. #Developer #SundayVibes",
    likes: 156,
    comments: 34,
    shares: 8,
  },
  {
    id: 4,
    user: {
      name: "Jessica Brown",
      image: require("../../assets/images/5.jpg"),
    },
    time: "2 days ago",
    text: "New recipe tried and tested! This homemade pasta turned out better than expected 🍝👨‍🍳 Who wants the recipe? #FoodieLife #Cooking",
    likes: 312,
    comments: 89,
    shares: 45,
  },
];

export default function Discover() {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const toggleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const renderStory = (story: (typeof stories)[0]) => (
    <TouchableOpacity
      key={story.id}
      style={styles.storyItem}
      onPress={() =>
        story.isAddButton
          ? console.log("Add story")
          : console.log("View story", story.name)
      }
    >
      <View
        style={[
          styles.storyImageContainer,
          story.hasStory && styles.storyWithBorder,
        ]}
      >
        {story.isAddButton ? (
          <View style={styles.addStoryButton}>
            <AntDesign name="plus" size={24} color="#4B164C" />
          </View>
        ) : (
          <Image style={styles.storyImage} source={story.image} />
        )}
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {story.name}
      </Text>
    </TouchableOpacity>
  );

  const renderPost = (post: (typeof posts)[0]) => {
    const isLiked = likedPosts.includes(post.id);

    return (
      <View key={post.id} style={styles.postContainer}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.postUserInfo}>
            <Image style={styles.postUserImage} source={post.user.image} />
            <View style={styles.postUserDetails}>
              <Text style={styles.postUserName}>{post.user.name}</Text>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Entypo name="dots-three-horizontal" size={20} color="#9CA4AB" />
          </TouchableOpacity>
        </View>

        {/* Post Content */}
        <Text style={styles.postText}>{post.text}</Text>

        {/* Post Actions */}
        <View style={styles.postActions}>
          <View style={styles.postActionsLeft}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => toggleLike(post.id)}
            >
              <Feather
                name="heart"
                size={20}
                color={isLiked ? "#FF3B30" : "#78828A"}
                fill={isLiked ? "#FF3B30" : "transparent"}
              />
              <Text
                style={[styles.actionText, isLiked && styles.actionTextActive]}
              >
                {isLiked ? post.likes + 1 : post.likes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Feather name="message-circle" size={20} color="#78828A" />
              <Text style={styles.actionText}>{post.comments}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.shareButton}>
            <Entypo name="share" size={20} color="#78828A" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="search" size={22} color="#111111" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="bell" size={22} color="#111111" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stories Section */}
        <View style={styles.storiesSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesContainer}
          >
            {stories.map((story) => renderStory(story))}
          </ScrollView>
        </View>

        {/* Posts Feed */}
        <View style={styles.postsSection}>
          {posts.map((post) => renderPost(post))}
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
  headerTitle: {
    color: "#111111",
    fontSize: 24,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  storiesSection: {
    paddingVertical: 16,
    borderBottomWidth: 8,
    borderBottomColor: "#F6F8FE",
  },
  storiesContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  storyItem: {
    alignItems: "center",
    width: 70,
  },
  storyImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 6,
  },
  storyWithBorder: {
    padding: 3,
    borderWidth: 2,
    borderColor: "#4B164C",
  },
  storyImage: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
  },
  addStoryButton: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4B164C",
    borderStyle: "dashed",
  },
  storyName: {
    color: "#111111",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_500Medium",
    textAlign: "center",
  },
  postsSection: {
    paddingTop: 8,
  },
  postContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 8,
    borderBottomColor: "#F6F8FE",
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  postUserInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  postUserImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  postUserDetails: {
    flex: 1,
  },
  postUserName: {
    color: "#111111",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_600SemiBold",
    marginBottom: 2,
  },
  postTime: {
    color: "#9CA4AB",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  moreButton: {
    padding: 8,
  },
  postText: {
    color: "#111111",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 22,
    marginBottom: 16,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postActionsLeft: {
    flexDirection: "row",
    gap: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    color: "#78828A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_500Medium",
  },
  actionTextActive: {
    color: "#FF3B30",
  },
  shareButton: {
    padding: 8,
  },
});
