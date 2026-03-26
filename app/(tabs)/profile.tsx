import { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  if (!user) return null;

  return (
    <SafeAreaView className="flex-1 justify-center items-center px-6 bg-white">

      <Ionicons name="person-outline" size={50} color="#6b7280" />

      <Text className="font-bold text-gray-900 mt-1 mb-6">
        {user.email}
      </Text>

      <TouchableOpacity
        onPress={logout}
        className="bg-red-500 px-6 py-3 rounded-lg active:opacity-80"
      >
        <Text className="text-white font-bold">
          Sair
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}