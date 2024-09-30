import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';

interface TaskFormProps {
    navigation: NavigationProp<any, any>;
    route: RouteProp<{ params: { task?: { id: number; title: string; details: string; completed: boolean }; mode: 'edit' | 'create' } }, 'params'>;
    addTask?: (task: { title: string; details: string; id: number; completed: boolean }) => void;
    updateTask?: (task: { id: number; title: string; details: string }) => void;
}

const TaskForm = ({ navigation, route, addTask, updateTask }: TaskFormProps) => {
    const { task, mode} = route.params;
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');

    useEffect(() => {
        if (mode === 'edit' && task) {
            setTitle(task.title);
            setDetails(task.details);
        }
    }, [mode, task]);

    const saveTask = () => {
        if (title && details) {
            if (mode === 'create') {
                const newTask = {
                    id: Date.now(), 
                    title: title,
                    details: details,
                    completed: false
                };
                addTask && addTask(newTask);  
            } else if (mode === 'edit') {
                const updatedTask = { ...task, title, details };
                updateTask && updateTask(updatedTask); 
            }
            navigation.goBack();  
        } else {
            alert('Please fill out both fields.');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{mode === 'create' ? 'Add New Task' : 'Edit Task'}</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Task Title"
                placeholderTextColor="#ccc"
            />
            <TextInput
                style={styles.input}
                value={details}
                onChangeText={setDetails}
                placeholder="Task Description"
                placeholderTextColor="#ccc"
                multiline
            />
            <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
                <Text style={styles.saveButtonText}>{mode === 'create' ? 'Save' : 'Update'}</Text>
            </TouchableOpacity>

        </View>
    );
};

export default TaskForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
    },
    saveButton: {
        backgroundColor: '#007bff', 
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: '#ff4444', 
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});