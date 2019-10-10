import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.kevin}>
      <Text>WELCOME TO KICK UP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 100,

  },
  kevin: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
    fontWeight: 'bold',
    fontSize: 50,
  }
});
