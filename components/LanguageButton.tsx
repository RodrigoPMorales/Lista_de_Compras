import { TouchableOpacity, Text } from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LanguageButton() {
  const { i18n } = useTranslation();

  async function changeLanguage() {
    const newLanguage = i18n.language === "pt" ? "en" : "pt";

    await i18n.changeLanguage(newLanguage);
    await AsyncStorage.setItem("appLanguage", newLanguage);
  }

  return (
    <TouchableOpacity
      onPress={changeLanguage}
      className="self-center mt-4 border border-gray-300 px-4 py-2 rounded-lg"
    >
      <Text className="text-gray-700 font-medium">
        {i18n.language === "pt" ? "EN" : "PT"}
      </Text>
    </TouchableOpacity>
  );
}