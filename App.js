import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";

export default function App() {
  const [currentDay, setCurrentDay] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const dateObj = new Date();
      setCurrentDay(dateObj.toLocaleDateString("en-US", { weekday: "long" }));
      const month = dateObj.toLocaleString("default", { month: "long" });
      const day = dateObj.getDate();
      setCurrentDate(`${day} ${month}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("./assets/BG_Gradient.png")}
    >
      <View style={styles.Datecontainer}>
        <Text>
          <Text style={styles.DateText}>
            {currentDay}, {currentDate}
          </Text>
        </Text>
      </View>
      <View style={styles.CurrentLocation}>
        <Text style={styles.CurrentLocationText}>Sundarnagar</Text>
      </View>
      <View style={styles.weatherImage}>
        <Image
          source={require("./assets/PartlyCloudyDay.png")}
          style={{ width: 150, height: 150 }}
        />
        <Text style={styles.weatherImageText}>Partly Cloudy</Text>
      </View>
      <View style={styles.temp}>
        <Text style={styles.tempText}>27°C</Text>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },

  Datecontainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "7rem",
  },

  DateText: {
    fontFamily: "Montserrat",
    fontSize: "1.75rem",
    color: "#f1f1f1",
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
  },

  CurrentLocation: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "1rem",
  },

  CurrentLocationText: {
    fontFamily: "Montserrat",
    fontSize: "1.5rem",
    fontVariant: ["small-caps"],
    color: "#f1f1f1",
    fontWeight: "500",
    textAlign: "center",
  },

  weatherImage: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "4rem",
  },
  weatherImageText: {
    fontSize: "1.5rem",
    fontFamily: "Montserrat",
    color: "#f1f1f1",
    fontWeight: "500",
    textAlign: "center",
  },
  temp: {
    marginTop: "1rem",
  },
  tempText: {
    fontSize: "5rem",
    fontFamily: "Montserrat",
    color: "#f1f1f1",
    fontWeight: "100",
    textAlign: "center",
  },
});
