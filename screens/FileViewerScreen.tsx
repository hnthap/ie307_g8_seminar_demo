import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import { useState } from "react";
import { Alert, Platform, Text, View } from "react-native";
import { ButtonRow } from "../components";
import { commonStyles } from "../styles";

export function FileViewerScreen() {
  const [fileInfo, setFileInfo] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);

  function selectFile() {
    DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: false,
    })
      .then(({ canceled, assets }) => {
        if (canceled) {
          Alert.alert("INFO", "Canceled.");
          setFileInfo(null);
        } else {
          setFileInfo(assets[0]);
        }
      })
      .catch((reason) => {
        Alert.alert("ERROR", reason);
      });
  }

  function reset() {
    setFileInfo(null);
  }

  function pickFile() {
    if (fileInfo !== null) {
      FileSystem.getContentUriAsync(fileInfo.uri).then((data) => {
        if (Platform.OS === "ios") {
          Alert.alert("ERROR", "iOS is not supported.");
        } else {
          IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
            data,
            flags: 1,
            type: "application/pdf",
          });
        }
      });
    } else {
      Alert.alert("ERROR", "Please select a file first.");
    }
  }

  return (
    <View style={commonStyles.subAppContainer}>
      <Text style={commonStyles.fancyText}>
        {fileInfo === null
          ? "Click SELECT to select a PDF file."
          : "You selected a file! Click OPEN to view it."}
      </Text>
      <ButtonRow
        propsList={[
          { title: "SELECT", onPress: selectFile },
          { title: "RESET", onPress: reset },
          { title: "OPEN", onPress: pickFile },
        ]}
      />
    </View>
  );
}
