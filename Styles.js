import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(241, 241, 241, 0.95)",
    borderRadius: "2rem",
    marginVertical: "2rem",
    marginHorizontal: "2rem",
    paddingHorizontal: "1rem",
  },

  input: {
    flex: 1,
    paddingVertical: "1rem",
    fontFamily: "Montserrat-Regular",
    fontSize: "1rem",
    outlineStyle: "none",
    outlineColor: "transparent",
  },

  searchIcon: {
    width: "1.5rem",
    height: "1.5rem",
  },

  error: {
    color: "red",
    fontSize: "1rem",
    fontFamily: "Montserrat-Regular",
    paddingRight: "1rem",
  },

  Datecontainer: {
    alignItems: "center",
    justifyContent: "center",
    // marginTop: "4rem",
  },

  DateText: {
    fontFamily: "Montserrat-Regular",
    fontSize: "1.5rem",
    color: "#f1f1f1",
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
  },

  CurrentLocation: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "0.7rem",
  },

  CurrentLocationText: {
    fontFamily: "Montserrat-Regular",
    fontSize: "1.3rem",
    fontVariant: ["small-caps"],
    color: "#f1f1f1",
    fontWeight: "500",
    textAlign: "center",
  },

  weatherImage: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "1rem",
  },

  weatherImageText: {
    fontSize: "2rem",
    fontFamily: "Montserrat-Regular",
    color: "#f1f1f1",
    textTransform: "capitalize",
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: "1rem",
  },

  cloudCover: {
    fontSize: "1rem",
    fontFamily: "Montserrat-Regular",
    color: "#f1f1f1",
    textTransform: "capitalize",
    fontWeight: "500",
    textAlign: "center",
    marginTop: "0.5rem",
  },

  temp: {
    marginTop: "1rem",
  },

  tempText: {
    fontSize: "4rem",
    fontFamily: "Montserrat-Regular",
    color: "#ffffff",
    fontWeight: "600",
    textAlign: "center",
  },

  feelLikeText: {
    fontSize: "1rem",
    fontFamily: "Montserrat-Regular",
    color: "#f1f1f1",
    fontWeight: "500",
    textAlign: "center",
  },

  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "2rem",
    gap: 30,
  },

  box: {
    width: "10rem",
    height: "10rem",
    borderRadius: 10,
    backgroundColor: "rgba(241, 241, 241, 0.15)",
  },

  boxHeader: {
    flexDirection: "row",
    gap: 10,
    opacity: 0.8,
  },

  boxHeaderIcon: {
    width: "1.75rem",
    height: "1.75rem",
    marginLeft: "0.5rem",
    marginTop: "0.8rem",
  },

  boxHeaderText: {
    fontSize: "1.1rem",
    fontFamily: "Montserrat-Regular",
    color: "#f1f1f1",
    fontWeight: "500",
    paddingVertical: "1rem",
  },

  BoxMainText: {
    fontSize: "2rem",
    fontFamily: "Montserrat-Regular",
    color: "#f1f1f1",
    fontWeight: "500",
    textAlign: "auto",
    paddingLeft: "0.5rem",
    paddingTop: "1rem",
  },
});

export default styles;