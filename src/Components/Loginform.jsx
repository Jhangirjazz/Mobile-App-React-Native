import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';

const Loginform = ({ navigation }) => {

    const nav = useNavigation();

    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 

    
    const validateusername = (username) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(username);
    };

    
    const handleLogin = async () => {
        if (!username && !password) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        } else if (!username) {
            Alert.alert('Error', 'Please fill in your username address.');
            return;
        } else if (!password) {
            Alert.alert('Error', 'Please fill in your password.');
            return;
        }
    
        setLoading(true);
    
        try {
            const response = await axios.get(`http://3.109.176.31/SeePrime/APIS/SELECT.php?&select_id=select_users_by_name_and_pass&admin_portal=N&username=${username}&password=${password}`);
    
            console.log("API Response:", response.data);
    
            if (response.data.state === "Success") {
                 await AsyncStorage.setItem('userdata', JSON.stringify({
                    user_id: response.data.user_id,
                    user_name: response.data.user_name,
                    subscription_state: response.data.subscription_state,
                 }))    

                Alert.alert('Success', 'Login successful!');
                nav.navigate('dash'); 
            } else {
                Alert.alert('Error', response.data.message || 'Invalid username or password');
            }
        } catch (error) {
            console.error('Login Error:', error.response?.data || error.message);
            Alert.alert('Error', error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <View style={style.topbar}>
                          <Text style={style.topbarText}>RealCore Solutions</Text>
                      </View>   

        <View style={style.container}>
            <Text style={style.heading}>Login</Text>

          
          
          
            <TextInput
                style={style.input}
                placeholder="username"
                value={username}
                onChangeText={setusername}
                keyboardType="default"
                autoCapitalize="none"
                placeholderTextColor="#999"
            />

           
            <TextInput
                style={style.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999"
            />

            
            <TouchableOpacity
                style={style.button}
                onPress={handleLogin}
                disabled={loading} 
            >
                <Text style={style.buttonText}>
                    {loading ? 'Logging in...' : 'Login'}
                </Text>
            </TouchableOpacity>
        </View>
        
        </>
    );
};

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        backgroundColor: '#f0f0f0',
    },

    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },

    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
    },

    button: {
        backgroundColor: '#1A237E',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    topbar: {
        backgroundColor: "#1A237E",
        paddingVertical: 22
    },
    topbarText: {
        color: "white",
        fontSize: 22,
        textAlign: "center",
        fontWeight: "800",
    },
});

export default Loginform;