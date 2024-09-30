import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const auth = FIREBASE_AUTH;


    const signIn = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            alert(e.message);
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <Text style={styles.title}>{isRegister ? 'Create account' : 'Log in'}</Text>
                <TextInput 
                    value={email} 
                    style={styles.input} 
                    placeholder="Email" 
                    autoCapitalize='none' 
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput 
                    value={password} 
                    style={styles.input} 
                    placeholder="Password" 
                    autoCapitalize='none' 
                    onChangeText={(text) => setPassword(text)} 
                    secureTextEntry={true}
                />
                {loading ? 
                    <ActivityIndicator size="large" color="#0000ff" /> 
                : 
                    <>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={isRegister ? signUp : signIn}
                        >
                            <Text style={styles.buttonText}>{isRegister ? 'Sign Up' : 'Sign In'}</Text>
                        </TouchableOpacity>

                        <View style={styles.signupContainer}>
                            {isRegister ? (
                                <Text style={styles.signupText}>Already have an account?</Text>
                            ) : (
                                <Text style={styles.signupText}>No account?</Text>
                            )}
                            <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
                                <Text style={styles.signupLink}>{isRegister ? ' Log in' : ' Sign up'}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </KeyboardAvoidingView>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
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