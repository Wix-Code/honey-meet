import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AboutYou from './about-you';
import Birthday from './birthday';
import Gender from './gender';
import MakeProfile from './make-a-profile';
import Hobbies from './hobbies';
import DescribeYourself from './describe';
import UploadPicture from './upload-picture';
//import UploadPicture from './upload-picture';

export default function SetupFlow() {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const next = () => {
    console.log('✅ Next function called! Current step:', step);
    setStep((s) => s + 1);
  };

  const prev = () => {
    if (step > 1) {
      console.log('⬅️ Prev function called! Current step:', step);
      setStep((s) => s - 1);
    }
  };

  console.log('🎬 Rendering SetupFlow - Current step:', step);

  return (
    <View style={styles.container}>
      {/* Progress Indicator - Only show after MakeProfile */}
      {step > 1 && (
        <View style={styles.progressContainer}>
          {[...Array(totalSteps)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index + 2 <= step && styles.progressDotActive,
              ]}
            />
          ))}
        </View>
      )}

      {/* IMPORTANT: Make sure MakeProfile receives the next prop */}
      {step === 1 && <MakeProfile next={next} />}
      {step === 2 && <AboutYou next={next} prev={prev} />}
      {step === 3 && <Birthday next={next} prev={prev} />}
      {step === 4 && <Gender next={next} prev={prev} />}
      {step === 5 && <Hobbies next={next} prev={prev} />}
      {step === 6 && <UploadPicture next={next} prev={prev} />}
      {step === 7 && <DescribeYourself next={next} prev={prev} isLastStep />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    marginTop: 20,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5E5',
  },
  progressDotActive: {
    backgroundColor: '#4B164C',
    width: 24,
  },
});