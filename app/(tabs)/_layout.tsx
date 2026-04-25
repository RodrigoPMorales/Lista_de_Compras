import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { t } from "i18next";
import "../../translations/i18n";


export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>

        <Tabs.Screen
        name="profile"
        options={{
          title: t("profile"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="home"
        options={{
          title: "Lista",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />

      

    </Tabs>
  );
}