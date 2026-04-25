import { useEffect, useState, useContext } from "react";
import { Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import { AuthContext } from "../contexts/AuthContext";
import { getNoteById } from "../services/noteService";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

export default function MapScreen() {
  const { user } = useContext(AuthContext);
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();

  const [note, setNote] = useState<any>(null);

  useEffect(() => {
    async function loadNote() {
      if (user?.uid && typeof id === "string") {
        const data = await getNoteById(user.uid, id);
        setNote(data);
      }
    }

    loadNote();
  }, [user, id]);

  if (!note?.latitude || !note?.longitude) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-600">
          {t("noLocation")}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text className="text-xl font-bold text-center my-4 text-gray-800">
        {t("map")}
      </Text>

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: note.latitude,
          longitude: note.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Marker
          coordinate={{
            latitude: note.latitude,
            longitude: note.longitude
          }}
          title={note.text}
          description={`${note.quantity} • ${note.category}`}
        />
      </MapView>
    </SafeAreaView>
  );
}