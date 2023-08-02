import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { getManualPDF } from "../api/services/file.service";
import Pdf from "react-native-pdf";
import { ActivityIndicator } from "react-native";
import * as Font from "expo-font";
import { Montserrat_400Regular, Montserrat_500Medium } from "@expo-google-fonts/montserrat";

function Manual({ navigation }) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [uriPdf, setUriPdf] = useState("");

  const loadManualPdf = async () => {
    try {
      const manualUri = await getManualPDF();
      setUriPdf(manualUri);
    } catch (error) {
      console.log(error);
    }
  };

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
    loadManualPdf();
  }, []);

  if (!fontLoaded) {
    return <Text> font don't charge</Text>;
  }

  return (
    <View style={Styles.container}>
      {uriPdf ? (
        <Pdf source={{ uri: uriPdf, cache: true }} trustAllCerts={true} style={Styles.pdf} />
      ) : (
        <View style={Styles.indicator}>
          <ActivityIndicator size="large" />
          <Text style={Styles.textIndicator}>Cargando manual..</Text>
        </View>
      )}
    </View>
  );
}

export default Manual;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textIndicator: {
    fontFamily: "MontserratMedium",
    color: "black",
  },
});
