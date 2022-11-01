import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import touchLogo from "../assets/touchLogo.png";
import

function Inicio() {
  return (
    <View>
      <View style={Styles.container}>
        <Image style={Styles.image} source={touchLogo} />
      </View>
      <View styles={Styles.button}>
        <TouchableOpacity>
          <Image source={}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#87B140",
  },
});

export default Inicio;
