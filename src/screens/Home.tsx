import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetch_tasks, toggleTaskCompletion } from '../redux/tasks/tasks.actions';
import { AppDispatch, RootState } from '../redux/store';
import { logoutUser } from '../redux/user/user.actions';
import TaskItem from '../components/TaskItem';
import { RootStackParamList } from '../types/navigationTypes';
import APP_CONSTANTS from '../constants';

interface RouterProps {
    navigation: NavigationProp<any, any>;
    route: RouteProp<RootStackParamList, 'Home'>;
}

const Home = ({ navigation, route }: RouterProps) => {
    const { userId } = route.params;
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                await dispatch(fetch_tasks(userId));
            } catch (error) {
                console.error(error);
            }
        };

        fetchTasks();
    }, [dispatch, userId]);


    const handleDeleteTask = (taskId) => {
        dispatch(deleteTask({taskId, userId})); 
    };

    const handleToggleTaskCompletion = async (taskId: string, completed: boolean) => {
        const actionResult = await dispatch(toggleTaskCompletion({taskId, userId}));
        if (toggleTaskCompletion.rejected.match(actionResult)) {
          return !completed;
        }
        return completed;
    };

    const handleLogout = () => {
        dispatch(logoutUser()); 
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>

            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <TaskItem 
                        item={item} 
                        navigation={navigation} 
                        handleToggleTaskCompletion={handleToggleTaskCompletion}
                        handleDeleteTask={handleDeleteTask}
                        userId={userId} 
                    />
                )}
                keyExtractor={(item) => item.id}
                extraData={(item) => item.completed}
                contentContainerStyle={styles.listContent}
            />

            <TouchableOpacity 
                style={styles.fab} 
                onPress={() => navigation.navigate('CreateTask', { mode: APP_CONSTANTS.TASK_FORM_MODE_CREATE, userId })}  // Pass 'create' mode here
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