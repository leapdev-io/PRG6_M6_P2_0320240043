import React, { useState, useContext } from "react";
import { View, TextInput, Button, Alert, Text } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const BASE_URL = "http://10.1.13.14:8080/api/user";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/Login",
        { nim, password },
        {
          headers: {
            authcode: "astratech@123",
          },
        },
      );

      if (res.data.code === 200 && res.data.data) {
        login(res.data.data);
      } else {
        Alert.alert("Login Gagal", res.data.message);
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Tidak bisa konek ke server");
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Login Presensi
      </Text>

      <TextInput
        placeholder="NIM"
        value={nim}
        onChangeText={setNim}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
