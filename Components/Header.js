import React from 'react';
import { View, Text, StyleSheet, StatusBar, Platform, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box, NativeBaseProvider } from 'native-base';

const config = {
    dependencies: {
      'linear-gradient': LinearGradient
    },
  };

const Header = () => {
  const headerHeight = Platform.OS === 'ios' ? 120 : 80;
  const statusBarHeight = StatusBar.currentHeight || 0;

  return (
    <NativeBaseProvider config={config}>
    <SafeAreaView style={styles.container}>
        
      <View style={[styles.headerContainer, { height: headerHeight + statusBarHeight }]}>
        <StatusBar backgroundColor="#FFA500" barStyle="light-content" />
        <Text style={styles.logo}>Chat App</Text>
      </View>
    </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#06b6d4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: Platform.OS === 'ios' ? 40 : 0,
  },
});

export default Header;
