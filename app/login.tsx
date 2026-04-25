import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  View
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import LanguageButton from "../components/LanguageButton";
import {
  requestNotificationPermission,
  sendNotification,
} from "../services/notificationService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { t } = useTranslation();

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const allowed = await requestNotificationPermission();

       if (allowed) {
      await sendNotification(t("welcome"), t("welcomeMessage"));
    }

      router.replace("/(tabs)/home");
    } catch {
      Alert.alert(t("error"), t("invalidLogin"));
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center mt-10 px-6">
        <Ionicons name="cart-outline" size={48} color="#3b82f6" />

        <Text className="text-3xl font-bold text-gray-800 mt-2">
          {t("appName")}
        </Text>

        <Text className="text-gray-500 text-center mt-1">
          {t("appDescription")}
        </Text>

        <LanguageButton />
      </View>

      <View className="flex-1 justify-center px-6">
        <View className="flex-row items-center justify-center mb-6">
          <Ionicons name="log-in-outline" size={20} color="#6b7280" />
          <Text className="text-lg text-gray-600 ml-2 font-medium">
            {t("loginTitle")}
          </Text>
        </View>

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
          onPress={handleLogin}
          className="bg-blue-500 p-4 rounded-xl mt-6 shadow-md active:opacity-80"
        >
          <Text className="text-white text-center font-bold text-lg">
            {t("login")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/register")}
          className="mt-5"
        >
          <Text className="text-center text-blue-500 font-medium">
            {t("createAccount")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}