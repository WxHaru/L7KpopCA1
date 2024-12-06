import React, { useState } from 'react';
import { Alert, TextInput, View, Text, Button } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { datasource } from "./Data";

const Add = ({ navigation }) => {
    const [idols, setIdols] = useState('');
    const [type, setType] = useState('Fire');
    const [image, setImage] = useState('');

    const handleSubmit = () => {
        // Basic input validation
        if (!idols.trim() || !image.trim()) {
            Alert.alert("Error", "Please fill in both Idol name and image URL.");
            return;
        }

        // Ensure the type exists in the datasource
        const typeSection = datasource.find(
            (section) => section.title.toLowerCase() === type.toLowerCase()
        );

        if (typeSection) {
            // Add new idol to the correct section
            typeSection.data.push({ name: idols, cardImage: image });
            Alert.alert("Success", `${idols} has been added.`);
            navigation.navigate('Home');
        } else {
            Alert.alert("Error", `Type "${type}" not found in datasource. Please check the type.`);
        }
    };

    return (
        <View style={{ padding: 10 }}>
            {/* Input for Idol Group */}
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Idol Group:</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 8, borderRadius: 5 }}
                    placeholder="Enter Idol group"
                    onChangeText={(text) => setIdols(text)}
                />
            </View>

            {/* Input for Image URL */}
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Image URL:</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 8, borderRadius: 5 }}
                    placeholder="Enter Image URL"
                    onChangeText={(text) => setImage(text)}
                />
            </View>

            {/* Picker for Idol Generation */}
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Generation:</Text>
                <RNPickerSelect
                    value={type}
                    onValueChange={(value) => setType(value)}
                    items={[
                        { label: "1st Gen", value: "1st Gen" },
                        { label: "2nd Gen", value: "2nd Gen" },
                        { label: "3rd Gen", value: "3rd Gen" },
                        { label: "4th Gen", value: "4th Gen" },
                        { label: "5th Gen", value: "5th Gen" },
                    ]}
                />
            </View>

            {/* Submit Button */}
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

export default Add;
