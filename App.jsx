import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import Loginform from './src/Components/Loginform';
import Header from './src/Components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './src/Components/Dashboard';
import Footer from './src/Components/footer';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Header /> 
        <Stack.Navigator
          screenOptions={{
            headerShown: false, 
          }}
        >
          <Stack.Screen name="Login" component={Loginform} />
          <Stack.Screen name="dash" component={Dashboard} />
        </Stack.Navigator>
        <Footer/>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});