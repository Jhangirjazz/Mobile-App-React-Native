import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, ActivityIndicator, Image, Button, Touchable, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';




export default function Dashboard( {navigation}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [userData , SetUserData] = useState (null);
    
    const api = `http://3.109.176.31/SeePrime/APIS/SELECT.php?select_id=select_content&admin_portal=Y`
   

    const fetchData = async () => {
        try {
            const res = await axios.get(api);
            console.log(res.data); 
            setData(res.data); 
            setLoading(false); 
        } catch (e) {
            console.log(e, "Error fetching data");
            setError("Failed to fetch data");
            setLoading(false); 
        }
    };

    const getData = async ()=>{
        const data = await AsyncStorage.getItem('userdata') 
        if(data){
            SetUserData(JSON.parse(data))
        }
    }

 
    // Use useEffect to call fetchData when the component mounts
    useEffect(() => {
        getData();
        fetchData();
    }, []);

    // Render each row of the table
    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.CONTENT_ID}</Text>
            <Text style={styles.cell}>{item.TITLE}</Text>
            <Image source={{uri: `http://3.109.176.31/SeePrime/Content/Images/${item.THUMBNAIL_PATH}`}} width={100} height={100} resizeMode='cover' />
            <Text style={styles.cell}>{item.IS_PREMIUM}</Text>
            <Text style={styles.cell}>{item.FREE_TO_VIEW_TILL}</Text>
            <Text style={styles.cell}>{item.PARTWISE}</Text>
            <Text style={styles.cell}>{item.AGE_RATING}</Text>
            <Text style={styles.cell}>{item.SEEPRIME_ORIGINALS || 'N/A'}</Text>
            <Text style={styles.cell}>{item.PARTWISE || 'N/A'}</Text>
            

        </View>
    );

    // Show loading indicator while data is being fetched
    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Show error message if there's an error
    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <>
        <Header/>
            
            <View style={styles.container}>
            <View>
            
                        {
                            userData ? (
                                <>
                                    <Text style={styles.log}  >User Id: {userData.user_id}</Text>
                                    <Text style={styles.log} >User Name: {userData.user_name}</Text>
                                    <Text style={styles.log} >Subscription State : {userData.subscription_state}</Text>
                                </>
                            ): (
                                <Text>Loading Data...</Text>
                            )
                        }
            

                </View>
                <ScrollView horizontal>
                    <View>
                  
                        {/* Table Header */}
                        <View style={styles.header}>
                            <Text style={styles.headerCell}>ID</Text>
                            <Text style={styles.headerCell}>Title</Text>
                            <Text style={styles.headerCell}>Thumbnail</Text>
                            <Text style={styles.headerCell}>Premium</Text>
                            <Text style={styles.headerCell}>Date</Text>
                            <Text style={styles.headerCell}>Seasonal</Text>
                            <Text style={styles.headerCell}>Age Rating</Text>
                            <Text style={styles.headerCell}>See Prime</Text>
                            <Text style={styles.headerCell}>Partwise</Text>
                            
                        </View>
                        {/* Table Body */}
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.CONTENT_ID}
                            style={styles.flatList}
                        />
                    </View>
                </ScrollView>
                
            </View>
        </>
    );
}

const styles = StyleSheet.create({
     
    log:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        padding: 5,   
    },
    
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#1A237E',
        padding: 20,
    },
    headerCell: {
        width: 140, // Adjust width as needed
        color:'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#1A237E',
        padding: 10,
    },
    cell: {
        width: 150, // Adjust width as needed
        textAlign: 'center',
        fontSize: 16,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    flatList: {
        textAlign : 'center',
        width: '100%', 
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


});