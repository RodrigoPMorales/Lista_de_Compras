import { useState, useEffect, useContext } from "react";
import { TextInput, Button, Alert } from "react-native";
import { createNote, updateNote, getNoteById } from "../services/noteService";
import { AuthContext } from "../contexts/AuthContext";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { t } from "i18next";

export default function Note() {
  const { user } = useContext(AuthContext);
  const { id } = useLocalSearchParams();

  const noteId = typeof id === "string" ? id : null;

  const [text, setText] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function load() {
      if (noteId && user?.uid) {
        const note: any = await getNoteById(user.uid, noteId);
        if (note) {
          setText(note.text);
          setQuantity(note.quantity);
          setCategory(note.category);
        }
      }
    }
    load();
  }, [noteId]);

  async function handleSave() {
    if (!text.trim() || !quantity.trim() || !category.trim()) {
      Alert.alert("Erro", t("fillFields"));
      return;
    }

    if (noteId) {
      await updateNote(user.uid, noteId, {
        text,
        quantity,
        category
      });
    } else {
      await createNote(user.uid, {
        text,
        quantity,
        category,
        checked: false
      });
    }

    router.back();
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder={t("product")} value={text} onChangeText={setText} />
      <TextInput placeholder={t("quantity")} value={quantity} onChangeText={setQuantity} />
      <TextInput placeholder={t("category")} value={category} onChangeText={setCategory} />
      <Button title={t("save")} onPress={handleSave} />
    </SafeAreaView>
  );
}