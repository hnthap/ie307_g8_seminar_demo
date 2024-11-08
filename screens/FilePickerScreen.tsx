import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { ButtonRow, ImageBox } from "../components";
import { commonStyles } from "../styles";

export function FilePickerScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  function pickFile() {
    DocumentPicker.getDocumentAsync({ type: "image/*", multiple: false })
      .then(({ canceled, assets }) => {
        if (canceled) {
          Alert.alert("INFO", "Canceled.");
        } else {
          setImageUri(assets[0].uri);
        }
      })
      .catch((reason) => {
        Alert.alert("ERROR", reason);
      });
  }

  function clearImage() {
    setImageUri(null);
  }

  return (
    <View style={commonStyles.subAppContainer}>
      {imageUri !== null && (
        <Text style={commonStyles.fancyText}>
          You selected an image! Good job!
        </Text>
      )}
      <ImageBox uri={imageUri} />
      <ButtonRow
        propsList={[
          { title: "OPEN", onPress: pickFile },
          { title: "CLEAR", onPress: clearImage },
        ]}
      />
    </View>
  );
}
