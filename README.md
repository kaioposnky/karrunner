# 🚗 Kar Runner

**Kar Runner** é um jogo de corrida 2D infinito para dispositivos móveis, onde o jogador controla um carro usando o acelerômetro do celular para desviar de obstáculos e competir pela maior pontuação. O jogo conta com um sistema de autenticação, coleção de carros com diferentes raridades e um placar de líderes global.

[![Imagem Menu Principal](https://i.postimg.cc/6p1rzjHx/IMG-20251110-WA0005.jpg)](https://postimg.cc/750JZV8K)

## ✨ Funcionalidades

O aplicativo é dividido em várias áreas principais:

### 1. 🏎️ Tela de Jogo
- **Gameplay Infinita:** Desvie de outros carros em uma estrada sem fim. A dificuldade aumenta progressivamente.
- **Controle por Acelerômetro:** Incline seu dispositivo para uma experiência de jogo imersiva.
- **Pontuação em Tempo Real:** Acompanhe sua pontuação enquanto joga.
- **Feedback Sonoro:** Efeitos sonoros para colisões e música de fundo para aumentar a imersão.

[![Imagem Jogo](https://i.postimg.cc/0yHYZWtb/IMG-20251110-WA0013.jpg)](https://postimg.cc/tsWn45Gj)
[![Imagem Fim do Jogo](https://i.postimg.cc/W1fGSW94/IMG-20251110-WA0012.jpg)](https://postimg.cc/HrX8k21G)

### 2. 👤 Autenticação e Usuários
- **Login e Registro:** Sistema completo de autenticação com e-mail e senha.
- **Perfil de Usuário:** Uma tela dedicada para ver sua maior pontuação, saldo de moedas, os carros que você possui e alterar entre tema claro e escuro.

[![Imagem Login](https://i.postimg.cc/Z5D8j7fS/IMG-20251110-WA0006.jpg)](https://postimg.cc/SnCYxrFT)
[![Imagem Registro](https://i.postimg.cc/DwzQrkc7/IMG-20251110-WA0004.jpg)](https://postimg.cc/Vd3bwhTh)
[![Imagem Perfil do Usuário](https://i.postimg.cc/kghQw1j9/IMG-20251110-WA0008.jpg)](https://postimg.cc/sM7Ggcd0)

### 3. 🎰 Roleta de Carros
- **Desbloqueie Novos Carros:** Use as moedas ganhas no jogo para tentar a sorte e ganhar novos carros.
- **Sistema de Raridade:** Carros são divididos em raridades: `Comum`, `Raro`, `Épico` e `Lendário`.

[![Imagem Roleta Carro](https://i.postimg.cc/T3HVQ7kR/IMG-20251110-WA0010.jpg)](https://postimg.cc/mPC1gwfq)

### 4. 🏆 Tela de Ranking
- **Ranking Global:** Compare sua pontuação com a de todos os outros jogadores.
- **Competição:** Veja quem está no topo e tente alcançá-los!

*(insira um screenshot da tela de leaderboard aqui)*

### 5. 🚗 Seleção de Carros
- **Escolha seu Veículo:** Na tela de seleção, você pode ver todos os carros disponíveis no jogo e quais você já desbloqueou.
- **Seleção Estratégica:** Escolha qualquer um dos seus carros desbloqueados antes de cada corrida. A seleção é salva e se torna o seu carro padrão.
- **Impacto no Jogo:** A raridade do carro selecionado afeta a jogabilidade! Carros mais raros (`Raro`, `Épico`, `Lendário`) possuem um multiplicador de velocidade, tornando-os mais ágeis e sensíveis aos movimentos do acelerômetro.

[![Imagem Seleção de Carros](https://i.postimg.cc/DwYr5jCk/IMG-20251110-WA0007.jpg)](https://postimg.cc/68n4p0JY)

---

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia |
| :--- | :--- |
| **Framework Principal** | React Native |
| **Plataforma** | Expo |
| **Linguagem** | TypeScript |
| **Estilização** | NativeWind (Tailwind CSS) |
| **Navegação** | React Navigation |
| **Backend & DB** | Firebase (Authentication, Realtime Database) |
| **Sensores** | `expo-sensors` |
| **Áudio & Efeitos** | `expo-av`, `react-native-toast-message` |

---

## ⚙️ Instalação e Execução

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão LTS)
- [Git](https://git-scm.com/)
- App [Expo Go](https://expo.dev/go) em um dispositivo iOS ou Android.

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/karrunner.git
    cd karrunner
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o Firebase:**
    - Crie um projeto no [Console do Firebase](https://console.firebase.google.com/).
    - Adicione um aplicativo da Web ao seu projeto.
    - Vá para **Build > Realtime Database**, crie um banco de dados e inicie em modo de teste.
    - Nas **Configurações do Projeto**, copie suas credenciais de configuração da web (`firebaseConfig`).
    - Cole essas credenciais no arquivo `src/config/firebase.config.ts`.

4.  **Execute o aplicativo:**
    ```bash
    npm run start
    ```
    - Escaneie o QR code gerado com o aplicativo Expo Go no seu celular.

---

## 🧠 Aprendizados

### 💡 Aprendizados
- **Integração com Firebase:** Aprofundamento no uso do Firebase para autenticação e banco de dados em tempo real em um app React Native.
- **Hardware do Dispositivo:** Utilização do acelerômetro para criar controles de jogo não convencionais.
- **Gerenciamento de Áudio:** Implementação e controle de efeitos sonoros e música de fundo com `expo-av`.

---

Desenvolvido com ❤️ por Kaio.
