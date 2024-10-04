import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import TaskForm from '../screens/TaskForm';
import { RouteProp } from '@react-navigation/native';

interface InsideLayoutProps {
  route: RouteProp<any, any>;
}

const InsideStack = createNativeStackNavigator();

const InsideLayout: React.FC<InsideLayoutProps> = ({ route }) => {
  const { userId } = route.params;
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen 
        name="My todos" 
        component={Home}
        options={{headerShown: false}} 
        initialParams={{ userId: userId }}
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
};

export default InsideLayout;