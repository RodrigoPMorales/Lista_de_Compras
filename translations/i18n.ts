import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

const resources = {
  pt: {
    translation: {
      appName: "Lista de Compras",
      appDescription: "Organize seus itens de forma simples",
      loginTitle: "Entrar na conta",
      email: "Email",
      password: "Senha",
      login: "Entrar",
      createAccount: "Criar conta",
      registerTitle: "Criar Conta",
      registerDescription: "Comece a organizar sua lista agora mesmo",
      fillData: "Preencha seus dados",
      alreadyHaveAccount: "Já tenho conta",
      loggedUser: "Usuário logado:",
      logout: "Sair",
      addItem: "+ Adicionar Item",
      searchItem: "Buscar item...",
      sort: "Ordenar",
      loading: "Carregando...",
      deleteConfirmTitle: "Excluir item",
      deleteConfirmMessage: "Deseja excluir este item?",
      cancel: "Cancelar",
      delete: "Excluir",
      product: "Produto",
      quantity: "Quantidade",
      category: "Categoria",
      save: "Salvar",
      update: "Atualizar",
      error: "Erro",
      invalidLogin: "Login inválido",
      registerError: "Erro ao cadastrar",
      fillFields: "Preencha todos os campos!"
    }
  },
  en: {
    translation: {
      appName: "Shopping List",
      appDescription: "Organize your items easily",
      loginTitle: "Access account",
      email: "Email",
      password: "Password",
      login: "Login",
      createAccount: "Create account",
      registerTitle: "Create Account",
      registerDescription: "Start organizing your list now",
      fillData: "Fill in your data",
      alreadyHaveAccount: "I already have an account",
      loggedUser: "Logged user:",
      logout: "Logout",
      addItem: "+ Add Item",
      searchItem: "Search item...",
      sort: "Sort",
      loading: "Loading...",
      deleteConfirmTitle: "Delete item",
      deleteConfirmMessage: "Do you want to delete this item?",
      cancel: "Cancel",
      delete: "Delete",
      product: "Product",
      quantity: "Quantity",
      category: "Category",
      save: "Save",
      update: "Update",
      error: "Error",
      invalidLogin: "Invalid login",
      registerError: "Register error",
      fillFields: "Fill in all fields!"
    }
  }
};

async function initI18n() {
  const savedLanguage = await AsyncStorage.getItem("appLanguage");
  const deviceLanguage = Localization.getLocales()[0]?.languageCode || "pt";

  await i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage || deviceLanguage,
    fallbackLng: "pt",
    interpolation: {
      escapeValue: false
    }
  });
}

initI18n();

export default i18n;