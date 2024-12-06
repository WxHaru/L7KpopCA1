import React, { useState } from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Image, Alert} from 'react-native';
import {datasource} from './Data';

const styles = StyleSheet.create({
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        borderWidth: 1,
    },
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: 'pink',
        marginTop: 40,
    },
    sectionContainer: {
        marginBottom: 20,
    },
    opacityStyle: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
    },
    cardImage: {
        width: 350,
        height: 250,
        borderRadius: 8,
    },
    addButton: {
        marginTop: 20,
    },
    inputContainer: {
        marginVertical: 20,
    },
    textInput: {
        borderWidth: 1,
        padding: 8,
        borderRadius: 5,
        marginBottom: 10,
    },
});

const Home = ({ navigation }) => {
    const [groups, setGroups] = useState(datasource);

    const calculateTotalGroups = () => {
        return groups.reduce((total, section) => total + section.data.length, 0);
    };

    const handleViewTotalGroups = () => {
        const totalGroups = calculateTotalGroups();
        Alert.alert('Total Groups', ` You currently have ${totalGroups} groups!`);
    };

    const renderItem = ({item, index, section}) => {
        return (
            <TouchableOpacity style={styles.opacityStyle}
                              onPress={() => {navigation.navigate('Edit' , {index: index, type:section.title, key:item.name})}}
            >

                <Text style={styles.textStyle}>{item.name}</Text>
                <Image source={{ uri: item.cardImage }} style={styles.cardImage} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true}/>
            <Button title='Add Idol Groups'
                    onPress={() => {
                        navigation.navigate('Add')
                    }}/>

            <View style={{ height: 20 }}></View>

            <SectionList sections={datasource}
                         keyExtractor={(item, index) => item.name + index}
                         renderItem={renderItem}
                         renderSectionHeader={({ section: { title, bgColor }})=>(
                             <Text style={[styles.headerText,{ backgroundColor:bgColor }]}>
                                 {title}
                             </Text>
                         )}/>
            <Button title="View Total Groups" onPress={handleViewTotalGroups} />
            <View style={{ height: 20 }} />

        </View>
    );
};

export default Home;
