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

  // API KEY INFO Starts

  const API_KEY = "fde70b7b510d418c6126c7433ab077c4";

  // API KEY INFO Ends

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

  // Weather Data Fetching Starts

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeatherData();
      setWeather(data);
    };
    getWeather();
  }, []);

  // Weather Data Fetching Ends

  //Wether Conditiion Image Fetching Starts

  const weatherIcons = {
    Clear: [require("./assets/Sunny.png"), require("./assets/ClearNight.png")],
    Clouds: require("./assets/Cloudy.png"),
    Rain: require("./assets/Rainy.png"),
    Windy: require("./assets/Windy.png"),
    Snow: require("./assets/Snowy.png"),
  };

  const weatherIcon = weather ? weatherIcons[weather] : null;

  //Weather Condition Image Fetching Ends

  //Weather Condition Fetching Starts
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        error => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });
  };

  const fetchWeatherData = async (latitude, longitude) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    const weather = data.weather[0].main;
    return weather;
  };

  
    useEffect(() => {
      const getWeather = async () => {
        try {
          const { latitude, longitude } = await getLocation();
          const data = await fetchWeatherData(latitude, longitude);
          setWeather(data);
        } catch (error) {
          console.error(error);
        }
      };
      getWeather();
    }, []);

  //Weather Condition Fetching ends

  // Temperature Fetch By Location Starts

  const [temperature, setTemperature] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      setTemperature(data.main.temp);
    });
  }, []);

  // Temperature Fetch By Location Ends

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
          <Text style={styles.CurrentLocationText}>Loading...</Text>
        )}
      </View>
      <View style={styles.weatherImage}>
        <View>
          <Image source={weatherIcon} style={{ width: 150, height: 150 }} />
        </View>
        <Text style={styles.weatherImageText}> {weather}</Text>
      </View>
      <View style={styles.temp}>
        <Text style={styles.tempText}>
          {temperature ? `${temperature}°C` : "Loading..."}
        </Text>
      </View>
    </ImageBackground>
  );
}

// MAIN RENDER FUNCTION ENDS

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
});

// STYLESHEET ENDS
