import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4B164C",
        tabBarInactiveTintColor: "#9CA4AB",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          //bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: "#ffffff",
          // borderRadius: 30,
          height: 100,
          paddingTop: 20,
          elevation: 10,
          shadowColor: "#000",
          //marginBottom: 10,
          justifyContent: "space-between",
          alignItems: "center",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          borderTopWidth: 0,
          paddingBottom: 0,
          //paddingVertical: 30,
        },
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={26} color={color} />
          ),
        }}
      />

      {/* Discover Tab */}
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={26} color={color} />
          ),
        }}
      />

      {/* Center Plus Button */}
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ focused }) => (
            <View style={styles.centerButton}>
              <Ionicons name="add" size={32} color="#ffffff" />
            </View>
          ),
        }}
        // listeners={{
        //   tabPress: (e) => {
        //     // Prevent default navigation
        //     // e.preventDefault();
        //     // Add your custom action here
        //     // For example: open modal, navigate to create screen, etc.
        //   },
        // }}
      />

      {/* Messages Tab */}
      <Tabs.Screen
        name="message"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={26}
              color={color}
            />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="account"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="post"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4B164C",
    justifyContent: "center",
    alignItems: "center",
    //marginTop: -25, // Lifts the button above the tab bar
    shadowColor: "#4B164C",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
