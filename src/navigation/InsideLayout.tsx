import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import TaskForm from '../screens/TaskForm';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigationTypes';
import APP_CONSTANTS from '../constants';

interface InsideLayoutProps {
  route: RouteProp<RootStackParamList, 'InsideLayout'>;
}

const InsideStack = createNativeStackNavigator();

const InsideLayout: React.FC<InsideLayoutProps> = ({ route }) => {
  const { userId } = route.params;
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen 
        name={APP_CONSTANTS.STACK_NAVIGATION_SCREEN_HOME}
        component={Home}
        options={{headerShown: false}} 
        initialParams={{ userId: userId }}
      />
      <InsideStack.Screen 
        name={APP_CONSTANTS.STACK_NAVIGATION_SCREEN_CREATE_TASK} 
        component={TaskForm}  
        options={{ 
          headerShown: false,
          presentation: 'modal',   
          animation: 'slide_from_bottom'
        }}
      />
      <InsideStack.Screen 
        name={APP_CONSTANTS.STACK_NAVIGATION_SCREEN_EDIT_TASK} 
        component={TaskForm}  
        options={{ 
          headerShown: false,
          presentation: 'modal',   
          animation: 'slide_from_bottom',
        }}
      />
    </InsideStack.Navigator>
  );
};

export default InsideLayout;