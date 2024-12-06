import React, { useState } from 'react';
import { datasource } from "./Data";
import { TextInput, View, Text, Button, Alert } from "react-native";

const Edit = ({ navigation, route }) => {
    const { index, type, key } = route.params;
    const [idols, setIdols] = useState(key);

    const sectionIndex = datasource.findIndex(section => section.title === type);

    if (sectionIndex === -1) {
        Alert.alert("Error", "Invalid Idol group.");
        navigation.navigate("Home");
        return null;
    }

    const isValidIndex = index >= 0 && index < datasource[sectionIndex].data.length;

    const saveChanges = () => {
        if (!isValidIndex) {
            Alert.alert("Error", "Invalid Idol index.");
            return;
        }

        const updatedDatasource = [...datasource];
        updatedDatasource[sectionIndex].data[index].name = idols;

        datasource.splice(0, datasource.length, ...updatedDatasource);
        navigation.navigate("Home");
    };

    const deleteIdols = () => {
        if (!isValidIndex) {
            Alert.alert("Error", "Invalid Idol index.");
            return;
        }

        Alert.alert("Are you sure?", "This will permanently delete the Idol.", [
            {
                text: "Yes",
                onPress: () => {
                    const updatedDatasource = [...datasource];
                    updatedDatasource[sectionIndex].data.splice(index, 1);

                    datasource.splice(0, datasource.length, ...updatedDatasource);

                    navigation.navigate("Home");
                },
            },
            { text: "No" },
        ]);
    };

    return (
        <View>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Idol:</Text>
                <TextInput
                    value={idols}
                    style={{ borderWidth: 1 }}
                    onChangeText={(text) => setIdols(text)}
                />
            </View>
            <View>
                <Button
                    style={{ flex: 1, margin: 10 }}
                    title="Save"
                    onPress={saveChanges}
                />
                <Button
                    style={{ flex: 1, margin: 10 }}
                    title="Delete"
                    onPress={deleteIdols}
                />
            </View>
        </View>
    );
};

export default Edit;
