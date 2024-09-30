import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import Task from '../models/Task';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Home = ({ navigation }: RouterProps) => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'test task 1', details: 'Details for task 1', completed: true },
        { id: 2, title: 'Task 2', details: 'Details for task 2', completed: false },
        { id: 3, title: 'Task 3', details: 'Details for task 3', completed: false },
        { id: 4, title: 'Task 4', details: 'Details for task 4', completed: false },
    ]);

    const addTask = (task: Task) => {
        setTasks([...tasks, task]);
    };

    const updateTask = (updatedTask: Task) => {
        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    };

    const deleteTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId));  
    };

    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const renderTaskItem = ({ item }: { item: Task }) => (
        <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => navigation.navigate('EditTask', { task: item, mode: 'edit', updateTask, deleteTask })}>
                <View style={styles.taskTextContainer}>
                    <Text style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}>
                        {item.title}
                    </Text>
                    <Text style={styles.taskId}>{item.id}</Text>
                </View>
            </TouchableOpacity>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
                    {item.completed ? (
                        <Ionicons name="checkmark-circle" size={24} color="green" />
                    ) : (
                        <Ionicons name="ellipse-outline" size={24} color="gray" />
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                    <Ionicons name="trash-outline" size={24} color="red" style={styles.deleteIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>

            <FlatList
                data={tasks}
                renderItem={renderTaskItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
            />

            <TouchableOpacity 
                style={styles.fab} 
                onPress={() => navigation.navigate('CreateTask', { mode: 'create', addTask })}  // Pass 'create' mode here
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
    logoutButton: {
        position: 'absolute',
        bottom: 90,
        right: 20,
    },
    logoutText: {
        color: '#9b59b6',
        fontWeight: 'bold',
    },
    deleteIcon: {
        marginLeft: 10, 
    },
});