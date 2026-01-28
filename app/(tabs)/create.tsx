import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Animated,
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

const ToggleSwitch = ({
  value,
  onToggle,
}: {
  value: boolean;
  onToggle: () => void;
}) => {
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E3E7EC", "#4B164C"],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      style={styles.switchContainer}
    >
      <Animated.View style={[styles.switch, { backgroundColor }]}>
        <Animated.View
          style={[styles.switchThumb, { transform: [{ translateX }] }]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function create() {
  const [postText, setPostText] = useState("");
  const [location, setLocation] = useState("");
  const [allowComments, setAllowComments] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleSaveDraft = () => {
    Alert.alert("Draft Saved", "Your post has been saved to drafts");
  };

  const pickImages = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please allow access to your photos");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets.map((asset) => asset.uri);
      setSelectedImages([...selectedImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    if (!postText.trim()) {
      Alert.alert("Error", "Please write something before publishing");
      return;
    }

    Alert.alert("Success", "Your post has been published!", [
      { text: "OK", onPress: () => router.back() },
    ]);
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
          <Text style={styles.headerTitle}>New Post</Text>
          <TouchableOpacity
            style={styles.draftButton}
            onPress={handleSaveDraft}
          >
            <Text style={styles.draftText}>Draft</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Text Input Section */}
          <View style={styles.inputSection}>
            <TextInput
              style={styles.textInput}
              placeholder="What's on your mind?"
              placeholderTextColor="#9CA4AB"
              multiline
              value={postText}
              onChangeText={setPostText}
              textAlignVertical="top"
            />

            {/* Selected Images Preview */}
            {selectedImages.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.imagePreviewScroll}
              >
                {selectedImages.map((uri, index) => (
                  <View key={index} style={styles.imagePreviewContainer}>
                    <Image source={{ uri }} style={styles.imagePreview} />
                    <TouchableOpacity
                      style={styles.removeImageButton}
                      onPress={() => removeImage(index)}
                    >
                      <Feather name="x" size={16} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}

            {/* Media Actions */}
            <View style={styles.mediaActions}>
              <TouchableOpacity style={styles.mediaButton} onPress={pickImages}>
                <Feather name="image" size={22} color="#4B164C" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.mediaButton}>
                <Ionicons name="videocam-outline" size={22} color="#4B164C" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Location */}
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => console.log("Select location")}
          >
            <View style={styles.optionLeft}>
              <View style={styles.optionIcon}>
                <Ionicons name="location-outline" size={20} color="#4B164C" />
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Location</Text>
                {location ? (
                  <Text style={styles.optionValue}>{location}</Text>
                ) : (
                  <Text style={styles.optionPlaceholder}>Add location</Text>
                )}
              </View>
            </View>
            <Entypo name="chevron-thin-right" size={18} color="#9CA4AB" />
          </TouchableOpacity>

          {/* Tag People */}
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => console.log("Tag people")}
          >
            <View style={styles.optionLeft}>
              <View style={styles.optionIcon}>
                <Feather name="user-plus" size={20} color="#4B164C" />
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Tag People</Text>
                <Text style={styles.optionPlaceholder}>Add tags</Text>
              </View>
            </View>
            <Entypo name="chevron-thin-right" size={18} color="#9CA4AB" />
          </TouchableOpacity>

          {/* Allow Comments Toggle */}
          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <View style={styles.optionIcon}>
                <Feather name="message-circle" size={20} color="#4B164C" />
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Allow Comments</Text>
                <Text style={styles.optionDescription}>
                  Let people comment on your post
                </Text>
              </View>
            </View>
            <ToggleSwitch
              value={allowComments}
              onToggle={() => setAllowComments(!allowComments)}
            />
          </View>

          {/* Premium Post Toggle */}
          <View style={styles.optionItem}>
            <View style={styles.optionLeft}>
              <View style={styles.optionIcon}>
                <Ionicons name="diamond-outline" size={20} color="#4B164C" />
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Premium Post</Text>
                <Text style={styles.optionDescription}>
                  Only premium members can see
                </Text>
              </View>
            </View>
            <ToggleSwitch
              value={isPremium}
              onToggle={() => setIsPremium(!isPremium)}
            />
          </View>

          {/* Character Count */}
          <View style={styles.characterCount}>
            <Text style={styles.characterCountText}>
              {postText.length} / 500 characters
            </Text>
          </View>
        </ScrollView>

        {/* Publish Button */}
        <View style={styles.publishContainer}>
          <TouchableOpacity
            style={[
              styles.publishButton,
              !postText.trim() && styles.publishButtonDisabled,
            ]}
            onPress={handlePublish}
            disabled={!postText.trim()}
            activeOpacity={0.8}
          >
            <Text style={styles.publishButtonText}>Publish</Text>
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
  headerTitle: {
    color: "#111111",
    fontSize: 18,
    fontFamily: "PlusJakartaSans_700Bold",
  },
  draftButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  draftText: {
    color: "#4B164C",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  inputSection: {
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  textInput: {
    fontSize: 15,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#111111",
    minHeight: 120,
    marginBottom: 12,
  },
  imagePreviewScroll: {
    marginBottom: 12,
  },
  imagePreviewContainer: {
    position: "relative",
    marginRight: 8,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  mediaActions: {
    flexDirection: "row",
    gap: 12,
  },
  mediaButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    color: "#111111",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_600SemiBold",
    marginBottom: 2,
  },
  optionDescription: {
    color: "#66707A",
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  optionValue: {
    color: "#4B164C",
    fontSize: 13,
    fontFamily: "PlusJakartaSans_500Medium",
  },
  optionPlaceholder: {
    color: "#9CA4AB",
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  switchContainer: {
    padding: 4,
  },
  switch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  characterCount: {
    paddingTop: 16,
    alignItems: "center",
  },
  characterCountText: {
    color: "#9CA4AB",
    fontSize: 12,
    fontFamily: "PlusJakartaSans_400Regular",
  },
  publishContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  publishButton: {
    backgroundColor: "#4B164C",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  publishButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  publishButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
});
