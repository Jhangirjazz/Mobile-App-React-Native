import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';




export default function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
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

    // Use useEffect to call fetchData when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Render each row of the table
    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.CONTENT_ID}</Text>
            <Text style={styles.cell}>{item.TITLE}</Text>
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
            
            <View style={styles.container}>
                <ScrollView horizontal>
                    <View>
                        {/* Table Header */}
                        <View style={styles.header}>
                            <Text style={styles.headerCell}>ID</Text>
                            <Text style={styles.headerCell}>Title</Text>
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
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#10a209',
        padding: 16,
    },
    headerCell: {
        width: 150, // Adjust width as needed
        color:'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#10a209',
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
        width: '100%', // Ensure FlatList takes full width
    },
});