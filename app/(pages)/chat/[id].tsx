import { initialChats } from "@/app/dummyData";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, useGlobalSearchParams } from "expo-router";
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

// Sample messages
const sampleMessages = [
  {
    id: 1,
    text: "Hey! How are you doing?",
    time: "10:30 AM",
    isSender: false,
  },
  {
    id: 2,
    text: "I'm good, thanks! How about you?",
    time: "10:32 AM",
    isSender: true,
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    time: "10:35 AM",
    isSender: false,
  },
  {
    id: 4,
    text: "That sounds great! When are we meeting?",
    time: "10:40 AM",
    isSender: true,
  },
  {
    id: 5,
    text: "How about tomorrow at 3 PM?",
    time: "10:42 AM",
    isSender: false,
  },
  {
    id: 6,
    text: "Perfect! See you then 👍",
    time: "10:45 AM",
    isSender: true,
  },
];

export default function ChatPage() {
  const { id } = useGlobalSearchParams();
  const [message, setMessage] = useState("");

  const chat = initialChats.find((c) => c.id === Number(id));

  if (!chat) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text>Chat not found</Text>
      </SafeAreaView>
    );
  }

  const handleSend = () => {
    if (message.trim()) {
      // Handle send message
      console.log("Sending:", message);
      setMessage("");
    }
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Feather name="arrow-left" size={20} color="#4B164C" />
            </TouchableOpacity>

            {/* Profile with Online Status */}
            <View style={styles.profileContainer}>
              <View style={styles.profileImageContainer}>
                <Image style={styles.profileImage} source={chat.image} />
                {chat.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              <View>
                <Text style={styles.profileName}>{chat.name}</Text>
                <Text style={styles.onlineStatus}>
                  {chat.isOnline ? "Online" : "Offline"}
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="video-camera" size={20} color="#4B164C" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome name="phone" size={20} color="#4B164C" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages List */}
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {sampleMessages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageWrapper,
                msg.isSender ? styles.senderWrapper : styles.receiverWrapper,
              ]}
            >
              {/* Show receiver's avatar */}
              {!msg.isSender && (
                <View style={styles.receiverImageContainer}>
                  <Image style={styles.messageAvatar} source={chat.image} />
                </View>
              )}

              <View style={styles.messageContent}>
                <View
                  style={[
                    styles.messageBubble,
                    msg.isSender ? styles.senderBubble : styles.receiverBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      msg.isSender ? styles.senderText : styles.receiverText,
                    ]}
                  >
                    {msg.text}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.messageTime,
                    msg.isSender && styles.senderTime,
                  ]}
                >
                  {msg.time}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Fixed Input Container */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Entypo name="attachment" size={22} color="#9CA4AB" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#9CA4AB"
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSend}
            activeOpacity={0.8}
          >
            {message.trim() ? (
              <Feather name="send" size={20} color="#ffffff" />
            ) : (
              <FontAwesome name="microphone" size={20} color="#ffffff" />
            )}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
    backgroundColor: "#ffffff",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileImageContainer: {
    position: "relative",
    marginRight: 10,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  profileName: {
    color: "#111111",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  onlineStatus: {
    color: "#4CAF50",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 20,
  },
  messageWrapper: {
    marginBottom: 16,
    flexDirection: "row",
  },
  senderWrapper: {
    justifyContent: "flex-end",
  },
  receiverWrapper: {
    justifyContent: "flex-start",
  },
  receiverImageContainer: {
    marginRight: 8,
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageContent: {
    maxWidth: "75%",
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  receiverBubble: {
    backgroundColor: "#F6F8FE",
    borderTopLeftRadius: 0,
  },
  senderBubble: {
    backgroundColor: "#4B164C",
    borderTopRightRadius: 0,
  },
  messageText: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    lineHeight: 20,
  },
  receiverText: {
    color: "#111111",
  },
  senderText: {
    color: "#ffffff",
  },
  messageTime: {
    fontSize: 10,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#9CA4AB",
    marginTop: 4,
    marginLeft: 4,
  },
  senderTime: {
    textAlign: "right",
    marginRight: 4,
    marginLeft: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#E3E7EC",
    gap: 10,
  },
  attachButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#F6F8FE",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#111111",
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#4B164C",
    justifyContent: "center",
    alignItems: "center",
  },
});
