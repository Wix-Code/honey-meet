import { Stack } from "expo-router";

export default function SetupLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="make-a-profile" />
      <Stack.Screen name="about-you" />
      <Stack.Screen name="birthday" />
      <Stack.Screen name="gender" />
      <Stack.Screen name="hobbies" />
      <Stack.Screen name="describe" />
      <Stack.Screen name="upload-picture" />
    </Stack>
  );
}