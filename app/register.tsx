import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)/home");
    } catch {
      Alert.alert("Erro", "Erro ao cadastrar");
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
        Criar Conta 
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
        onPress={handleRegister}
        style={{
          backgroundColor: "#34C759",
          padding: 15,
          borderRadius: 10,
          marginBottom: 10
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
          Cadastrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ textAlign: "center", color: "blue" }}>
          Voltar para login
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}