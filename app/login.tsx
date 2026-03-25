import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)/home");
    } catch {
      Alert.alert("Erro", "Login inválido");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", padding: 20 }}>

      <Text style={{
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 30
      }}>
        Lista de Compras 
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 12,
          marginBottom: 15
        }}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 12,
          marginBottom: 20
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "#007AFF",
          padding: 15,
          borderRadius: 10,
          marginBottom: 10
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={{ textAlign: "center", color: "blue" }}>
          Criar conta
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}