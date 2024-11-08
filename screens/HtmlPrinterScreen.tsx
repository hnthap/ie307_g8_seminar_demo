import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  Platform,
  Pressable,
  Text,
  TextInput
} from "react-native";
import { ButtonRow } from "../components";
import { commonStyles } from "../styles";

export function HtmlPrinterScreen() {
  const [printer, setPrinter] = useState<Print.Printer | null>(null);
  const [html, setHtml] = useState(DEFAULT_HTML_CONTENT);

  function print() {
    Print.printAsync({ html, printerUrl: printer?.url });
  }

  function printToFile() {
    Print.printToFileAsync({ html })
      .then(({ uri }) => {
        shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" }).catch(
          (reason) => Alert.alert("shareAsync failed", reason)
        );
      })
      .catch((reason) => Alert.alert("Failed to print to file", reason));
  }

  function selectPrinter() {
    if (Platform.OS !== "ios") {
      throw new Error("selectPrinter() is an iOS-specific function.");
    }
    Print.selectPrinterAsync().then((printer) => setPrinter(printer));
  }

  function resetTextInput() {
    setHtml(DEFAULT_HTML_CONTENT);
  }

  return (
    <Pressable style={commonStyles.subAppContainer} onPress={Keyboard.dismiss}>
      <TextInput
        style={commonStyles.textInput}
        multiline={true}
        spellCheck={false}
        defaultValue={DEFAULT_HTML_CONTENT}
        value={html}
        onChangeText={setHtml}
      />
      <ButtonRow
        propsList={[
          { title: "Reset HTML", onPress: resetTextInput },
          { title: "Print", onPress: print },
          { title: "Print to PDF", onPress: printToFile },
        ]}
      />
      {Platform.OS === "ios" && (
        <>
          <Text style={commonStyles.fancyText}>
            Printer: {selectPrinter.name ?? "(No printer selected)"}
          </Text>
          <ButtonRow
            propsList={[{ title: "Select Printer", onPress: selectPrinter }]}
          />
        </>
      )}
    </Pressable>
  );
}

const DEFAULT_HTML_CONTENT = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello</h1>
  <p>World</p>
</body>
</html>`.trim();
