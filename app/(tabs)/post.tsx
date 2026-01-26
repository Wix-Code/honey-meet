import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Animated,
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

// Mock data
const initialComments = [
  {
    id: 1,
    user: "Sarah",
    avatar: "👩",
    message: "Hey! Looking great!",
    time: Date.now(),
  },
  {
    id: 2,
    user: "Mike",
    avatar: "👨",
    message: "Amazing stream!",
    time: Date.now(),
  },
  {
    id: 3,
    user: "Emma",
    avatar: "👧",
    message: "Love this! ❤️",
    time: Date.now(),
  },
];

const liveUsers = [
  {
    id: 1,
    name: "Wisdom Ogbonna",
    avatar: require("../../assets/images/1.jpg"),
    followers: "2.2k",
    isFollowing: false,
  },
  {
    id: 2,
    name: "Sarah Williams",
    avatar: require("../../assets/images/2.jpg"),
    followers: "1.5k",
    isFollowing: true,
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: require("../../assets/images/3.jpg"),
    followers: "3.1k",
    isFollowing: false,
  },
  {
    id: 4,
    name: "Emma Davis",
    avatar: require("../../assets/images/4.jpg"),
    followers: "890",
    isFollowing: false,
  },
  {
    id: 5,
    name: "John Smith",
    avatar: require("../../assets/images/5.jpg"),
    followers: "4.2k",
    isFollowing: true,
  },
  {
    id: 6,
    name: "Lisa Brown",
    avatar: require("../../assets/images/1.jpg"),
    followers: "1.8k",
    isFollowing: false,
  },
  {
    id: 7,
    name: "David Wilson",
    avatar: require("../../assets/images/2.jpg"),
    followers: "2.7k",
    isFollowing: false,
  },
  {
    id: 8,
    name: "Amy Taylor",
    avatar: require("../../assets/images/3.jpg"),
    followers: "950",
    isFollowing: true,
  },
];

export default function LivePage() {
  const [hasJoined, setHasJoined] = useState(false);
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState(initialComments);
  const [viewerCount, setViewerCount] = useState(326);
  const [likes, setLikes] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showHearts, setShowHearts] = useState<
    { id: number; position: number }[]
  >([]);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userFollowStates, setUserFollowStates] = useState<{
    [key: number]: boolean;
  }>({});
  const [searchQuery, setSearchQuery] = useState("");

  const viewerCountAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const initialStates: { [key: number]: boolean } = {};
    liveUsers.forEach((user) => {
      initialStates[user.id] = user.isFollowing;
    });
    setUserFollowStates(initialStates);

    // Animate viewer count changes
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 5) - 2;
      setViewerCount((prev) => Math.max(1, prev + change));

      Animated.sequence([
        Animated.timing(viewerCountAnim, {
          toValue: 1.15,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(viewerCountAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newComment = {
        id: Date.now(),
        user: "You",
        avatar: "😊",
        message: message.trim(),
        time: Date.now(),
      };
      setComments([...comments, newComment]);
      setMessage("");
    }
  };

  const handleLike = () => {
    setLikes(likes + 1);
    const heartId = Date.now();
    const randomPosition = Math.random() * 60 - 30; // -30 to +30

    setShowHearts((prev) => [
      ...prev,
      { id: heartId, position: randomPosition },
    ]);

    setTimeout(() => {
      setShowHearts((prev) => prev.filter((heart) => heart.id !== heartId));
    }, 2500);
  };

  const toggleUserFollow = (userId: number) => {
    setUserFollowStates((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const openUsersModal = () => setShowUsersModal(true);
  const closeUsersModal = () => setShowUsersModal(false);
  const openProfileModal = () => setShowProfileModal(true);
  const closeProfileModal = () => setShowProfileModal(false);

  const filteredUsers = liveUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const displayViewerCount =
    viewerCount > 999
      ? `${(viewerCount / 1000).toFixed(1)}K+`
      : viewerCount > 7
        ? `${viewerCount}+`
        : viewerCount.toString();

  const AnimatedHeart = ({
    id,
    position,
  }: {
    id: number;
    position: number;
  }) => {
    const translateY = React.useRef(new Animated.Value(0)).current;
    const opacity = React.useRef(new Animated.Value(1)).current;
    const scale = React.useRef(new Animated.Value(0.5)).current;

    React.useEffect(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -400,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.floatingHeart,
          {
            right: 30 + position,
            transform: [{ translateY }, { scale }],
            opacity,
          },
        ]}
      >
        <FontAwesome name="heart" size={36} color="#FF3B30" />
      </Animated.View>
    );
  };

  // Pre-Join Screen
  if (!hasJoined) {
    return (
      <View style={styles.preJoinContainer}>
        <Image
          source={require("../../assets/images/3.jpg")}
          style={styles.preJoinBackground}
          blurRadius={15}
        />
        <View style={styles.preJoinOverlay} />

        <TouchableOpacity
          style={styles.preJoinCloseButton}
          onPress={() => router.back()}
        >
          <Feather name="x" size={24} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.preJoinContent}>
          <View style={styles.preJoinImageContainer}>
            <Image
              source={require("../../assets/images/3.jpg")}
              style={styles.preJoinImage}
            />
            <View style={styles.preJoinLiveBadge}>
              <View style={styles.preJoinLiveIndicator} />
              <Text style={styles.preJoinLiveText}>LIVE</Text>
            </View>
          </View>

          <View style={styles.preJoinInfo}>
            <Text style={styles.preJoinTitle}>Let's talk about life</Text>
            <Text style={styles.preJoinHost}>Hosted by Wisdom Ogbonna</Text>
          </View>

          <View style={styles.preJoinStats}>
            <View style={styles.preJoinStatItem}>
              <Ionicons name="eye" size={18} color="rgba(255, 255, 255, 0.9)" />
              <Text style={styles.preJoinStatText}>326 watching</Text>
            </View>
            <View style={styles.preJoinStatDot} />
            <View style={styles.preJoinStatItem}>
              <FontAwesome
                name="heart"
                size={16}
                color="rgba(255, 255, 255, 0.9)"
              />
              <Text style={styles.preJoinStatText}>1.2K likes</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => setHasJoined(true)}
            activeOpacity={0.9}
          >
            <Text style={styles.joinButtonText}>Join Live</Text>
            <Feather name="arrow-right" size={20} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.sharePreJoinButton}>
            <Feather name="share-2" size={18} color="#ffffff" />
            <Text style={styles.sharePreJoinText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Main Live Stream Screen
  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.videoContainer}>
          <Image
            source={require("../../assets/images/1.jpg")}
            style={styles.videoBackground}
          />
          <View style={styles.overlay} />

          {showHearts.map((heart) => (
            <AnimatedHeart
              key={heart.id}
              id={heart.id}
              position={heart.position}
            />
          ))}

          {/* Top Bar */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={20} color="#ffffff" />
            </TouchableOpacity>

            <View style={styles.topBarCenter}>
              <View style={styles.liveBadge}>
                <View style={styles.liveIndicator} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>

              <TouchableOpacity
                style={styles.viewerBadge}
                onPress={openUsersModal}
              >
                <Animated.View
                  style={{ transform: [{ scale: viewerCountAnim }] }}
                >
                  <View style={styles.viewerBadgeContent}>
                    <Ionicons name="eye" size={16} color="#ffffff" />
                    <Text style={styles.viewerText}>{displayViewerCount}</Text>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.moreButton}>
              <Feather name="more-vertical" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Host Info */}
          <TouchableOpacity
            style={styles.hostInfo}
            onPress={openProfileModal}
            activeOpacity={0.8}
          >
            <Image
              source={require("../../assets/images/2.jpg")}
              style={styles.hostAvatar}
            />
            <View style={styles.hostDetails}>
              <Text style={styles.hostName}>Jessica Brown</Text>
              <Text style={styles.hostTitle}>Lifestyle & Fashion</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followButtonActive,
              ]}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              <Text
                style={[
                  styles.followButtonText,
                  isFollowing && styles.followButtonTextActive,
                ]}
              >
                {isFollowing ? "Following" : "+ Follow"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Comments */}
          <View style={styles.commentsSection}>
            <ScrollView
              style={styles.commentsList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.commentsContent}
            >
              {comments.map((comment) => (
                <View key={comment.id} style={styles.commentItem}>
                  <Text style={styles.commentAvatar}>{comment.avatar}</Text>
                  <View style={styles.commentBubble}>
                    <Text style={styles.commentUser}>{comment.user}</Text>
                    <Text style={styles.commentMessage}>{comment.message}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="share-2" size={20} color="#ffffff" />
            </TouchableOpacity>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Send message..."
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={message}
                onChangeText={setMessage}
                onSubmitEditing={handleSendMessage}
                returnKeyType="send"
              />
              {message.trim() && (
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleSendMessage}
                >
                  <Ionicons name="send" size={18} color="#4B164C" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity style={styles.loveButton} onPress={handleLike}>
              <FontAwesome name="heart" size={24} color="#FF3B30" />
              {likes > 0 && <Text style={styles.likeCount}>{likes}</Text>}
            </TouchableOpacity>
          </View>
        </View>

        {/* Users Modal */}
        <Modal
          visible={showUsersModal}
          transparent
          animationType="slide"
          onRequestClose={closeUsersModal}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPress={closeUsersModal}
            />
            <View style={styles.modalContent}>
              <View style={styles.modalHandle} />
              <Text style={styles.modalTitle}>{viewerCount} Users</Text>

              <View style={styles.searchContainer}>
                <Feather name="search" size={20} color="#9CA4AB" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search..."
                  placeholderTextColor="#9CA4AB"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.userItem}>
                    <Image source={item.avatar} style={styles.userAvatar} />
                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>{item.name}</Text>
                      <Text style={styles.userFollowers}>
                        {item.followers} followers
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.followButtonSmall,
                        userFollowStates[item.id] &&
                          styles.followButtonSmallActive,
                      ]}
                      onPress={() => toggleUserFollow(item.id)}
                    >
                      <Text
                        style={[
                          styles.followButtonSmallText,
                          userFollowStates[item.id] &&
                            styles.followButtonSmallTextActive,
                        ]}
                      >
                        {userFollowStates[item.id] ? "Following" : "Follow"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Modal>

        {/* Profile Modal */}
        <Modal
          visible={showProfileModal}
          transparent
          animationType="slide"
          onRequestClose={closeProfileModal}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPress={closeProfileModal}
            />
            <View style={styles.profileModalContent}>
              <View style={styles.modalHandle} />

              <Image
                source={require("../../assets/images/2.jpg")}
                style={styles.profileModalImage}
              />

              <Text style={styles.profileModalName}>Jessica Brown</Text>
              <Text style={styles.profileModalBio}>
                Lifestyle & Fashion enthusiast. Sharing daily tips and
                inspiration ✨
              </Text>

              <View style={styles.profileModalStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>2.4K</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>156</Text>
                  <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>89</Text>
                  <Text style={styles.statLabel}>Lives</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.viewProfileButton}
                onPress={() => {
                  closeProfileModal();
                  router.push("/(pages)/profile/[id]");
                }}
              >
                <Text style={styles.viewProfileButtonText}>View Profile</Text>
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
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
  },
  // Pre-Join Screen
  preJoinContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  preJoinBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  preJoinOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  preJoinCloseButton: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  preJoinContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  preJoinImageContainer: {
    position: "relative",
    marginBottom: 32,
  },
  preJoinImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },
  preJoinLiveBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FF3B30",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  preJoinLiveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
  },
  preJoinLiveText: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  preJoinInfo: {
    alignItems: "center",
    marginBottom: 24,
  },
  preJoinTitle: {
    color: "#ffffff",
    fontSize: 26,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 8,
    textAlign: "center",
  },
  preJoinHost: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  preJoinStats: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 32,
    gap: 16,
  },
  preJoinStatItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  preJoinStatText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  preJoinStatDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  joinButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#4B164C",
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 30,
    marginBottom: 16,
  },
  joinButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  sharePreJoinButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  sharePreJoinText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  // Live Stream
  videoContainer: {
    flex: 1,
    position: "relative",
  },
  videoBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  topBarCenter: {
    flexDirection: "row",
    gap: 8,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FF3B30",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffffff",
  },
  liveText: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  viewerBadge: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  viewerBadgeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  viewerText: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  hostInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  hostAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  hostDetails: {
    flex: 1,
  },
  hostName: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_700Bold",
    marginBottom: 2,
  },
  hostTitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  followButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#4B164C",
  },
  followButtonActive: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  followButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  followButtonTextActive: {
    color: "#ffffff",
  },
  commentsSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  commentsList: {
    flex: 1,
  },
  commentsContent: {
    paddingBottom: 20,
  },
  commentItem: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  commentAvatar: {
    fontSize: 24,
    marginRight: 8,
  },
  commentBubble: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    maxWidth: "80%",
  },
  commentUser: {
    color: "#ffffff",
    fontSize: 13,
    fontFamily: "PlusJakartaSans_600SemiBold",
    marginBottom: 2,
  },
  commentMessage: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  bottomControls: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    color: "#ffffff",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_400Regular",
    paddingVertical: 8,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  loveButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  likeCount: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FF3B30",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    color: "#ffffff",
    fontSize: 10,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  floatingHeart: {
    position: "absolute",
    bottom: 100,
  },
  // Modals
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
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: "80%",
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E3E7EC",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#111111",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F8FE",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  userAvatar: {
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
    marginBottom: 2,
  },
  userFollowers: {
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#9CA4AB",
  },
  followButtonSmall: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#4B164C",
  },
  followButtonSmallActive: {
    backgroundColor: "#E3E7EC",
  },
  followButtonSmallText: {
    color: "#ffffff",
    fontSize: 13,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  followButtonSmallTextActive: {
    color: "#9CA4AB",
  },
  profileModalContent: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingHorizontal: 32,
    paddingBottom: 40,
    alignItems: "center",
  },
  profileModalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
    marginBottom: 20,
  },
  profileModalName: {
    fontSize: 24,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#111111",
    marginBottom: 8,
  },
  profileModalBio: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#66707A",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  profileModalStats: {
    flexDirection: "row",
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#111111",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#9CA4AB",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E3E7EC",
  },
  viewProfileButton: {
    backgroundColor: "#4B164C",
    paddingVertical: 16,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  viewProfileButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
});
