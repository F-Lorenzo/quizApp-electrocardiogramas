import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { Montserrat_400Regular, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import Header from "../components/Header";
import usuario from "../assets/images/usuario.png";
import { authenticate } from "../api/services/user.service";
import store from "../redux/store";
import { updateUser } from "../redux/reducers/user.reducer";

function Login() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        MontserratRegular: Montserrat_400Regular,
      });
      await Font.loadAsync({
        MontserratMedium: Montserrat_500Medium,
      });

      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <Text> font doesn't charge </Text>;
  }

  const login = async () => {
    try {
      const userAuthenticated = await authenticate(email, password);
      if (userAuthenticated) {
        store.dispatch(updateUser(userAuthenticated));
        console.log(userAuthenticated);
      } else {
        console.log("user information could not be found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <View style={Styles.container}>
        <ScrollView contentContainerStyle={Styles.scrollView}>
          <View style={Styles.perfil}>
            <View style={Styles.perfilHeader}>
              <Image style={Styles.imagePerfil} source={usuario} />
              <View style={Styles.linea}></View>
              <Text style={Styles.texto}>INICIAR SESIÓN</Text>
            </View>
            <View style={Styles.datos}>
              <View style={Styles.celdas}>
                <Text style={Styles.label}>E-Mail</Text>
                <TextInput
                  style={Styles.input}
                  onChangeText={(email) => setEmail(email)}></TextInput>
              </View>
              <View style={Styles.celdas}>
                <Text style={Styles.label}>Contraseña</Text>
                <TextInput
                  style={Styles.input}
                  onChangeText={(password) => setPassword(password)}></TextInput>
              </View>
            </View>
            <TouchableOpacity style={Styles.botonLogin} onPress={login}>
              <Text style={Styles.textoBoton}>INICIAR SESIÓN</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3b3a3a",
  },
  scrollView: {
    flexGrow: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  perfil: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  perfilHeader: {
    justifyContent: "center",
    alignItems: "center",
  },
  imagePerfil: {
    width: 70,
    height: 70,
  },
  linea: {
    height: 2,
    width: 30,
    backgroundColor: "#fff",
    margin: 4,
  },
  texto: {
    color: "#fff",
    fontFamily: "MontserratRegular",
    fontSize: 12,
  },
  datos: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  celdas: {
    flexDirection: "row",
    margin: 20,
  },
  label: {
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    color: "#fff",
    fontFamily: "MontserratRegular",
    backgroundColor: "#b3b5b3",
    padding: 5,
    width: 100,
    height: 30,
  },
  input: {
    backgroundColor: "#6e6e6e",
    width: 200,
    height: 30,
    color: "#fff",
    fontFamily: "MontserratRegular",
  },
  botonLogin: {
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "#77bf02",
    width: 150,
    padding: 5,
    alignItems: "center",
  },
  textoBoton: {
    fontFamily: "MontserratRegular",
    color: "#fff",
  },
});

export default Login;
