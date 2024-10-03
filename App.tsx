import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {User} from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './src/screens/Home';
import TaskForm from './src/screens/TaskForm';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
      <InsideStack.Navigator>
        <InsideStack.Screen 
          name="My todos" 
          component={Home}
          options={{headerShown: false}} 
        />
        <InsideStack.Screen 
          name="CreateTask" 
          component={TaskForm}  
          initialParams={{ mode: 'create' }} 
          options={{ 
            title: 'Create New Task', 
            presentation: 'modal',   
            animation: 'slide_from_bottom'
          }}
        />
        <InsideStack.Screen 
          name="EditTask" 
          component={TaskForm}  
          options={{ 
            title: 'Edit Task', 
            presentation: 'modal',   
            animation: 'slide_from_bottom',
          }}
        />
      </InsideStack.Navigator>
  );
}

export const App = () => {
  // const user = useSelector(state => state.user);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     console.log('User:', user);
  //     dispatch({ type: 'SET_USER', payload: user})
  //   });
  //   }, []);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
  const checkUserCredentials = async () => {
    const storedUserId = await AsyncStorage.getItem('userCredential');
    console.log('storedUserId:', storedUserId); // Add logging here
    setUserId(storedUserId);
  };

  const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
    if (user) {
      console.log('user.uid TUKKKKKKK:', user.uid); // Add logging here
      setUserId(user.uid);
    }
  });

  checkUserCredentials();

  return () => unsubscribe();
}, []);

console.log('userId:', userId); // Add logging here

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          {userId ? (
            <Stack.Screen 
              name="InsideLayout" 
              component={InsideLayout} 
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{headerShown: false}} 
            />

          )}
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
  );
}

export default App;