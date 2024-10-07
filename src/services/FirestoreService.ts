import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import ToDoTask from '../models/ToDoTask';
import APP_CONSTANTS from '../constants';

class FirestoreService {
    static async signIn(email: string, password: string): Promise<string> {
        try {
            const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const userId = userCredential.user.uid;
            await AsyncStorage.setItem(APP_CONSTANTS.STORAGE_KEY_USER_ID, userId);
            return userId;
        } catch (error) {
            throw error;
        }

    };
    
    static async signUp(email: string, password: string): Promise<string> {
        try {
            const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const userId = userCredential.user.uid;
            await AsyncStorage.setItem(APP_CONSTANTS.STORAGE_KEY_USER_ID, userId);
        
            const userDocRef = doc(FIREBASE_DB, 'Users', userId);
            const userDocSnap = await getDoc(userDocRef);
                
            if (!userDocSnap.exists()) {
                await setDoc(userDocRef, { userId: userId });
            }
        
            return userId;
        } catch (error) {
            throw error;
        }
    };
    
    static async logout(): Promise<void> {
        await signOut(FIREBASE_AUTH);
        await AsyncStorage.removeItem(APP_CONSTANTS.STORAGE_KEY_USER_ID);
    };

    static async fetchTasks(userId: string): Promise<ToDoTask[]> {
        const usersCollectionRef = collection(FIREBASE_DB, 'Users');
        const usersSnapshot = await getDocs(usersCollectionRef);
        const taskList: ToDoTask[] = [];

        usersSnapshot.docs.forEach((doc) => {
            const userData = doc.data();
            if (userData.id === userId) {
                userData.tasks.forEach((taskData: any) => {
                    taskList.push({
                        id: taskData.id,
                        title: taskData.title,
                        details: taskData.details,
                        completed: taskData.completed,
                    });
                });
            }
        });

        return taskList;
    }

    static async deleteTask(taskId: string, userId: string): Promise<ToDoTask[]> {
        const userDocRef = doc(FIREBASE_DB, 'Users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userDocData = userDocSnap.data();
            const updatedTasks = userDocData.tasks.filter((task: ToDoTask) => task.id !== taskId);
            await updateDoc(userDocRef, { tasks: updatedTasks });
            return updatedTasks;
        }

        throw new Error('User document does not exist');
    }

    static async addTask(task: ToDoTask, userId: string): Promise<ToDoTask[]> {
        const userDocRef = doc(FIREBASE_DB, 'Users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userDocData = userDocSnap.data();
            const updatedTasks = userDocData.tasks.concat(task);
            await updateDoc(userDocRef, { tasks: updatedTasks });
            return updatedTasks;
        }

        throw new Error('User document does not exist');
    }

    static async updateTask(updatedTask: ToDoTask, userId: string): Promise<ToDoTask[]> {
        const userDocRef = doc(FIREBASE_DB, 'Users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const tasks = userDocSnap.data().tasks;
            const taskIndex = tasks.findIndex((task: ToDoTask) => task.id === updatedTask.id);

            if (taskIndex !== -1) {
                tasks[taskIndex] = updatedTask;
                await updateDoc(userDocRef, { tasks: tasks });
                return tasks;
            }
            throw new Error('Task does not exist');
        }
        throw new Error('User document does not exist');
    }

    static async toggleTaskCompletion(taskId: string, userId: string): Promise<ToDoTask> {
        const userDocRef = doc(FIREBASE_DB, 'Users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const tasks = userDocSnap.data().tasks;
            const taskIndex = tasks.findIndex((task: ToDoTask) => task.id === taskId);

            if (taskIndex !== -1) {
                tasks[taskIndex].completed = !tasks[taskIndex].completed;
                await updateDoc(userDocRef, { tasks: tasks });
                return tasks[taskIndex];
            }

            throw new Error('Task does not exist');
        }

        throw new Error('User document does not exist');
    }
}

export default FirestoreService;