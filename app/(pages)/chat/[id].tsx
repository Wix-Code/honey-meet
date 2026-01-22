import { useGlobalSearchParams } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'


export default function ChatPage() {
  const { id } = useGlobalSearchParams()
  
  
  return (
    <View>
      <Text>Chat</Text>
    </View>
  )
}
