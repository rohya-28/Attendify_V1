import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

interface LoaderProps {
  isVisible: boolean;
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({
  isVisible,
  message = "Loading...",
}) => {
  if (!isVisible) return null; // Don't render the loader if `isVisible` is false

  return (
    <View style={styles.overlay}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // Ensure it appears above other elements
  },
  loaderContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: "black",
  },
});

export default Loader;
