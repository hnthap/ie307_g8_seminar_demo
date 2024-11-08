import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  FilePickerScreen,
  FileViewerScreen,
  HtmlPrinterScreen,
  ImagePickerScreen,
} from "./screens";
import { StatusBar } from "expo-status-bar";

const SUB_APP_NAMES = [
  "File Picker",
  "File Viewer",
  "Image Picker",
  "HTML Printer",
] as const;

type SubAppName = (typeof SUB_APP_NAMES)[number];

export default function App() {
  const [subAppName, setSubAppName] = useState<SubAppName>("HTML Printer");
  return (
    <View style={styles.container}>
      <StatusBar style="inverted" translucent={false} />
      <Picker
        style={styles.picker}
        selectedValue={subAppName}
        onValueChange={(name) => setSubAppName(name)}
      >
        {SUB_APP_NAMES.map((name, index) => (
          <Picker.Item key={index} label={name} value={name} />
        ))}
      </Picker>
      <SubApp name={subAppName} />
    </View>
  );
}

function SubApp({ name }: { name: SubAppName }) {
  if (name === "File Picker") {
    return <FilePickerScreen />;
  }
  if (name === "File Viewer") {
    return <FileViewerScreen />;
  }
  if (name === "Image Picker") {
    return <ImagePickerScreen />;
  }
  if (name === "HTML Printer") {
    return <HtmlPrinterScreen />;
  }
  Alert.alert("ERROR", `Unrecognizable app name: "${name}"`);
  return <></>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    backgroundColor: "#efefef",
    width: "100%",
  },
});
