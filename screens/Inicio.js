import { View, Text, StyleSheet } from "react-native";

function Inicio() {
  return (
    <View>
      <Text style={Styles.text}>Pantalla de inicio</Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  text: {
    color: red,
  },
});

export default Inicio;
