import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

export function ImageBox({
  placeholder,
  uri,
}: {
  placeholder?: string;
  uri: string | null;
}) {
  const { width } = Dimensions.get("window");
  const imageWidth = Math.floor(width * 0.8);
  if (uri === null) {
    return (
      <View
        style={[
          imageBoxStyles.textBox,
          { width: imageWidth, height: imageWidth },
        ]}
      >
        <Text style={imageBoxStyles.text}>
          {placeholder ?? "Press OPEN to select an image."}
        </Text>
      </View>
    );
  }
  return (
    <Image
      style={imageBoxStyles.image}
      source={{ uri }}
      width={imageWidth}
      height={imageWidth}
    />
  );
}

const imageBoxStyles = StyleSheet.create({
  textBox: {
    margin: 10,
    justifyContent: "center",
    backgroundColor: "#EBEBEB",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 20,
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
  },
  image: {
    margin: 10,
    borderRadius: 20,
  },
});
