import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  async function handleRegister() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)/home");
    } catch {
      Alert.alert("Erro", t("registerError"));
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">

      <View className="items-center mt-10 px-6">
        <Ionicons name="person-add-outline" size={48} color="#22c55e" />
        
        <Text className="text-3xl font-bold text-gray-800 mt-2">
          {t("registerTitle")}
        </Text>

        <Text className="text-gray-500 text-center mt-1">
          {t("registerDescription")}
        </Text>
      </View>
      
      <View className="flex-1 justify-center px-6">
        <View className="gap-4">
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 border border-gray-200">
            <Ionicons name="mail-outline" size={18} color="#9ca3af" />
            <TextInput
              placeholder={t("email")}
              value={email}
              onChangeText={setEmail}
              className="flex-1 p-4 ml-2"
            />
          </View>

          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 border border-gray-200">
            <Ionicons name="lock-closed-outline" size={18} color="#9ca3af" />
            <TextInput
              placeholder={t("password")}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              className="flex-1 p-4 ml-2"
            />
          </View>

        </View>

        <TouchableOpacity
          onPress={handleRegister}
          className="bg-green-500 p-4 rounded-xl mt-6 shadow-md active:opacity-80"
        >
          <Text className="text-white text-center font-bold text-lg">
            {t("createAccount")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-5"
        >
          <Text className="text-center text-blue-500 font-medium">
            {t("alreadyHaveAccount")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}