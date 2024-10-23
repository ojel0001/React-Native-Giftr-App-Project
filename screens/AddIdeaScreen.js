import React, { useContext, useState, useEffect } from "react";
import {
  TextInput,
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  Alert,
} from "react-native";
import PeopleContext from "../PeopleContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { randomUUID } from "expo-crypto"; 

export default function AddIdeaScreen() {
  const [ideaText, setIdeaText] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const { addIdea } = useContext(PeopleContext);
  const route = useRoute();
  const navigation = useNavigation();
  const { personId } = route.params;

  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);

  
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const saveIdea = () => {
    if (ideaText && imageUri) {
      const newIdea = {
        id: randomUUID(),
        text: ideaText,
        img: imageUri, 
      };
      addIdea(personId, newIdea);
      navigation.goBack();
    } else {
      Alert.alert("Error", "Please provide both idea text and an image.");
    }
  };

  const pickImage = async () => {
    if (!galleryPermission) {
      Alert.alert("Error", "Permission to access gallery is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    if (!cameraPermission) {
      Alert.alert("Error", "Permission to access camera is required.");
      return;
    }

    if (cameraRef) {
      let photo = await cameraRef.takePictureAsync();
      setImageUri(photo.uri);
      setIsCameraVisible(false); 
    }
  };

  if (cameraPermission === null || galleryPermission === null) {
    return <View />;
  }
  if (!cameraPermission || !galleryPermission) {
    return <Text>No access to camera or gallery.</Text>;
  }

  return (
    <View style={styles.container}>
      {isCameraVisible ? (
        <View style={styles.cameraContainer}>
          <Camera style={{ flex: 1 }} ref={(ref) => setCameraRef(ref)} />
          <Button title="Take Photo" onPress={takePicture} />
          <Button title="Cancel" onPress={() => setIsCameraVisible(false)} />
        </View>
      ) : (
        <>
          <TextInput
            placeholder="Enter idea"
            value={ideaText}
            onChangeText={setIdeaText}
            style={styles.input}
          />
          <Button title="Pick Image from Gallery" onPress={pickImage} />
          <Button
            title="Take Photo with Camera"
            onPress={() => setIsCameraVisible(true)}
          />
          {imageUri && (
            <>
              <Text>Image selected!</Text>
              <Image source={{ uri: imageUri }} style={styles.image} />
            </>
          )}
          <Button title="Save Idea" onPress={saveIdea} />
          <Button title="Cancel" onPress={() => navigation.goBack()} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});