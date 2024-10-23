//addPersonScreen
import React, { useContext, useState } from "react";
import { StyleSheet, View, TextInput, Button, Alert } from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-modern-datepicker";
import { randomUUID } from "expo-crypto"; 

export default function AddPersonScreen() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const { addPerson } = useContext(PeopleContext);
  const navigation = useNavigation();

  const savePerson = () => {
    if (name && dob) {
      
      const newPerson = {
        id: randomUUID(),
        name,
        dob,
        ideas: [],
      };
      addPerson(newPerson);
      navigation.goBack();
    } else {
      
      Alert.alert(
        "Validation Error",
        "Please enter both a name and a date of birth."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <DatePicker
        mode="calendar"
        onSelectedChange={setDob}
        style={styles.datePicker}
      />

      <Button title="Save" onPress={savePerson} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
  datePicker: {
    marginBottom: 12,
  },
});