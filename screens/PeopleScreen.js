import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PeopleContext from "../PeopleContext";

export default function PeopleScreen() {
  const navigation = useNavigation();
  const { people, deletePerson } = useContext(PeopleContext);

  const navigateToIdeaScreen = (personId) => {
    navigation.navigate("Ideas", { personId });
  };

  const confirmDeletePerson = (personId) => {
    Alert.alert(
      "Delete Person",
      "Are you sure you want to delete this person?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deletePerson(personId),
        },
      ]
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {people.length === 0 ? (
          <Text style={styles.emptyText}>
            Nothing Was Saved Here. Please Add A Person.
          </Text>
        ) : (
          
          <View style={[styles.gridContainer, styles.shadowProp ]}>
            {people.map((item) => (
              <View key={item.id} style={styles.personContainer}>
                <TouchableOpacity
                  style={styles.personButton}
                  onPress={() => navigateToIdeaScreen(item.id)}
                >
                  <Text style={styles.buttonText}>
                    {`${item.name} (${item.dob})`}
                  </Text>
                </TouchableOpacity>

                
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => confirmDeletePerson(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
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
  gridContainer: {
    margin: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  personContainer: {
    width: "48%",
    marginBottom: 20,
    alignItems: "center",
  },
  personButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: "#dc3545",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#28a745",
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    justifyContent: "bottom",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    color: "#6c757d",
    marginTop: 20,
  },

  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});