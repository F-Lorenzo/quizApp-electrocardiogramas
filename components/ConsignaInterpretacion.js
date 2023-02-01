import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

function ConsignaInterpretacion({ consigna }) {
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
    return <Text> font don't charge</Text>;
  }
  return (
    <View style={Styles.consignaExtendida}>
      <Text style={{ color: "#fff", fontFamily: "MontserratRegular" }}>
        {consigna}
      </Text>
    </View>
  );
}

const Styles = StyleSheet.create({
  consignaExtendida: {
    width: 400,
    height: 100,
    color: "#fff",
    backgroundColor: "#77bf02",
    padding: "0.5%",
    borderTopRightRadius: 30,
    marginTop: "20%",
  },
});

export default ConsignaInterpretacion;
