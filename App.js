import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import Geolocation from "@react-native-community/geolocation";

const API_KEY = "fde70b7b510d418c6126c7433ab077c4"; // API KEY FROM OPENWEATHERMAP

//FETCHING DATA FROM OPENWEATHERMAP API

const fetchWeatherData = async (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
};
// FETCHING DATA ENDS

// GETTING WEATHER ICONS

const getWeatherIcon = (weatherCondition, hour) => {
  const weatherIcons = {
    Clear: [require("./assets/Sunny.png"), require("./assets/ClearNight.png")],
    Clouds: require("./assets/Cloudy.png"),
    Rain: require("./assets/Rainy.png"),
    Windy: require("./assets/Windy.png"),
    Snow: require("./assets/Snowy.png"),
  };

  if (Array.isArray(weatherIcons[weatherCondition])) {
    if (hour >= 18 || hour <= 6) return weatherIcons[weatherCondition][1];
    return weatherIcons[weatherCondition][0];
  }
  return weatherIcons[weatherCondition];
};

// GETTING WEATHER ICONS ENDS

// Fetching Day, Month and Date from Date Object

export default function App() {
  const dateObj = new Date();
  const dayName = dateObj.toLocaleString("default", { weekday: "long" });
  const dayNum = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const date = `${dayName}, ${dayNum} ${month}`;

  // Fetching Day, Month and Date from Date Object ENDS

  //Fetching location

  const [data, setData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(latitude, longitude).then((data) => {
        setData(data);
      });
    });
  }, []);

  //Fetching location ENDS

  //Fetching Weather data

  useEffect(() => {
    if (data) {
      const hour = new Date().getHours();
      const weatherCondition = data.weather[0].main;
      const weatherIcon = getWeatherIcon(weatherCondition, hour);
      setWeatherIcon(weatherIcon);
    }
  }, [data]);

  //Fetching Weather data ENDS

  // RENDER STARTS

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require("./assets/BG_Gradient.png")}
    >
      <View style={styles.Datecontainer}>
        <Text style={styles.DateText}>{date}</Text>
      </View>
      <View>
        {data ? (
          <View style={styles.CurrentLocation}>
            <Text style={styles.CurrentLocationText}>
              {data.name}, {data.sys.country}
            </Text>
          </View>
        ) : (
          <Text style={styles.CurrentLocationText}>Loading...</Text>
        )}
      </View>
      <View style={styles.weatherImage}>
        <View>
          <Image source={weatherIcon} style={{ width: 150, height: 150 }} />
        </View>
        <Text style={styles.weatherImageText}>
          {data ? data.weather[0].description : "Loading..."}
        </Text>
      </View>
      <View style={styles.temp}>
        <Text style={styles.tempText}>
          {data ? `${data.main.temp.toFixed(1)}°C` : "Loading..."}
        </Text>
      </View>
      <View>
        <Text style={styles.feelLikeText}>
          {data
            ? `Feels Like: ${data.main.feels_like.toFixed(1)}°C`
            : "Loading..."}
        </Text>
      </View>
    </ImageBackground>
  );
}

// RENDER ENDS

// STYLESHEET STARTS

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
    paddingTop: "2rem",
  },

  weatherImageText: {
    fontSize: "1.5rem",
    fontFamily: "Montserrat",
    color: "#f1f1f1",
    textTransform: "capitalize",
    fontWeight: "500",
    textAlign: "center",
    paddingTop: "1rem",
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

  feelLikeText: {
    fontSize: "1rem",
    fontFamily: "Montserrat",
    color: "#f1f1f1",
    fontWeight: "500",
    textAlign: "center",
  },
});

// STYLESHEET ENDS
