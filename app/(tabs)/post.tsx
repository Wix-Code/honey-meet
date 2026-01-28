import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function post() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        gap: 10,
      }}
    >
      <Text>Dating</Text>
      <Link href={"/(pages)/dating-list"}>Link</Link>
      <Link href={"/(pages)/send-invitation"}>Link</Link>
      <Link href={"/invitation/[id]"}>Link</Link>
      <Link href={"/(pages)/all-notifications"}>Link</Link>
      <Link href={"/(pages)/search"}>Link</Link>
    </View>
  );
}
