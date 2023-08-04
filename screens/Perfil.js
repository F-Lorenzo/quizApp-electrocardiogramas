import React, { useEffect, useReducer, useState } from "react";
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
import estadisticasImg from "../assets/images/estadisticas.png";
import Ejercicios from "../assets/images/ejercicios.png";
import Completar from "../assets/images/completar.png";
import MultipleChoice from "../assets/images/multiple-choice.png";
import concideracionesClinicas from "../assets/images/consideraciones_clinicas.png";
import ejerciciosConcideraciones from "../db/ejerciciosTest.json";
import { useSelector } from "react-redux";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { logout, update } from "../api/services/user.service";
import Toast from "react-native-root-toast";
import store from "../redux/store";
import { updateUser } from "../redux/reducers/user.reducer";

function Perfil({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

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
    console.log(user);
  }, []);

  if (!fontLoaded) {
    return <Text> font don't charge</Text>;
  }

  const signOut = async () => {
    try {
      await logout();
      navigation.navigate("Inicio");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      setLoading(true);
      const userInfoUpd = {
        id: user.id,
        firstName: firstName,
        lastName: lastName,
        newEmail: email,
        newPassword: password,
        originalPassword: user.pwd,
        originalEmail: user.email,
      };
      const usrUpd = await update(userInfoUpd);
      if (usrUpd) {
        Toast.show("Datos actualizados correctamente", {
          duration: 1000,
          position: 50,
          shadow: true,
          animation: true,
          hideOnPress: true,
          opacity: 1,
          backgroundColor: "#15803d",
        });

        store.dispatch(
          updateUser({
            firstName: userInfoUpd.firstName,
            lastName: userInfoUpd.lastName,
            email: userInfoUpd.email,
            password: userInfoUpd.newPassword,
          })
        );
      }
    } catch (error) {
      if (error === "auth/weak-password") {
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
      console.log("catch?", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={Styles.principalContainer}>
      <Header />
      {user ? (
        <ScrollView>
          <View style={Styles.perfil}>
            <View style={Styles.perfilHeader}>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "flex-end",
                  marginTop: 20,
                  paddingHorizontal: 10,
                }}>
                <TouchableOpacity onPress={signOut}>
                  <Text style={Styles.texto}>
                    <AntDesign name="logout" size={13} color="white" /> Cerrar sesión
                  </Text>
                </TouchableOpacity>
              </View>
              <Image style={Styles.imagePerfil} source={usuario} />
              <View style={Styles.linea}></View>
              <Text style={Styles.texto}>MI PERFIL</Text>
            </View>
            <View style={Styles.datos}>
              <View style={Styles.celdas}>
                <Text style={Styles.label}>Nombre</Text>
                <TextInput
                  style={Styles.input}
                  placeholderTextColor="#fff"
                  defaultValue={user.firstName}
                  onChangeText={(text) => setFirstName(text)}></TextInput>
              </View>
              <View style={Styles.celdas}>
                <Text style={Styles.label}>Apellido</Text>
                <TextInput
                  style={Styles.input}
                  placeholderTextColor="#fff"
                  defaultValue={user.lastName}
                  onChangeText={(text) => setLastName(text)}></TextInput>
              </View>
              <View style={Styles.celdas}>
                <Text style={Styles.label}>E-Mail</Text>
                <TextInput
                  style={Styles.input}
                  placeholderTextColor="#fff"
                  defaultValue={user.email}
                  onChangeText={(text) => setEmail(text)}></TextInput>
              </View>
              <View style={Styles.celdas}>
                <Text style={Styles.label}>Contraseña</Text>
                <TouchableOpacity
                  style={Styles.botonModificar}
                  onPress={() => setShowChangePwd(!showChangePwd)}>
                  <Text style={Styles.textoBoton}>MODIFICAR</Text>
                </TouchableOpacity>
              </View>
              {showChangePwd && (
                <View style={Styles.celdas}>
                  <TextInput
                    style={Styles.inputPwd}
                    placeholderTextColor="#fff"
                    placeholder="Escribe tu nueva contraseña"
                    onChangeText={(text) => setPassword(text)}></TextInput>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={Styles.botonModificar}
              onPress={handleUpdateUser}
              disabled={loading}>
              <Text style={Styles.textoBoton}>{loading ? <ActivityIndicator /> : "CONFIRMAR"}</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.estadisticas}>
            <View style={Styles.perfilHeader}>
              <Image style={Styles.imgEstadisticas} source={estadisticasImg} />
              <View style={Styles.linea}></View>
              <Text style={Styles.texto}>MIS ESTADISTICAS</Text>
            </View>
            <TouchableOpacity
              style={Styles.container}
              onPress={() =>
                navigation.navigate("Estadisticas", {
                  img: Ejercicios,
                  title: "Interpretacion de electrocardiograma",
                  ejercicios: ejerciciosConcideraciones,
                })
              }>
              <View style={Styles.buttonContainer}>
                <Image style={Styles.image} source={Ejercicios} />
                <Text style={Styles.texto}>Interpretacion de electrocardiograma</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Estadisticas", {
                  img: Completar,
                  title: "Complete los Casilleros",
                  ejercicios: ejerciciosConcideraciones,
                })
              }
              style={Styles.container}>
              <View style={Styles.buttonContainer}>
                <Image style={Styles.image} source={Completar} />
                <Text style={Styles.texto}>Complete los Casilleros</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Estadisticas", {
                  img: MultipleChoice,
                  title: "Multiple choice",
                  ejercicios: ejerciciosConcideraciones,
                })
              }
              style={Styles.container}>
              <View style={Styles.buttonContainer}>
                <Image style={Styles.image} source={MultipleChoice} />
                <Text style={Styles.texto}>Multiple choice</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Estadisticas", {
                  img: concideracionesClinicas,
                  title: "Consideraciones Clinicas",
                  ejercicios: ejerciciosConcideraciones,
                })
              }
              style={Styles.container}>
              <View style={Styles.buttonContainer}>
                <Image style={Styles.image} source={concideracionesClinicas} />
                <Text style={Styles.texto}>Consideraciones Clinicas</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={Styles.notLoggedView}>
          <TouchableOpacity style={Styles.buttons} onPress={() => navigation.navigate("Registrar")}>
            <Text style={Styles.textoBoton}>REGISTRARME</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.buttons} onPress={() => navigation.navigate("Login")}>
            <Text style={Styles.textoBoton}>INICIAR SESIÓN</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  principalContainer: {
    flex: 1,
    backgroundColor: "#3b3a3a",
  },
  perfil: {
    backgroundColor: "#3b3a3a",
    height: 500,
    alignItems: "center",
    paddingBottom: 10,
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
  inputPwd: {
    width: 300,
    backgroundColor: "#6e6e6e",
    height: 30,
    color: "#fff",
    fontFamily: "MontserratRegular",
  },
  botonModificar: {
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
  estadisticas: {
    backgroundColor: "#5c5a5a",
    height: 500,
    marginTop: 60,
  },
  imgEstadisticas: {
    width: 70,
    height: 70,
  },
  image: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
  },
  container: {
    justifyContent: "center",
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  notLoggedView: {
    flexGrow: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "#77bf02",
    width: 150,
    padding: 5,
    alignItems: "center",
    margin: 10,
  },
});

export default Perfil;
