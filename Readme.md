# Lista de Compras Pro

## Desenvolvido por

Nome: Rodrigo Paes Morales – RM: 560209
Nome: Ruan Nunes Gaspar – RM: 559567

---

## Descrição do Projeto

Este projeto consiste em uma aplicação mobile desenvolvida com React Native utilizando Expo, que permite ao usuário criar e gerenciar uma lista de compras de forma simples, organizada e segura.

A aplicação possui sistema de autenticação, garantindo que cada usuário tenha acesso apenas aos seus próprios dados. Após realizar o login, o usuário pode adicionar, visualizar, editar e excluir itens da sua lista.

Na versão atual, o projeto foi evoluído com funcionalidades adicionais como internacionalização, geolocalização, mapas e sistema de notificações, tornando a aplicação mais completa e próxima de um produto real.

---

## Tecnologias Utilizadas

* React Native
* Expo
* Expo Router
* TypeScript
* Firebase Authentication
* Firebase Firestore
* AsyncStorage
* i18next (internacionalização)
* react-native-maps
* expo-location
* expo-notifications
* NativeWind (Tailwind no React Native)
* EAS Build

---

## Como Rodar o Projeto

### Pré-requisitos

* Node.js instalado
* npm ou yarn
* Expo CLI (via npx)
* Aplicativo Expo Go ou emulador Android

---

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/RodrigoPMorales/Lista_de_Compras.git
```

2. Acesse a pasta do projeto:

```bash
cd lista-compras
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o projeto:

```bash
npx expo start
```

5. Execute o app:

* Escaneie o QR Code com o Expo Go
* Ou execute em um emulador Android

---

## Funcionalidades

### Autenticação

* Cadastro de usuário
* Login e logout
* Persistência de sessão

### Gerenciamento de Itens

* Criação de itens
* Edição de itens
* Exclusão de itens
* Marcação de item como concluído
* Listagem de itens por usuário
* Atualização em tempo real com Firestore

### Internacionalização

* Suporte a idiomas (Português e Inglês)
* Troca dinâmica de idioma
* Interface totalmente traduzida

### Mapas e Geolocalização

* Captura automática de latitude e longitude ao criar um item
* Armazenamento das coordenadas no Firestore
* Visualização do local do item em mapa com marcador

### Notificações

* Notificação de boas-vindas ao realizar login
* Notificação ao criar, editar e excluir itens

### Build do Aplicativo

* Geração de APK utilizando EAS Build
* Aplicativo instalável fora do ambiente de desenvolvimento

---

## Regras de Negócio

* Cada usuário acessa apenas seus próprios itens
* O acesso ao sistema requer autenticação
* Campos obrigatórios são validados antes do envio
* Permissões de localização e notificações são solicitadas ao usuário

---

## APK do Projeto

O aplicativo pode ser instalado através do link gerado pelo EAS Build:

https://expo.dev/accounts/rodrigopmorales/projects/lista-compras/builds/0cfaf2aa-b9d0-4430-8feb-d797c971062c

---

## Vídeo do Projeto

Demonstração das funcionalidades do aplicativo:
CP04:
https://youtu.be/IEnL8bZsmpI
CP05:
https://youtu.be/zJL6jG46bF0

---

## Considerações Finais

O projeto foi desenvolvido com foco em simplicidade, organização e boas práticas de desenvolvimento mobile.

A aplicação atende aos requisitos propostos, incluindo autenticação, persistência de dados, internacionalização, geolocalização, notificações e geração de APK, tornando-se uma solução completa para gerenciamento de listas de compras.
