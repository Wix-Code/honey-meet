import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  next: () => void;
}

export default function MakeProfile({ next } : Props) {
  console.log("good")
   console.log('🎨 MakeProfile - next function:', next);
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Content */}
        <View style={styles.content}>
          {/* Image */}
          <View style={styles.imageContainer}>
            <Image 
              source={require("../../assets/images/p.png")} 
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.flex}>
             {/* Title */}
            <Text style={styles.title}>
              There will be no more days of sorrow
            </Text>

            {/* Description */}
            <Text style={styles.description}>
              Do you want to make meaningful relationships, to chat or meet new friends, we can help you find{"\n"} the best match.
            </Text>

            <Text style={styles.description}>
              Complete your data especially your profile and the rest is on us!
            </Text>
          </View>
        </View>

        {/* Fixed Bottom Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={next} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Make a Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    //paddingHorizontal: 24,
    //paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    paddingHorizontal: 24
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 280,
  },
  title: {
    color: '#111111',
    fontSize: 24,
    fontFamily: 'PlusJakartaSans_700Bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    color: '#434E58',
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_400Regular',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  button: {
    padding: 16,
    backgroundColor: '#4B164C',
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FEFEFE',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
}); 