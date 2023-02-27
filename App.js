import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";
import Geolocation from "@react-native-community/geolocation";

export default function App() {
  // Day, Date, Month Fetch Function Starts

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

  // Day, Date, Month Fetch Function Ends

  // API INFO Starts

  const API_KEY = "fde70b7b510d418c6126c7433ab077c4";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;
  
  // API INFO Ends

  // Location Fetching Starts

  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
        axios
          .get(URL)
          .then((response) => {
            setWeatherData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  // Location Fetching Ends

  // Temperature Fetch By Location Function Starts

  const [temperature, setTemperature] = useState(null);
  const [locationName, setLocationName] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setTemperature(data.main.temp);
    });
  }, []);

  // Temperature Fetch By Location Function Ends

  // MAIN RENDER FUNCTION STARTS

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
      <View>
        {weatherData ? (
          <View style={styles.CurrentLocation}>
            <Text style={styles.CurrentLocationText}>{weatherData.name}</Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <View style={styles.weatherImage}>
        <Image
          source={require("./assets/PartlyCloudyDay.png")}
          style={{ width: 150, height: 150 }}
        />
        <Text style={styles.weatherImageText}>Partly Cloudy</Text>
      </View>
      <View style={styles.temp}>
        <Text style={styles.tempText}>
          {temperature ? `${temperature} °C` : "Loading..."}
        </Text>
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
    fontSize: "4rem",
    fontFamily: "Montserrat",
    color: "#f1f1f1",
    fontWeight: "100",
    textAlign: "center",
  },
});
