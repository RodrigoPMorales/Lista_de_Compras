import { useEffect, useState, useContext } from "react";
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
import {
  subscribeNotes,
  deleteNote,
  updateNote
} from "../../services/noteService";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";


export default function Home() {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

  const [notes, setNotes] = useState<any[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [ascending, setAscending] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

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

    data.sort((a, b) =>
      ascending
        ? a.text.localeCompare(b.text)
        : b.text.localeCompare(a.text)
    );

    setFilteredNotes(data);
  }, [search, notes, ascending]);

  function confirmDelete(id: string) {
    Alert.alert("Excluir item", "Tem certeza?", [
      { text: t("cancel"), style: "cancel" },
      {
        text: t("delete"),
        style: "destructive",
        onPress: () => deleteNote(user.uid, id)
      }
    ]);
  }

  async function toggleCheck(item: any) {
    await updateNote(user.uid, item.id, {
      checked: !item.checked
    });
  }

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">

      <TextInput
        placeholder={t("searchItem")}
        value={search}
        onChangeText={setSearch}
        className="border border-gray-300 rounded-xl p-3 mb-3"
      />

      <TouchableOpacity
        onPress={() => setAscending(!ascending)}
        className="mb-3"
      >
        <Text className="text-gray-600">
          {t("sort")} {ascending ? "A → Z" : "Z → A"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/note")}
        className="bg-green-500 py-3 rounded-xl mb-4"
      >
        <Text className="text-white text-center font-semibold">
          {t("addItem")}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl mb-3">

            <TouchableOpacity
              className="flex-row items-center flex-1"
              onPress={() => toggleCheck(item)}
            >
              <Ionicons
                name={item.checked ? "checkbox" : "square-outline"}
                size={22}
                color={item.checked ? "green" : "gray"}
              />

              <View className="ml-3">
                <Text
                  className={`${
                    item.checked ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {item.text}
                </Text>

                <Text className="text-xs text-gray-500">{t("quantity")} : 
                  {item.quantity} • {item.category}
                </Text>
              </View>
            </TouchableOpacity>

            <View className="flex-row gap-3 ml-2">
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
    </SafeAreaView>
  );
}