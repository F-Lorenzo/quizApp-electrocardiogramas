import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import * as Font from "expo-font";
import { Montserrat_400Regular, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-web";
import { getExercises } from "../api/services/exercise.service";

function Administracion() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [exercises, setExercises] = useState([]);

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

    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const exercises = await getExercises();
      setExercises(exercises);
      console.log(exercises);
    } catch (error) {
      console.log(error);
    }
  };

  if (!fontLoaded) {
    return <Text> font doesn't charge </Text>;
  }

  return (
    <>
      <Header />
      <View style={Styles.container}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.title}>Administracion</Text>
        </View>

        <View style={Styles.table}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View>
              <View style={Styles.tableColumns}>
                <View style={Styles.unusedColumn}></View>
                <View style={Styles.column}>
                  <Text style={Styles.textColumn}>NOMBRE</Text>
                </View>
                <View style={Styles.column}>
                  <Text style={Styles.textColumn}>TIPO</Text>
                </View>
                <View style={Styles.column}>
                  <Text style={Styles.textColumn}>TIPO</Text>
                </View>
                <View style={Styles.column}>
                  <Text style={Styles.textColumn}>TIPO</Text>
                </View>
              </View>

              {exercises.map((exercise) => (
                <View style={Styles.rowContainer}>
                  <View style={Styles.row}>
                    <View style={Styles.actionsfield}>
                      <View style={Styles.actionButtons}>
                        <FontAwesome style={Styles.showButton} name="eye" size={15} color="white" />
                        <FontAwesome5
                          style={Styles.editButton}
                          name="edit"
                          size={15}
                          color="white"
                        />
                      </View>
                    </View>
                    <View style={Styles.field}>
                      <Text style={Styles.textField}>{exercise.name}</Text>
                    </View>
                    <View style={Styles.field}>
                      <Text style={Styles.textField}>{exercise.type}</Text>
                    </View>
                    <View style={Styles.field}>
                      <Text style={Styles.textField}>Consideraciones Clinicas</Text>
                    </View>
                    <View style={Styles.field}>
                      <Text style={Styles.textField}>Consideraciones Clinicas</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3b3a3a",
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontFamily: "MontserratRegular",
  },
  table: {
    marginTop: 30,
    margin: 2,
    padding: 5,
    flexDirection: "row",
  },
  tableColumns: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "#fff",
    paddingTop: 5,
    paddingBottom: 10,
  },
  column: {
    width: "22%",
    alignItems: "center",
  },
  textColumn: {
    color: "#fff",
  },
  rowContainer: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "#fff",
  },
  row: {
    flexDirection: "row",
  },
  field: {
    width: "22%",
    alignItems: "center",
    paddingVertical: 5,
    justifyContent: "center",
  },
  textField: {
    color: "#fff",
    textAlign: "center",
  },
  actionsfield: {
    width: "12%",
    alignItems: "center",
    justifyContent: "center",
  },
  actionColumn: {
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  showButton: {
    marginRight: 8,
  },
  editButton: {
    marginLeft: 8,
  },
  unusedColumn: {
    width: "12%",
  },
});

export default Administracion;
