import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import ToDoTask from '../models/ToDoTask';
import { addTask, updateTask } from '../redux/tasks/tasks.actions';
import { AppDispatch } from '../redux/store';
import uuid from 'react-native-uuid';
import APP_CONSTANTS from '../constants';

interface TaskFormProps {
    navigation: NavigationProp<any, any>;
    route: RouteProp<{ params: RouteParams }, 'params'>;
}

interface RouteParams {
    userId: string;
    task: ToDoTask;
    mode: typeof APP_CONSTANTS.TASK_FORM_MODE_EDIT | typeof APP_CONSTANTS.TASK_FORM_MODE_CREATE;
  }

const TaskForm = ({ navigation, route }: TaskFormProps) => {
    const { userId, task, mode } = route.params as RouteParams;
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (mode === APP_CONSTANTS.TASK_FORM_MODE_EDIT && task) {
            setTitle(task.title);
            setDetails(task.details);
        }
    }, [mode, task]);

    const handleAddTask = () => {
        const task: ToDoTask = {
            id: uuid.v4().toString(), 
            title: title,
            details: details,
            completed: false
        };
        dispatch(addTask({task, userId}));
    };

    const handleUpdateTask = () => {
        const updatedTask = { ...task, title, details };
        dispatch(updateTask({updatedTask, userId}));
    };

    const saveTask = async () => {
        if (!title || !details) {
            alert('Please fill out both fields.');
            return;
        }

        mode === APP_CONSTANTS.TASK_FORM_MODE_CREATE ? handleAddTask() : handleUpdateTask();

        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}> 
                {
                    mode === APP_CONSTANTS.TASK_FORM_MODE_CREATE ? 
                            APP_CONSTANTS.TASK_FORM_CREATE_TITLE : APP_CONSTANTS.TASK_FORM_EDIT_TITLE
                }
            </Text>
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
                <Text style={styles.saveButtonText}>
                    {
                        mode === APP_CONSTANTS.TASK_FORM_MODE_CREATE ? 
                                    APP_CONSTANTS.TASK_FORM_SAVE : APP_CONSTANTS.TASK_FORM_UPDATE
                    }
                </Text>
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