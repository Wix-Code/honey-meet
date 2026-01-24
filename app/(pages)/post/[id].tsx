import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Main post data
const mainPost = {
  id: 1,
  user: {
    name: "Barry Jakubowski",
    image: require("../../../assets/images/2.jpg"),
  },
  time: "2 hours ago",
  text: "Great, just missed the train and now my whole vacation plan is ruined! 😤 Honestly, it feels like nothing goes right when you need it the most. #Frustrated #VacationFail",
  likes: 99,
  comments: 45,
  shares: 12,
};

// Replies data with nested replies
const replies = [
  {
    id: 1,
    user: {
      name: "Sarah Williams",
      image: require("../../../assets/images/3.jpg"),
    },
    time: "1 hour ago",
    text: "Oh no! That's so frustrating. Have you checked if there's another train soon?",
    likes: 12,
    replies: [
      {
        id: 11,
        user: {
          name: "Barry Jakubowski",
          image: require("../../../assets/images/2.jpg"),
        },
        time: "45 min ago",
        text: "Yeah, but the next one isn't until tomorrow morning 😩",
        likes: 5,
      },
      {
        id: 12,
        user: {
          name: "Sarah Williams",
          image: require("../../../assets/images/3.jpg"),
        },
        time: "30 min ago",
        text: "That's rough! Maybe check if there's a bus or other alternative?",
        likes: 3,
      },
    ],
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      image: require("../../../assets/images/4.jpg"),
    },
    time: "45 min ago",
    text: "Been there! Try to make the best of the situation. Sometimes unexpected delays lead to great stories!",
    likes: 8,
    replies: [],
  },
  {
    id: 3,
    user: {
      name: "Jessica Brown",
      image: require("../../../assets/images/5.jpg"),
    },
    time: "20 min ago",
    text: "So sorry to hear that! Hope you can still enjoy your vacation when you get there 🤗",
    likes: 15,
    replies: [
      {
        id: 31,
        user: {
          name: "Barry Jakubowski",
          image: require("../../../assets/images/2.jpg"),
        },
        time: "10 min ago",
        text: "Thanks! I'm trying to stay positive 😊",
        likes: 4,
      },
    ],
  },
];

export default function SinglePost() {
  const [message, setMessage] = useState("");
  const [likedItems, setLikedItems] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    if (likedItems.includes(id)) {
      setLikedItems(likedItems.filter((item) => item !== id));
    } else {
      setLikedItems([...likedItems, id]);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending:", message);
      setMessage("");
    }
  };

  const renderReply = (reply: any, isNested = false) => {
    const isLiked = likedItems.includes(`reply-${reply.id}`);

    return (
      <View
        key={reply.id}
        style={[styles.replyContainer, isNested && styles.nestedReply]}
      >
        {/* Reply Header */}
        <View style={styles.replyHeader}>
          <Image style={styles.replyUserImage} source={reply.user.image} />
          <View style={styles.replyContent}>
            <View style={styles.replyTop}>
              <Text style={styles.replyUserName}>{reply.user.name}</Text>
              <Text style={styles.replyTime}>{reply.time}</Text>
            </View>
            <Text style={styles.replyText}>{reply.text}</Text>

            {/* Reply Actions */}
            <View style={styles.replyActions}>
              <TouchableOpacity
                style={styles.replyAction}
                onPress={() => toggleLike(`reply-${reply.id}`)}
              >
                <Feather
                  name="heart"
                  size={14}
                  color={isLiked ? "#FF3B30" : "#9CA4AB"}
                  fill={isLiked ? "#FF3B30" : "transparent"}
                />
                <Text
                  style={[
                    styles.replyActionText,
                    isLiked && styles.replyActionTextActive,
                  ]}
                >
                  {isLiked ? reply.likes + 1 : reply.likes}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.replyAction}>
                <Feather name="message-circle" size={14} color="#9CA4AB" />
                <Text style={styles.replyActionText}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Nested Replies */}
        {reply.replies &&
          reply.replies.length > 0 &&
          reply.replies.map((nestedReply: any) =>
            renderReply(nestedReply, true),
          )}
      </View>
    );
  };

  const isMainPostLiked = likedItems.includes("main-post");

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
          <Text style={styles.headerTitle}>Post</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Entypo name="dots-three-vertical" size={20} color="#4B164C" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Post */}
          <View style={styles.mainPost}>
            <View style={styles.mainPostHeader}>
              <Image
                style={styles.mainPostUserImage}
                source={mainPost.user.image}
              />
              <View style={styles.mainPostUserDetails}>
                <Text style={styles.mainPostUserName}>
                  {mainPost.user.name}
                </Text>
                <Text style={styles.mainPostTime}>{mainPost.time}</Text>
              </View>
            </View>

            <Text style={styles.mainPostText}>{mainPost.text}</Text>

            <View style={styles.mainPostActions}>
              <View style={styles.mainPostActionsLeft}>
                <TouchableOpacity
                  style={styles.mainPostAction}
                  onPress={() => toggleLike("main-post")}
                >
                  <Feather
                    name="heart"
                    size={20}
                    color={isMainPostLiked ? "#FF3B30" : "#78828A"}
                    fill={isMainPostLiked ? "#FF3B30" : "transparent"}
                  />
                  <Text
                    style={[
                      styles.mainPostActionText,
                      isMainPostLiked && styles.mainPostActionTextActive,
                    ]}
                  >
                    {isMainPostLiked ? mainPost.likes + 1 : mainPost.likes}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mainPostAction}>
                  <Feather name="message-circle" size={20} color="#78828A" />
                  <Text style={styles.mainPostActionText}>
                    {mainPost.comments}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.shareButton}>
                <Entypo name="share" size={20} color="#78828A" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Replies Section */}
          <View style={styles.repliesSection}>
            <Text style={styles.repliesTitle}>
              Replies ({mainPost.comments})
            </Text>
            {replies.map((reply) => renderReply(reply))}
          </View>
        </ScrollView>

        {/* Fixed Input Container */}
        <View style={styles.inputContainer}>
          <Image
            style={styles.inputUserImage}
            source={require("../../../assets/images/1.jpg")}
          />
          <TextInput
            style={styles.input}
            placeholder="Write a reply..."
            placeholderTextColor="#9CA4AB"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !message.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!message.trim()}
          >
            <FontAwesome
              name="send"
              size={16}
              color={message.trim() ? "#ffffff" : "#9CA4AB"}
            />
          </TouchableOpacity>
        </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  mainPost: {
    padding: 20,
    borderBottomWidth: 8,
    borderBottomColor: "#F6F8FE",
  },
  mainPostHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  mainPostUserImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  mainPostUserDetails: {
    flex: 1,
  },
  mainPostUserName: {
    color: "#111111",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
    marginBottom: 2,
  },
  mainPostTime: {
    color: "#9CA4AB",
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  mainPostText: {
    color: "#111111",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 24,
    marginBottom: 16,
  },
  mainPostActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainPostActionsLeft: {
    flexDirection: "row",
    gap: 20,
  },
  mainPostAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  mainPostActionText: {
    color: "#78828A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_500Medium",
  },
  mainPostActionTextActive: {
    color: "#FF3B30",
  },
  shareButton: {
    padding: 8,
  },
  repliesSection: {
    paddingTop: 16,
  },
  repliesTitle: {
    color: "#111111",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_700Bold",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  replyContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  nestedReply: {
    marginLeft: 48,
    marginTop: 12,
  },
  replyHeader: {
    flexDirection: "row",
  },
  replyUserImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  replyContent: {
    flex: 1,
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    padding: 12,
  },
  replyTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  replyUserName: {
    color: "#111111",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  replyTime: {
    color: "#9CA4AB",
    fontSize: 11,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  replyText: {
    color: "#111111",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 20,
    marginBottom: 8,
  },
  replyActions: {
    flexDirection: "row",
    gap: 16,
  },
  replyAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  replyActionText: {
    color: "#9CA4AB",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_500Medium",
  },
  replyActionTextActive: {
    color: "#FF3B30",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#E3E7EC",
    gap: 12,
  },
  inputUserImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  input: {
    flex: 1,
    backgroundColor: "#F6F8FE",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#111111",
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4B164C",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#E3E7EC",
  },
});
