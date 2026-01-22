import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";

type Props = {
  prev: () => void;
  next: () => void;
};

export default function UploadPicture({ prev, next }: Props) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const maxImages = 6;

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photos to upload pictures."
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    if (selectedImages.length >= maxImages) {
      Alert.alert(
        "Maximum Reached",
        `You can only upload up to ${maxImages} photos.`
      );
      return;
    }

    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImages([...selectedImages, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    if (selectedImages.length >= maxImages) {
      Alert.alert(
        "Maximum Reached",
        `You can only upload up to ${maxImages} photos.`
      );
      return;
    }

    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow access to your camera to take photos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImages([...selectedImages, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={prev} style={styles.backButton}>
            <Feather name="arrow-left" size={20} color="#4B164C" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Upload your photos</Text>
          <Text style={styles.subtitle}>
            Add at least 2 photos to continue
          </Text>

          {/* Photo Grid */}
          <View style={styles.photoGrid}>
            {/* Display selected images */}
            {selectedImages.map((uri, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image source={{ uri }} style={styles.photo} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage(index)}
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={16} color="#ffffff" />
                </TouchableOpacity>
                {index === 0 && (
                  <View style={styles.mainBadge}>
                    <Text style={styles.mainBadgeText}>Main</Text>
                  </View>
                )}
              </View>
            ))}

            {/* Empty slots */}
            {[...Array(maxImages - selectedImages.length)].map((_, index) => (
              <TouchableOpacity
                key={`empty-${index}`}
                style={styles.emptySlot}
                onPress={pickImage}
                activeOpacity={0.7}
              >
                <Feather name="plus" size={32} color="#9CA4AB" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={pickImage}
              activeOpacity={0.7}
            >
              <MaterialIcons name="photo-library" size={24} color="#4B164C" />
              <Text style={styles.actionButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={takePhoto}
              activeOpacity={0.7}
            >
              <MaterialIcons name="camera-alt" size={24} color="#4B164C" />
              <Text style={styles.actionButtonText}>Take a Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Tips */}
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>📸 Photo Tips:</Text>
            <Text style={styles.tipText}>• Use clear, recent photos</Text>
            <Text style={styles.tipText}>• Show your face clearly</Text>
            <Text style={styles.tipText}>• Include variety (close-up, full body)</Text>
            <Text style={styles.tipText}>• First photo will be your main picture</Text>
          </View>
        </View>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              selectedImages.length < 2 && styles.continueButtonDisabled,
            ]}
            activeOpacity={0.8}
            disabled={selectedImages.length < 2}
            onPress={next}
          >
            <Text style={styles.continueButtonText}>
              Continue
            </Text>
          </TouchableOpacity>
          {selectedImages.length < 2 && (
            <Text style={styles.helperText}>
              {selectedImages.length} of 2 photos added
            </Text>
          )}
        </View>
      </View>
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    color: "#111111",
    fontSize: 24,
    fontFamily: "PlusJakartaSans_700Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#66707A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    textAlign: "center",
    marginBottom: 32,
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  photoContainer: {
    position: "relative",
    width: "31%",
    aspectRatio: 0.8,
    borderRadius: 12,
    overflow: "hidden",
  },
  photo: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F6F8FE",
  },
  emptySlot: {
    width: "31%",
    aspectRatio: 0.8,
    backgroundColor: "#F6F8FE",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  mainBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "#4B164C",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  mainBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  actionButtons: {
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 16,
    backgroundColor: "#F6F8FE",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#4B164C",
  },
  tipsContainer: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
  },
  tipsTitle: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#111111",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#66707A",
    marginBottom: 4,
    lineHeight: 20,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  continueButton: {
    padding: 16,
    backgroundColor: "#4B164C",
    borderRadius: 25,
    alignItems: "center",
  },
  continueButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  continueButtonText: {
    color: "#FEFEFE",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  helperText: {
    color: "#66707A",
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    textAlign: "center",
    marginTop: 12,
  },
});