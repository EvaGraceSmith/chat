import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Box, NativeBaseProvider } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import ChatScreen from './screens/ChatScreen';
import Header from './Components/Header';


const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  },
};

const App = () => {
  return (
    <NativeBaseProvider config={config}>
            <Box
        safeArea
        h="100%"
        bg={{
          linearGradient: {
            colors: ['green.600', 'primary.600'],
            start: [0, 0],
            end: [1, 0],
          },
        }}
      >
    <View style={styles.container}>
      <Header />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

      <ChatScreen />
      </KeyboardAvoidingView>
    </View>
    </Box>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default App;






