import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import ToDoTask from "../models/Task";
import { AppDispatch, RootState } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";


interface MyErrorType {
  message: string;
  code?: string;
  // other fields that your error might have
}

export const fetch_tasks = async (): Promise<ToDoTask[]> => {
    // const user = state.app.user; // get from sotrage
    try {
        const usersCollectionRef = collection(FIREBASE_DB, 'Users');
        const usersSnapshot = await getDocs(usersCollectionRef);
        const taskList: ToDoTask[] = [];
        const userId = await AsyncStorage.getItem('userId');

        usersSnapshot.docs.map(doc => {
            const userData = doc.data();
            if (userData.id == userId) {
                console.log("Current user tasks array", userData.tasks);
                for (const taskData of userData.tasks) {
                    taskList.push({
                        id: taskData.id,
                        title: taskData.title,
                        details: taskData.details,
                        completed: taskData.completed,
                    });
                }
            }
        });
        return taskList;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};


export const deleteTask = createAsyncThunk<ToDoTask[], string, { rejectValue: MyErrorType }>(
    'tasks/deleteTask',
    async (taskId, { rejectWithValue }) => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const userDocRef = doc(FIREBASE_DB, 'Users', userId);
        const userDocSnap = await getDoc(userDocRef);
  
        if (userDocSnap.exists()) {
          const userDocData = userDocSnap.data();
          const updatedTasks = userDocData.tasks.filter((task: ToDoTask) => task.id !== taskId);
          await updateDoc(userDocRef, { tasks: updatedTasks });
  
          return updatedTasks;
        }
  
        throw new Error('User document does not exist');
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue({ message: error.message });
        }
        return rejectWithValue({ message: 'Unknown error' });
      }
    }
  );

export const addTask = createAsyncThunk<ToDoTask[], ToDoTask, { rejectValue: MyErrorType }>(
    'tasks/addTask',
    async (task, { rejectWithValue }) => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const userDocRef = doc(FIREBASE_DB, 'Users', userId);
        const userDocSnap = await getDoc(userDocRef);
  
        if (userDocSnap.exists()) {
          const userDocData = userDocSnap.data();
          const updatedTasks = userDocData.tasks.concat(task);
          await updateDoc(userDocRef, { tasks: updatedTasks });
  
          return updatedTasks;
        }
  
        throw new Error('User document does not exist');
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue({ message: error.message });
        }
        return rejectWithValue({ message: 'Unknown error' });
      }
    }
  );

export const updateTask = createAsyncThunk<ToDoTask[], ToDoTask, { rejectValue: MyErrorType }>(
    'tasks/updateTask',
    async (updatedTask, { rejectWithValue }) => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const userDocRef = doc(FIREBASE_DB, 'Users', userId);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userDocData = userDocSnap.data();
                const tasks = userDocData.tasks;
                const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);

                if (taskIndex !== -1) {
                    tasks[taskIndex] = updatedTask;

                    // Update the tasks in the database
                    await updateDoc(userDocRef, { tasks: tasks });

                    return tasks;
                }

                throw new Error('Task does not exist');
            }

            throw new Error('User document does not exist');
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue({ message: error.message });
            }
            return rejectWithValue({ message: 'Unknown error' });
        }
    }
);



export const toggleTaskCompletion = createAsyncThunk<ToDoTask, string, { rejectValue: MyErrorType }>(
    'tasks/toggleTaskCompletion',
    async (taskId, { rejectWithValue }) => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const userDocRef = doc(FIREBASE_DB, 'Users', userId);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userDocData = userDocSnap.data();
                const tasks = userDocData.tasks;
                const taskIndex = tasks.findIndex((task) => task.id === taskId);

                if (taskIndex !== -1) {
                    tasks[taskIndex].completed = !tasks[taskIndex].completed;

                    // Update the tasks in the database
                    await updateDoc(userDocRef, { tasks: tasks });

                    return tasks[taskIndex];
                }

                throw new Error('Task does not exist');
            }

            throw new Error('User document does not exist');
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue({ message: error.message });
            }
            return rejectWithValue({ message: 'Unknown error' });
        }
    }
);