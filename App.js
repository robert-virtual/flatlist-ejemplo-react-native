import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://192.168.0.19:3030/api";

export default function App() {
  // cada q hay un cambio en la UI
  useEffect(() => {
    // solo al inicio
    obtenerProductos();
  }, []);
  const [productos, setproductos] = useState([]);
  async function obtenerProductos() {
    const { data } = await axios.get("/productos");
    console.log(data);
    setproductos(data);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        renderItem={({ item }) => (
          <View style={{ padding: 15 }}>
            <Text>{item.nombre}</Text>
            <Text>Lps.{item.precio}</Text>
          </View>
        )}
        keyExtractor={(item, i) => i.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
