import React, { useContext } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import PeopleContext from "../PeopleContext";

export default function IdeaScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { personId } = route.params;
  const { people } = useContext(PeopleContext);

  const person = people.find((p) => p.id === personId);

  if (!person) {
    return <Text style={styles.errorText}>Person not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ideas for {person.name}</Text>

      {person.ideas && person.ideas.length > 0 ? (
        <FlatList
          data={person.ideas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.ideaContainer}>
              <Text style={styles.ideaText}>{item.text}</Text>
              {item.img && (
                <Image source={{ uri: item.img }} style={styles.ideaImage} />
              )}
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.noIdeasText}>
          No ideas available. Add some ideas!
        </Text>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddIdea", { personId })}
      >
        <Text style={styles.addButtonText}>Add Idea</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#343a40",
  },
  ideaContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ideaText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#495057",
  },
  ideaImage: {
    width: "100%",
    height: 200, 
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
  noIdeasText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#28a745",
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  errorText: {
    fontSize: 18,
    color: "#dc3545",
    textAlign: "center",
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 80,
  },
});