import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InvitationDetails() {
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null);

  // Mock invitation data
  const invitation = {
    id: 1,
    user: {
      name: "Wisdom Ogbonna",
      image: require("../../../assets/images/1.jpg"),
      location: "San Diego, California",
    },
    date: "18 January, 2025",
    time: "7:00 PM",
    message:
      "Hey! I'd love to meet up for dinner and get to know you better. There's this amazing Italian restaurant I've been wanting to try. Looking forward to it!",
    location: {
      name: "11 Fulton St, New York, NY 10038, USA",
      coordinates: {
        latitude: 40.707093,
        longitude: -74.005981,
      },
    },
  };

  const handleAccept = () => {
    Alert.alert(
      "Accept Invitation",
      "Are you sure you want to accept this invitation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Accept",
          onPress: () => {
            setIsAccepted(true);
            Alert.alert("Success", "Invitation accepted successfully!");
          },
        },
      ],
    );
  };

  const handleDecline = () => {
    Alert.alert(
      "Decline Invitation",
      "Are you sure you want to decline this invitation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Decline",
          style: "destructive",
          onPress: () => {
            setIsAccepted(false);
            Alert.alert("Declined", "Invitation has been declined");
          },
        },
      ],
    );
  };

  const handleCall = () => {
    Linking.openURL("tel:+1234567890");
  };

  const handleMessage = () => {
    router.push("/messages/chat");
  };

  const openInMaps = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${invitation.location.coordinates.latitude},${invitation.location.coordinates.longitude}`,
      android: `geo:0,0?q=${invitation.location.coordinates.latitude},${invitation.location.coordinates.longitude}`,
    });
    Linking.openURL(url!);
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={20} color="#4B164C" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Invitation Details</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Feather name="more-vertical" size={20} color="#4B164C" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* User Info Card */}
          <View style={styles.userCard}>
            <Image source={invitation.user.image} style={styles.userImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{invitation.user.name}</Text>
              <Text style={styles.userLocation}>
                {invitation.user.location}
              </Text>
            </View>
            <View style={styles.userActions}>
              <TouchableOpacity style={styles.iconButton} onPress={handleCall}>
                <FontAwesome6 name="phone" size={18} color="#4B164C" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleMessage}
              >
                <Ionicons
                  name="chatbubble-ellipses"
                  size={18}
                  color="#4B164C"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Date & Time Info */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <MaterialIcons
                    name="calendar-today"
                    size={20}
                    color="#4B164C"
                  />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Date</Text>
                  <Text style={styles.infoValue}>{invitation.date}</Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Ionicons name="time-outline" size={20} color="#4B164C" />
                </View>
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Time</Text>
                  <Text style={styles.infoValue}>{invitation.time}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Message */}
          <View style={styles.messageSection}>
            <Text style={styles.sectionTitle}>Message</Text>
            <View style={styles.messageCard}>
              <Text style={styles.messageText}>{invitation.message}</Text>
            </View>
          </View>

          {/* Location Section */}
          <View style={styles.locationSection}>
            <View style={styles.locationHeader}>
              <Text style={styles.sectionTitle}>Location</Text>
              <TouchableOpacity
                style={styles.directionsButton}
                onPress={openInMaps}
              >
                <Ionicons name="navigate" size={16} color="#4B164C" />
                <Text style={styles.directionsText}>Directions</Text>
              </TouchableOpacity>
            </View>

            {/* Map */}
            <View style={styles.mapContainer}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                  latitude: invitation.location.coordinates.latitude,
                  longitude: invitation.location.coordinates.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={invitation.location.coordinates}
                  title={invitation.user.name}
                  description={invitation.location.name}
                />
              </MapView>
            </View>

            {/* Address */}
            <View style={styles.addressCard}>
              <Ionicons
                name="location-outline"
                size={20}
                color="#4B164C"
                style={styles.addressIcon}
              />
              <Text style={styles.addressText}>{invitation.location.name}</Text>
            </View>
          </View>

          {/* Status Badge (if already responded) */}
          {isAccepted !== null && (
            <View
              style={[
                styles.statusBadge,
                isAccepted ? styles.statusAccepted : styles.statusDeclined,
              ]}
            >
              <Feather
                name={isAccepted ? "check-circle" : "x-circle"}
                size={20}
                color="#ffffff"
              />
              <Text style={styles.statusText}>
                {isAccepted ? "Invitation Accepted" : "Invitation Declined"}
              </Text>
            </View>
          )}

          {/* Bottom Padding */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Action Buttons (Fixed at bottom) */}
        {isAccepted === null && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.declineButton}
              onPress={handleDecline}
              activeOpacity={0.8}
            >
              <Feather name="x" size={20} color="#FF3B30" />
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleAccept}
              activeOpacity={0.8}
            >
              <Feather name="check" size={20} color="#ffffff" />
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
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
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F6F8FE",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  userImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#111111",
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#66707A",
  },
  userActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
  },
  infoItem: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  infoTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: "PlusJakartaSans_500Medium",
    color: "#9CA4AB",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#111111",
  },
  messageSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans_700Bold",
    color: "#111111",
    marginBottom: 12,
  },
  messageCard: {
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    padding: 16,
  },
  messageText: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans_400Regular",
    color: "#66707A",
    lineHeight: 22,
  },
  locationSection: {
    marginBottom: 24,
  },
  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  directionsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F6F8FE",
    borderRadius: 20,
  },
  directionsText: {
    fontSize: 13,
    fontFamily: "PlusJakartaSans_600SemiBold",
    color: "#4B164C",
  },
  mapContainer: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F8FE",
    borderRadius: 16,
    padding: 16,
  },
  addressIcon: {
    marginRight: 12,
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "PlusJakartaSans_500Medium",
    color: "#111111",
    lineHeight: 20,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  statusAccepted: {
    backgroundColor: "#34C759",
  },
  statusDeclined: {
    backgroundColor: "#FF3B30",
  },
  statusText: {
    color: "#ffffff",
    fontSize: 15,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    gap: 12,
  },
  declineButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#FF3B30",
  },
  declineButtonText: {
    color: "#FF3B30",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  acceptButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: "#4B164C",
  },
  acceptButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
});
