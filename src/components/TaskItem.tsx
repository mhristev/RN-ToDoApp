import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import APP_CONSTANTS from '../constants';

const TaskItem = ({ item, navigation, handleToggleTaskCompletion, handleDeleteTask, userId }) => (
    <View style={styles.taskItem}>
        <TouchableOpacity onPress={() => navigation.navigate(APP_CONSTANTS.STACK_NAVIGATION_SCREEN_EDIT_TASK, { task: item, mode: APP_CONSTANTS.TASK_FORM_MODE_EDIT, userId })}>
            <View style={styles.taskTextContainer}>
                <Text style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}>
                    {item.title}
                </Text>
                <Text style={styles.taskId}>{item.details}</Text>
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

export default TaskItem;

const styles = StyleSheet.create({
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
    deleteIcon: {
        marginLeft: 10,
    },
});