import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser, signUpUser } from '../redux/user/user.actions';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.user);

    const handleSignIn = () => {
        dispatch(signInUser({ email, password }));
    };

    const handleSignUp = () => {
        dispatch(signUpUser({ email, password }));
    };

    return (
        <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
            <Text style={styles.title}>{isRegister ? 'Create account' : 'Log in'}</Text>
            <TextInput 
                value={email} 
                style={styles.input} 
                placeholder="Email" 
                autoCapitalize='none' 
                onChangeText={setEmail}
            />
            <TextInput 
                value={password} 
                style={styles.input} 
                placeholder="Password" 
                autoCapitalize='none' 
                onChangeText={setPassword} 
                secureTextEntry={true}
            />
            {loading ? 
                <ActivityIndicator size="large" color="#0000ff" /> 
            : 
                <>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={isRegister ? handleSignUp : handleSignIn}
                    >
                        <Text style={styles.buttonText}>{isRegister ? 'Sign Up' : 'Sign In'}</Text>
                    </TouchableOpacity>

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>{isRegister ? 'Already have an account?' : 'No account?'}</Text>
                        <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
                            <Text style={styles.signupLink}>{isRegister ? ' Log in' : ' Sign up'}</Text>
                        </TouchableOpacity>
                    </View>
                </>
            }
            {error && <Text style={styles.errorText}>{error}</Text>}
        </KeyboardAvoidingView>
    </View>
        )
}

export default Login;

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        marginVertical: 10,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#9b59b6',  
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    signupText: {
        color: '#000',
    },
    signupLink: {
        color: '#3498db', 
        marginLeft: 5,
    },
});
