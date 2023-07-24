import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import * as Font from "expo-font";
import { Montserrat_400Regular, Montserrat_500Medium } from "@expo-google-fonts/montserrat";

function Administracion() {
  const [fontLoaded, setFontLoaded] = useState(false);

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

  return (
    <>
      <Header />
      <View style={Styles.container}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.title}>Administracion</Text>
        </View>

        <View style={Styles.table}>
          <ScrollView horizontal={true}>
            <View>
              <View style={Styles.tableColumns}>
                <View style={Styles.column}>
                  <Text style={Styles.textColumn}>NOMBRE</Text>
                </View>
                <View style={Styles.column}>
                  <Text style={Styles.textColumn}>TIPO</Text>
                </View>
                <View style={Styles.column}>
                  <Text style={Styles.textColumn}>NOMBRE</Text>
                </View>
                <View style={Styles.column}>
                  <Text style={Styles.textColumn}>TIPO</Text>
                </View>
              </View>

              <View style={Styles.rowContainer}>
                <View style={Styles.row}>
                  <View style={Styles.field}>
                    <Text style={Styles.textField}>Repolarización precoz</Text>
                  </View>

                  <View style={Styles.field}>
                    <Text style={Styles.textField}>Consideraciones Clinicas</Text>
                  </View>

                  <View style={Styles.field}>
                    <Text style={Styles.textField}>Repolarización precoz</Text>
                  </View>

                  <View style={Styles.field}>
                    <Text style={Styles.textField}>Consideraciones Clinicas</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={Styles.actionsfield}>
            <View style={Styles.actionButtons}>
              <Text style={Styles.showButton}>Ver</Text>
              <Text style={Styles.editButton}>Editar</Text>
            </View>
          </View>
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
    width: 125,
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
    width: 125,
    alignItems: "center",
    paddingVertical: 5,
    justifyContent: "center",
  },
  textField: {
    color: "#fff",
    textAlign: "center",
  },
  actionsfield: {
    width: 125,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 14,
  },
  actionColumn: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  showButton: {
    color: "#fff",
    marginRight: 8,
  },
  editButton: {
    color: "#fff",
    marginLeft: 8,
  },
});

export default Administracion;
