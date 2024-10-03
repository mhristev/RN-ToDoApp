import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TaskItem = ({ item, navigation, updateTask, deleteTask, toggleTaskCompletion }) => (
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
});