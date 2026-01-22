import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-in-email" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="sign-up-email" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="new-password" />
    </Stack>
  );
}