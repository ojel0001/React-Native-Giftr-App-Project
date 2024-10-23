import React, { useContext } from "react";
import { Text, View, FlatList, Button, Image, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import PeopleContext from "../PeopleContext";

export default function IdeaScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { personId } = route.params;
  const { people } = useContext(PeopleContext);

  const person = people.find((p) => p.id === personId);

  if (!person) {
    return <Text>Person not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>Ideas for {person.name}</Text>

      {person.ideas && person.ideas.length > 0 ? (
        <FlatList
          data={person.ideas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.ideaContainer}>
              <Text>{item.text}</Text>
              {item.img ? (
                <Image source={{ uri: item.img }} style={styles.image} />
              ) : (
                <Text>No image for this idea.</Text>
              )}
            </View>
          )}
        />
      ) : (
        <Text>No ideas available. Add some ideas!</Text>
      )}

      <Button
        title="Add Idea"
        onPress={() => navigation.navigate("AddIdea", { personId })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  ideaContainer: {
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});