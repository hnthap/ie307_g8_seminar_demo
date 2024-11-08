import { Dimensions, StyleSheet } from "react-native";

const screenSize = Dimensions.get("screen");

export const commonStyles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  fancyText: {
    fontFamily: "serif",
    fontSize: 18,
  },
  subAppContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CDCDCD",
  },
  textInput: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    width: "90%",
    height: screenSize.height * 0.5,
    marginVertical: 10,
    padding: 10,
    fontSize: 18,
    fontFamily: "monospace",
    textAlignVertical: "top",
  },
});
