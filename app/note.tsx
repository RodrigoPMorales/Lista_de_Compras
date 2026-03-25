import { useState, useEffect, useContext } from "react";
import { TextInput, Button, Alert } from "react-native";
import { createNote, updateNote, getNoteById } from "../services/noteService";
import { AuthContext } from "../contexts/AuthContext";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Note() {
  const { user } = useContext(AuthContext);
  const { id } = useLocalSearchParams();

  const noteId = typeof id === "string" ? id : null;

  const [text, setText] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    async function load() {
      if (noteId) {
        const note: any = await getNoteById(noteId);
        if (note) {
          setText(note.text || "");
          setQuantity(note.quantity || "");
          setCategory(note.category || "");
        }
      }
    }
    load();
  }, [noteId]);

  async function handleSave() {
    if (!text.trim() || !quantity.trim() || !category.trim()) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      if (noteId) {
        await updateNote(noteId, { text, quantity, category });
      } else {
        await createNote(user.uid, {
          text,
          quantity,
          category,
          checked: false
        });
      }

      router.back();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar.");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder="Produto" value={text} onChangeText={setText} />
      <TextInput placeholder="Quantidade" value={quantity} onChangeText={setQuantity} />
      <TextInput placeholder="Categoria" value={category} onChangeText={setCategory} />
      <Button title={noteId ? "Atualizar" : "Salvar"} onPress={handleSave} />
    </SafeAreaView>
  );
}