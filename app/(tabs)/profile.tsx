import { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Usuário:
        </Text>

        <Text style={{ fontSize: 16, marginTop: 5 }}>
          {user?.email || "Não identificado"}
        </Text>
      </View>

      <Button title="Sair" onPress={handleLogout} />

    </SafeAreaView>
  );
}