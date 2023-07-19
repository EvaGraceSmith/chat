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
            colors: ['amber.700', 'primary.600'],
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







// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
