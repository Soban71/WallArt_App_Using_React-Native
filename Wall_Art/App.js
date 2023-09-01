import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';

//scren importing
import Screen from './views/Screen';
import Screen2 from './views/Screen2';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="S1">
          <Stack.Screen name="S1" component={Screen} 

options={{
          headerStyle: {
        backgroundColor: '#42f5ba', 
        },
        headerTintColor: '#fff',  
        headerTitleStyle: {
          fontWeight: 'bold',
        },title: 'Home',
        headerTitleAlign: 'center',
        }}
          />
           <Stack.Screen name="S2" component={Screen2} 

options={{
          headerStyle: {
        backgroundColor: '#272829', 
        },
        headerTintColor: '#fff',  
        headerTitleStyle: {
          fontWeight: 'bold',
        },title: 'Back',
        headerTitleAlign: 'center',
        }}
           />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
