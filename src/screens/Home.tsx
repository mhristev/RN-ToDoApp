import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import ToDoTask from '../models/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_DB } from '../../FirebaseConfig';  // Assuming you have Firebase configured like this
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, fetch_tasks, toggleTaskCompletion } from '../redux/actions';
import { AppDispatch, RootState } from '../redux/store';
import { fetchTasks } from '../redux/tasksSlice';
interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
    const [userId, setUserId] = useState(null); // Add this line

    // const [tasks, setTasks] = useState<Task[]>([
    //     { id: 1, title: 'test task 1', details: 'Details for task 1', completed: true },
    //     { id: 2, title: 'Task 2', details: 'Details for task 2', completed: false },
    //     { id: 3, title: 'Task 3', details: 'Details for task 3', completed: false },
    //     { id: 4, title: 'Task 4', details: 'Details for task 4', completed: false },
    // ]);

    // const addTask = (task: Task) => {
    //     setTasks([...tasks, task]);
    // };

    // const updateTask = (updatedTask: Task) => {
    //     setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    // };

    // const deleteTask = (taskId: number) => {
    //     setTasks(tasks.filter(task => task.id !== taskId));  
    // };

    // const toggleTaskCompletion = (id: number) => {
    //     setTasks(tasks.map(task =>
    //         task.id === id ? { ...task, completed: !task.completed } : task
    //     ));
    // };

    // const [tasks, setTasks] = useState<ToDoTask[]>([]);  // Start with an empty array
    // const dispatch = useDispatch();

    // // const { tasks, loading, error } = useAppSelector((state) => state.tasks);
    // const {tasks } = useSelector((state: RootState ) => state.task);

    // useEffect(() => {
    //     const fetchUserTasks = async () => {
    //       const userId = await AsyncStorage.getItem('userId');  // Assuming userId is stored locally
    //       setUserId(userId);  // Set userId state
    //       if (userId) {
    //         dispatch(fetchTasks(userId));
    //       }
    //     };
    
    //     fetchUserTasks();
        
    //   }, [dispatch]);
    
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //     //   dispatch(fetch_tasks());
    //     });
    //     return unsubscribe;
    //   }, [navigation, dispatch, "4hHb1KS5l0fqi9EOe4H9GmHufcn1"]);
    const dispatch: AppDispatch = useDispatch();

useEffect(() => {
  dispatch(fetchTasks());
}, [dispatch]);

const tasks = useSelector((state: RootState) => state.task.tasks);

useEffect(() => {
    console.log('Tasks from HOMEEEE:', tasks);

}, [tasks]);


    //   console.log('TASOOSSS', tasks)

    // const addTask = (task: ToDoTask) => {
    //     setTasks([...tasks, task]);
    // };

    // const updateTask = (updatedTask: ToDoTask) => {
    //     setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    // };

    // const deleteTask = (taskId: number) => {
    //     setTasks(tasks.filter(task => task.id !== taskId));  
    // };
    // const handleAddTask = (task) => {
    //     dispatch(addTask(userId, task));  // Dispatch action to add task
    // };

    // const handleUpdateTask = (task) => {
    //     dispatch(updateTask(userId, task));  // Dispatch action to update task
    // };

    const handleDeleteTask = (taskId) => {
        dispatch(deleteTask(taskId));  // Dispatch action to delete task
    };
    
    // const toggleTaskCompletion = (id: number) => {
    //     setTasks(tasks.map(task =>
    //         task.id === id ? { ...task, completed: !task.completed } : task
    //     ));
    // };

    const handleToggleTaskCompletion = async (taskId: string, completed: boolean) => {
        // Dispatch action
        const actionResult = await dispatch(toggleTaskCompletion(taskId));
    
        // If the action was not successful, revert the local state
        if (toggleTaskCompletion.rejected.match(actionResult)) {
          return !completed;
        }
    
        return completed;
      };
    
    
    const renderTaskItem = ({ item }) => (
        console.log('ITEM', item),
        <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => navigation.navigate('EditTask', { task: item, mode: 'edit'})}>
                <View style={styles.taskTextContainer}>
                    <Text style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}>
                        {item.title}
                    </Text>
                    <Text style={styles.taskId}>{item.id}</Text>
                </View>
            </TouchableOpacity>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleToggleTaskCompletion(item.id, item.completed)} >
                    {item.completed ? (
                        <Ionicons name="checkmark-circle" size={24} color="green" />
                    ) : (
                        <Ionicons name="ellipse-outline" size={24} color="gray" />
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                    <Ionicons name="trash-outline" size={24} color="red" style={styles.deleteIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    // if (loading) {
    //     return <ActivityIndicator size="large" color="#0000ff" />;
    // }

    // if (error) {
    //     return (
    //       <View>
    //         <Text>Error: {error}</Text>
    //         <Button title="Retry" onPress={() => dispatch(fetchTasks("4hHb1KS5l0fqi9EOe4H9GmHufcn1"))} />
    //       </View>
    //     );
    //   }

    const logout = async () => {
        try {
            await FIREBASE_AUTH.signOut();
            await AsyncStorage.removeItem('userId');
            navigation.navigate('Login');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={logout}>
                <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>

            <FlatList
                data={tasks}
                renderItem={renderTaskItem}
                keyExtractor={(item) => item && item.id ? item.id.toString() : ''}
                contentContainerStyle={styles.listContent}
            />

            <TouchableOpacity 
                style={styles.fab} 
                onPress={() => navigation.navigate('CreateTask', { mode: 'create', userId })}  // Pass 'create' mode here
            >
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: '#9b59b6',
        borderRadius: 10,
        padding: 10,
        zIndex: 10,
    },
    listContent: {
        paddingTop: 80, 
    },
    taskItem: {
        flexDirection: 'row',  
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    taskTextContainer: {
        flexDirection: 'column',
        flex: 1,  
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskTitleCompleted: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    taskId: {
        fontSize: 12,
        color: 'gray',
    },
    buttonContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: '#9b59b6',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    deleteIcon: {
        marginLeft: 10, 
    },
});