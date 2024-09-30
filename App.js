import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {User} from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './src/screens/Home';
import TaskForm from './src/screens/TaskForm';
import { Provider } from 'react-redux';
import store from './src/redux/store';


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

export default function App() {
  // const user = useSelector(state => state.user);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     console.log('User:', user);
  //     dispatch({ type: 'SET_USER', payload: user})
  //   });
  //   }, []);

    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
        setUser(user);
      });
      return () => unsubscribe();
    }, []);

  return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          {user ? (
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

  );
}

