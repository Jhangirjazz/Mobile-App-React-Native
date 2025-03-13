import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function Header() {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);
    
   

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLogOut = async () =>{
        try {
            await AsyncStorage.removeItem('userdata');
            setMenuVisible(false);
            navigation.navigate('Login')
        }
        catch (error){   
              console.log('Error During Logout', error)  
        }
    };


    return (
        <>
            
            <View style={styles.container}>
                {/* Column 1: Logo */}
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: "https://realcoresolutions.com/wp-content/uploads/2023/08/About-Pic.png" }}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                {/* Column 2: RCS Text */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>RCS</Text>
                </View>

                {/* Column 3: Burger Menu */}
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                        <View style={styles.menuLine} />
                    </TouchableOpacity>
                </View>

                {/* Menu Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={menuVisible}
                    onRequestClose={() => setMenuVisible(false)}
                >
                    <SafeAreaView style={styles.menuModal}>
                        <View style={styles.menuContent}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setMenuVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>✕</Text>
                            </TouchableOpacity>
                            <Text style={styles.menuItem}>Home</Text>
                            <Text style={styles.menuItem}>About</Text>
                            <Text style={styles.menuItem}>Services</Text>
                            <Text style={styles.menuItem}>Contact</Text>
                            <TouchableOpacity style={styles.logout} onPress={handleLogOut} >
                                                    <Text style={styles.ButtonText}>Logout</Text>
                                        </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
  
    container: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#1A237E',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        width: 60,
        height: 80,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        
    },
    menuContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    menuButton: {
        padding: 10,
    },
    menuLine: {
        width: 25,
        height: 3,
        backgroundColor: 'white',
        marginVertical: 3,
        borderRadius: 1,
    },
    menuModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    menuContent: {
        width: '70%',
        height: '100%',
        backgroundColor: '#fff',
        alignSelf: 'flex-end',
        padding: 20,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    closeButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    menuItem: {
        fontSize: 18,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    logout:{
        backgroundColor: '#ff4444', 
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 20,

    },
    ButtonText:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',

    },

})