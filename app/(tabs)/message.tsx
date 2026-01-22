import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { initialChats } from '../dummyData';

// Sample chat data

export default function Messages() {
  const [chats, setChats] = useState(initialChats);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (chatId: number, chatName: string) => {
    Alert.alert(
      'Delete Chat',
      `Are you sure you want to delete your conversation with ${chatName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setChats(chats.filter((chat) => chat.id !== chatId));
          },
        },
      ]
    );
  };

  const renderRightActions = (chatId: number, chatName: string) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(chatId, chatName)}
        activeOpacity={0.8}
      >
        <MaterialIcons name="delete" size={24} color="#F64747" />
      </TouchableOpacity>
    );
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={20} color="#4B164C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Entypo name="dots-three-vertical" size={20} color="#4B164C" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <EvilIcons name="search" size={24} color="#9CA4AB" />
          <TextInput
            placeholder="Search Message..."
            placeholderTextColor="#9CA4AB"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Chat List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredChats.map((chat) => (
          <Swipeable
            key={chat.id}
            renderRightActions={() => renderRightActions(chat.id, chat.name)}
            overshootRight={false}
            rightThreshold={40}
          >
            <TouchableOpacity
              style={styles.chatItem}
              activeOpacity={0.7}
              onPress={() => router.push(`/chat/${chat.id}`)}
            >
              {/* Profile Image with Online Status */}
              <View style={styles.imageContainer}>
                <Image style={styles.profileImage} source={chat.image} />
                {chat.isOnline && <View style={styles.onlineIndicator} />}
              </View>

              {/* Chat Info */}
              <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName}>{chat.name}</Text>
                  <Text style={styles.chatTime}>{chat.time}</Text>
                </View>
                <View style={styles.chatFooter}>
                  <Text
                    style={[
                      styles.lastMessage,
                      chat.unreadCount > 0 && styles.lastMessageUnread,
                    ]}
                    numberOfLines={1}
                  >
                    {chat.lastMessage}
                  </Text>
                  {chat.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </Swipeable>
        ))}

        {filteredChats.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={64} color="#E6E6E6" />
            <Text style={styles.emptyTitle}>No messages found</Text>
            <Text style={styles.emptyMessage}>
              Try adjusting your search
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Fixed New Chat Button */}
      <TouchableOpacity
        style={styles.newChatButton}
        activeOpacity={0.8}
        onPress={() => router.push('/(setup)')}
      >
        <Ionicons name="add" size={28} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F6F8FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#111111',
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#E3E7EC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: '#111111',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 100,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    backgroundColor: '#ffffff',
    //borderTopRightRadius: 10,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  profileImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    color: '#111111',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  chatTime: {
    color: '#9CA4AB',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_400Regular',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    color: '#78828A',
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_400Regular',
    marginRight: 8,
  },
  lastMessageUnread: {
    color: '#111111',
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4B164C',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  deleteButton: {
    backgroundColor: '#FCEAD9',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  deleteText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    marginTop: 4,
  },
  newChatButton: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4B164C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4B164C',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#111111',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_400Regular',
    color: '#9CA4AB',
  },
});