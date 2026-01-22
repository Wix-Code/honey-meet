import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

type Props = {
  prev: () => void;
  next: () => void;
};

const hobbiesOptions = [
  { id: "football", label: "Football" },
  { id: "basketball", label: "Basketball" },
  { id: "yoga", label: "Yoga" },
  { id: "reading", label: "Reading" },
  { id: "cooking", label: "Cooking" },
  { id: "gaming", label: "Gaming" },
  { id: "music", label: "Music" },
  { id: "traveling", label: "Traveling" },
  { id: "dancing", label: "Dancing" },
  { id: "photography", label: "Photography" },
  { id: "art", label: "Art & Crafts" },
  { id: "fitness", label: "Fitness" },
  { id: "movies", label: "Movies & TV" },
  { id: "writing", label: "Writing" },
  { id: "hiking", label: "Hiking" },
  { id: "swimming", label: "Swimming" },
];

export default function Hobbies({ prev, next }: Props) {
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  const toggleHobby = (hobbyId: string) => {
    setSelectedHobbies((current) => {
      if (current.includes(hobbyId)) {
        // Remove if already selected
        return current.filter((id) => id !== hobbyId);
      } else {
        // Add if not selected
        return [...current, hobbyId];
      }
    });
  };

  return (
    <SafeAreaView edges={[ "bottom"]} style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={prev} style={styles.backButton}>
            <Feather name="arrow-left" size={20} color="#4B164C" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>What hobbies do you like?</Text>
          <Text style={styles.subtitle}>Select at least 3 hobbies</Text>

          <View style={styles.hobbiesContainer}>
            {hobbiesOptions.map((hobby) => (
              <TouchableOpacity
                key={hobby.id}
                style={[
                  styles.hobbyChip,
                  selectedHobbies.includes(hobby.id) && styles.hobbyChipActive,
                ]}
                onPress={() => toggleHobby(hobby.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.hobbyLabel,
                    selectedHobbies.includes(hobby.id) && styles.hobbyLabelActive,
                  ]}
                >
                  {hobby.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              selectedHobbies.length < 3 && styles.continueButtonDisabled,
            ]}
            activeOpacity={0.8}
            disabled={selectedHobbies.length < 3}
            onPress={next}
          >
            <Text style={styles.continueButtonText}>
              Continue
            </Text>
          </TouchableOpacity>
          {selectedHobbies.length < 3 && (
            <Text style={styles.helperText}>
              {selectedHobbies.length} of 3 selected
            </Text>
          )}
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
  hobbiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  hobbyChip: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#F6F8FE",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "transparent",
  },
  hobbyChipActive: {
    backgroundColor: "#4B164C",
    borderColor: "#4B164C",
  },
  hobbyLabel: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_500Medium",
    color: "#111111",
  },
  hobbyLabelActive: {
    color: "#FEFEFE",
    fontFamily: "PlusJakartaSans_600SemiBold",
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