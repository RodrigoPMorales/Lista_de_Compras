import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { subscribeNotes, deleteNote, updateNote } from "../../services/noteService";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { user } = useContext(AuthContext);

  const [notes, setNotes] = useState<any[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    if (!user) return;

    const unsub = subscribeNotes(user.uid, (data: any[]) => {
      setNotes(data);
      setLoading(false);
    });

    return unsub;
  }, [user]);

  useEffect(() => {
    let data = [...notes];

    if (search) {
      data = data.filter(item =>
        item.text.toLowerCase().includes(search.toLowerCase())
      );
    }

    
    data.sort((a, b) => {
      if (ascending) {
        return a.text.localeCompare(b.text);
      } else {
        return b.text.localeCompare(a.text);
      }
    });

    setFilteredNotes(data);
  }, [search, notes, ascending]);

  
  function confirmDelete(id: string) {
    Alert.alert(
      "Excluir item",
      "Tem certeza que deseja excluir?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: () => deleteNote(id),
          style: "destructive"
        }
      ]
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      
      
      <TextInput
        placeholder="Buscar item..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 10,
          marginBottom: 10
        }}
      />

      
      <TouchableOpacity
        onPress={() => setAscending(!ascending)}
        style={{ marginBottom: 10 }}
      >
        <Text>
          Ordenar: {ascending ? "A → Z" : "Z → A"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 15,
              marginBottom: 10,
              backgroundColor: "#eee",
              borderRadius: 10
            }}
          >

            
            <TouchableOpacity
              style={{ flexDirection: "row", gap: 10 }}
              onPress={() =>
                updateNote(item.id, { checked: !item.checked })
              }
            >
              <Ionicons
                name={item.checked ? "checkbox" : "square-outline"}
                size={22}
                color={item.checked ? "green" : "gray"}
              />

              <View>
                <Text
                  style={{
                    textDecorationLine: item.checked ? "line-through" : "none"
                  }}
                >
                  {item.text}
                </Text>

                <Text style={{ fontSize: 12 }}>Quantidade: 
                  {item.quantity} • {item.category}
                </Text>
              </View>
            </TouchableOpacity>

            
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={() => router.push(`/note?id=${item.id}`)}
              >
                <Ionicons name="pencil" size={20} color="blue" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>

          </View>
        )}
      />

      
      <TouchableOpacity onPress={() => router.push("/note")}>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          + Novo Item
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}