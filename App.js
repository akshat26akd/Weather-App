import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Geolocation from "react-native-geolocation-service";

import styles from "./Styles";
import { useFonts } from "expo-font";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";

const API_KEY = "fde70b7b510d418c6126c7433ab077c4";

export default function App() {
  //FONTS STARTS

  useFonts({
    "Montserrat-Regular": Montserrat_400Regular,
  });

  //FONTS ENDS

  //Fetching location

  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data)
      return data;
    };

    if (searchQuery === "") {
      Geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(latitude, longitude).then(
          (data) => {
            setData(data);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0,
            distanceFilter: 0,
            background: true,
          }
        );
      });
    }
  }, [searchQuery]);

  const fetchWeatherDataByCity = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Invalid City Name`);
      }

      const cityData = await response.json();
      setError(null);
      // console.log(cityData)
      setData(cityData);
    } catch (error) {
      console.error(error);
      setError("Invalid!"); // set the error message state
    }
  };

  //Fetching location ENDS

  // Fetching Day, Month and Date from Date Object

  const dateObj = new Date();
  const dayName = dateObj.toLocaleString("default", { weekday: "long" });
  const dayNum = dateObj.getDate();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const date = `${dayName}, ${dayNum} ${month}`;

  // Fetching Day, Month and Date from Date Object ENDS

  // GETTING WEATHER ICONS

  const getWeatherIcon = (weatherCondition, hour) => {
    const weatherIcons = {
      Clear: [
        require("./assets/ClearDay.png"),
        require("./assets/ClearNight.png"),
      ],
      Clouds: require("./assets/Cloud.png"),
      Rain: require("./assets/Rain.png"),
      Wind: require("./assets/Wind.png"),
      Snow: require("./assets/Snow.png"),
      Fog: require("./assets/Fog.png"),
      Drizzle: require("./assets/Drizzle.png"),
      Tornado: require("./assets/Tornado.png"),
      Ash: require("./assets/DustSandAsh.png"),
      Dust: require("./assets/DustSandAsh.png"),
      Sand: require("./assets/DustSandAsh.png"),
      Haze: require("./assets/HazeMistSmoke.png"),
      Mist: require("./assets/HazeMistSmoke.png"),
      Smoke: require("./assets/HazeMistSmoke.png"),
      Squall: require("./assets/ThunderstormSquall.png"),
      Thunderstorm: require("./assets/ThunderstormSquall.png"),
    };

    if (Array.isArray(weatherIcons[weatherCondition])) {
      if (hour >= 18 || hour <= 6) return weatherIcons[weatherCondition][1];
      return weatherIcons[weatherCondition][0];
    }
    return weatherIcons[weatherCondition];
  };

  // GETTING WEATHER ICONS ENDS

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
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search City"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={fetchWeatherDataByCity}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity onPress={fetchWeatherDataByCity}>
          <Image
            source={require("./assets/search-loc.png")}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.Datecontainer}>
        <Text style={styles.DateText}>{date}</Text>
      </View>
      <View>
        <View style={styles.CurrentLocation}>
          <Text style={styles.CurrentLocationText}>
            {data
              ? `${data.name}, ${data.sys.country}`
              : "Fetching Location . . ."}
          </Text>
        </View>
      </View>
      <View style={styles.weatherImage}>
        <View>
          <Image source={weatherIcon} style={{ width: 120, height: 120 }} />
        </View>
        <Text style={styles.weatherImageText}>
          {data && data.weather[0].description}
        </Text>
        <Text style={styles.cloudCover}>
          {data && `Clouds Cover: ${data.clouds.all}%`}
        </Text>
      </View>
      <View style={styles.temp}>
        <Text style={styles.tempText}>
          {data ? `${data.main.temp.toFixed(1)}°C` : "_ _"}
        </Text>
      </View>

      <View style={styles.grid}>
        {/*Feels Like */}

        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Image
              style={styles.boxHeaderIcon}
              source={require("./assets/FeelsLike.png")}
            />
            <Text style={styles.boxHeaderText}>Feels Like</Text>
          </View>
          <Text style={styles.BoxMainText}>
            {data && `${data.main.feels_like.toFixed(0)}°C`}
          </Text>
        </View>
        {/* Wind */}

        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Image
              style={styles.boxHeaderIcon}
              source={require("./assets/Wind.png")}
            />
            <Text style={styles.boxHeaderText}>Wind</Text>
          </View>
          <Text style={styles.BoxMainText}>
            {data && `${data.wind.speed.toFixed(1)} m/s`}
          </Text>
        </View>

        {/* Humidity */}

        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Image
              style={styles.boxHeaderIcon}
              source={require("./assets/Humidity.png")}
            />
            <Text style={styles.boxHeaderText}>Humidity</Text>
          </View>
          <Text style={styles.BoxMainText}>
            {data && `${data.main.humidity}%`}
          </Text>
        </View>

        {/* Visibility */}

        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Image
              style={styles.boxHeaderIcon}
              source={require("./assets/Visibility.png")}
            />
            <Text style={styles.boxHeaderText}>Visibility</Text>
          </View>
          <Text style={styles.BoxMainText}>
            {data && `${data.visibility / 1000} km`}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

// RENDER ENDS
