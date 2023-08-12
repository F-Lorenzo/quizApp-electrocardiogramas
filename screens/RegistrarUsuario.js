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
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import usuario from "../assets/images/usuario.png";
import { createAccount } from "../api/services/user.service";
import Toast from "react-native-root-toast";
import { updateUserState } from "../store/user/slice";
import { useDispatch } from "react-redux";

function RegistrarUsuario({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [creatingAcc, setCreatingAcc] = useState(false);

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

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

  const register = async () => {
    try {
      if (firstName.length && lastName.length && email.length && password.length) {
        setCreatingAcc(true);
        const newuser = {
          id: "",
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        };
        const userCreated = await createAccount(email, password, newuser);
        if (userCreated) {
          newuser.id = userCreated;
          dispatch(
            updateUserState({
              id: newuser.id,
              firstName: newuser.firstName,
              lastName: newuser.lastName,
              email: email,
              exercises: [],
            })
          );
          Toast.show("Cuenta creada con éxito", {
            duration: Toast.durations.SHORT,
            position: 50,
            shadow: true,
            animation: true,
            hideOnPress: true,
            opacity: 1,
            backgroundColor: "#15803d",
            onHidden: () => navigation.navigate("Inicio"),
          });
        }
      }
    } catch (error) {
      console.log(error);
      if (error.code === "auth/weak-password") {
        Toast.show("La contraseña debe contener más de 6 caracteres", {
          duration: Toast.durations.SHORT,
          position: 50,
          shadow: true,
          animation: true,
          hideOnPress: true,
          opacity: 1,
          backgroundColor: "#ef4444",
        });
      }
    } finally {
      setCreatingAcc(false);
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
              <Text style={Styles.texto}>REGISTRAR NUEVA CUENTA</Text>
            </View>
            <View style={Styles.datos}>
              <View style={Styles.celdas}>
                <Text style={Styles.label}>Nombre</Text>
                <TextInput
                  style={Styles.input}
                  onChangeText={(firstName) => setFirstname(firstName)}></TextInput>
              </View>
              <View style={Styles.celdas}>
                <Text style={Styles.label}>Apellido</Text>
                <TextInput
                  style={Styles.input}
                  onChangeText={(lastName) => setLastname(lastName)}></TextInput>
              </View>
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
            <TouchableOpacity
              style={Styles.botonRegistrar}
              onPress={register}
              disabled={creatingAcc}>
              <Text style={Styles.textoBoton}>
                {creatingAcc ? <ActivityIndicator color="white" /> : "REGISTRAR"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "#3b3a3a",
    flex: 1,
  },
  scrollView: {
    flexGrow: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  perfil: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  botonRegistrar: {
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

export default RegistrarUsuario;
