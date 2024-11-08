import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, View } from "react-native";
import { ButtonRow, ImageBox } from "../components";
import { commonStyles } from "../styles";

export function ImagePickerScreen() {
  const [uri, setUri] = useState<string | null>(null);

  const pickerOptions: ImagePicker.ImagePickerOptions = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    aspect: [1, 1],
    quality: 1,
    allowsEditing: true,
  };

  function pickImage() {
    ImagePicker.launchImageLibraryAsync(pickerOptions)
      .then(({ assets, canceled }) => {
        if (!canceled) {
          setUri(assets[0].uri);
        }
      })
      .catch((reason) => Alert.alert("Failed to pick", reason));
  }

  function captureImage() {
    ImagePicker.launchCameraAsync(pickerOptions)
      .then(({ assets, canceled }) => {
        if (!canceled) {
          setUri(assets[0].uri);
        }
      })
      .catch((reason) => Alert.alert("Failed to capture", reason));
  }

  return (
    <View style={commonStyles.subAppContainer}>
      <ImageBox uri={uri} placeholder="Press PICK or CAPTURE to start" />
      <ButtonRow
        propsList={[
          { title: "PICK", onPress: pickImage },
          { title: "CAPTURE", onPress: captureImage },
          { title: "CLEAR", onPress: () => setUri(null) },
        ]}
      />
    </View>
  );
}
