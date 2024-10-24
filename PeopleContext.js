import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const loadPeople = async () => {
      const storedPeople = await AsyncStorage.getItem("people");
      if (storedPeople) {
        setPeople(JSON.parse(storedPeople));
      }
    };
    loadPeople();
  }, []);

  const savePeople = async (updatedPeople) => {
    setPeople(updatedPeople);
    await AsyncStorage.setItem("people", JSON.stringify(updatedPeople));
  };

  const addPerson = (person) => {
    const updatedPeople = [...people, person];
    savePeople(updatedPeople);
  };

   const deletePerson = (personId) => {
     setPeople(people.filter((person) => person.id !== personId));
   };

  const addIdea = (personId, idea) => {
    const updatedPeople = people.map((person) =>
      person.id === personId
        ? { ...person, ideas: [...person.ideas, idea] }
        : person
    );
    savePeople(updatedPeople);
  };

  return (
    <PeopleContext.Provider
      value={{ people, addPerson, addIdea, deletePerson }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleContext;