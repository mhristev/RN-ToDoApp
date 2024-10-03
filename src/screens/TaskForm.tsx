import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import ToDoTask from '../models/Task';
import { addTask, updateTask } from '../redux/actions';
import { AppDispatch } from '../redux/store';
// import { addTask} from '../redux/tasks/taskActions';

interface TaskFormProps {
    navigation: NavigationProp<any, any>;
    route: RouteProp<{ params: { task?: { id: number; title: string; details: string; completed: boolean }; mode: 'edit' | 'create' } }, 'params'>;
    addTask?: (task: { title: string; details: string; id: number; completed: boolean }) => void;
    updateTask?: (task: { id: number; title: string; details: string }) => void;
}

const TaskForm = ({ navigation, route }: TaskFormProps) => {
    const { userId, task, mode} = route.params as unknown as { userId: string; task?: { id: string; title: string; details: string; completed: boolean }; mode: 'edit' | 'create' };
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const dispatch: AppDispatch = useDispatch();
    console.log("TaskForm userId 11111", userId);

    useEffect(() => {
        if (mode === 'edit' && task) {
            setTitle(task.title);
            setDetails(task.details);
        }
    }, [mode, task]);

    const handleAddTask = (newTask: ToDoTask) => {
        dispatch(addTask(newTask));
    };

    const handleEditTask = (updatedTask: ToDoTask) => {
        dispatch(updateTask(updatedTask));
    };

    const saveTask = async () => {
        if (title && details) {
            if (mode === 'create') {
                const newTask = {
                    id: Date.now().toString(), 
                    title: title,
                    details: details,
                    completed: false
                };
                handleAddTask(newTask);
                
                //await dispatch(addTask(userId, newTask));  // Use dispatch here
                // addTask && addTask(newTask);  
            } else if (mode === 'edit') {
                const updatedTask = { ...task, title, details };
                console.log("Updated task", updatedTask);
                handleEditTask(updatedTask);
                // updateTask && updateTask(updatedTask); 
            }
            if (navigation.canGoBack()) {
                navigation.goBack();
            }
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