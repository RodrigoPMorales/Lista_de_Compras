# Lista de Compras com Autenticação

## Desenvolvido por:
# Nome: Rodrigo Paes morales rm:560209
# Nome: Ruan Nunes Gaspar RM:559567

## Descrição do Projeto

Este projeto consiste em uma aplicação mobile desenvolvida com React Native utilizando Expo, que permite ao usuário criar e gerenciar uma lista de compras de forma simples e eficiente.

A aplicação possui sistema de autenticação, garantindo que cada usuário tenha acesso apenas aos seus próprios dados. Após realizar o login, o usuário pode adicionar, visualizar, editar e excluir itens da sua lista de compras.

Além disso, o app conta com atualização em tempo real dos dados e funcionalidades adicionais como marcação de itens como concluídos.

---

## Tecnologias Utilizadas

* React Native
* Expo
* Expo Router
* Firebase Authentication
* Firebase Firestore
* AsyncStorage
* TypeScript

---

## Como Rodar o Projeto

### Pré-requisitos

* Node.js instalado
* npm ou yarn
* Expo CLI (via npx)
* Aplicativo Expo Go no celular

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

5. Abra no celular:

* Escaneie o QR Code com o app **Expo Go**
* Ou execute em emulador Android/iOS

---

## Funcionalidades

* Cadastro de usuário
* Login e Logout
* Persistência de sessão
* Criação de itens na lista
* Listagem de itens por usuário
* Edição de itens
* Exclusão de itens
* Marcar item como concluído
* Atualização em tempo real (Firestore)

---

## Regras de Negócio

* Cada usuário acessa apenas suas próprias listas
* Não é possível acessar o app sem autenticação
* Tratamento de erros básicos (login inválido, campos vazios, etc.)

---

## Video do projeto e suas funcionalidades

 (https://youtu.be/IEnL8bZsmpI)
   


