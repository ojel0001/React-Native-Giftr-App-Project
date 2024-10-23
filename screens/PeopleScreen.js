import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PeopleContext from "../PeopleContext";

export default function PeopleScreen() {
  const navigation = useNavigation();
  const { people } = useContext(PeopleContext);

  const navigateToIdeaScreen = (personId) => {
    navigation.navigate("Ideas", { personId });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {people.length === 0 ? (
          <Text style={styles.emptyText}>
            Nothing Was Saved Here. Please Add A Person.
          </Text>
        ) : (
          <FlatList
            data={people}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.container}>
                
                <TouchableOpacity
                  style={styles.personButton}
                  onPress={() => navigateToIdeaScreen(item.id)}
                >
                  <Text
                    style={styles.buttonText}
                  >{`${item.name} (${item.dob})`}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddPerson")}
        >
          <Text style={styles.buttonText}>Add Person</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa", 
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  personButton: {
    backgroundColor: "#007bff", 
    padding: 12,
    width: "100%", 
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#28a745", 
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", 
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#6c757d", 
    marginTop: 20,
  },
});
