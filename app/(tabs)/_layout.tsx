import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>

        <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
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