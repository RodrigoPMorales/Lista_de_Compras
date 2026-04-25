import { useState, useEffect, useContext } from "react";
import {
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  View
} from "react-native";
import { createNote, updateNote, getNoteById } from "../services/noteService";
import { AuthContext } from "../contexts/AuthContext";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { getCurrentLocation } from "../services/locationService";

export default function Note() {
  const { user } = useContext(AuthContext);
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();

  const noteId = typeof id === "string" ? id : null;

  const [text, setText] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function load() {
      if (noteId && user?.uid) {
        const note: any = await getNoteById(user.uid, noteId);

        if (note) {
          setText(note.text || "");
          setQuantity(note.quantity || "");
          setCategory(note.category || "");
        }
      }
    }

    load();
  }, [noteId, user]);

  async function handleSave() {
    if (!text.trim() || !quantity.trim() || !category.trim()) {
      Alert.alert(t("error"), t("fillFields"));
      return;
    }

    try {
      if (noteId) {
        await updateNote(user.uid, noteId, {
          text,
          quantity,
          category
        });
      } else {
        const location = await getCurrentLocation();

        if (!location) {
          Alert.alert(t("error"), t("locationDenied"));
          return;
        }

        await createNote(user.uid, {
          text,
          quantity,
          category,
          checked: false,
          latitude: location.latitude,
          longitude: location.longitude
        });
      }

      router.back();
    } catch {
      Alert.alert(t("error"), "Não foi possível salvar");
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-6 justify-center">
      <Text className="text-2xl font-bold text-gray-800 text-center mb-6">
        {noteId ? t("update") : t("addItem")}
      </Text>

      <View className="gap-4">
        <TextInput
          placeholder={t("product")}
          value={text}
          onChangeText={setText}
          className="bg-gray-100 p-4 rounded-xl border border-gray-200"
        />

        <TextInput
          placeholder={t("quantity")}
          value={quantity}
          onChangeText={setQuantity}
          className="bg-gray-100 p-4 rounded-xl border border-gray-200"
        />

        <TextInput
          placeholder={t("category")}
          value={category}
          onChangeText={setCategory}
          className="bg-gray-100 p-4 rounded-xl border border-gray-200"
        />
      </View>

      <TouchableOpacity
        onPress={handleSave}
        className="bg-blue-500 p-4 rounded-xl mt-6"
      >
        <Text className="text-white text-center font-bold text-lg">
          {noteId ? t("update") : t("save")}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}