import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { router } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      router.replace(user ? "/home" : "/login");
    }
  }, [user, loading]);

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}