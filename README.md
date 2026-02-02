# Frontend Mentor - Social links profile solution

Esta é uma solução para o 
 [Desafio do teste de velocidade de digitação no Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test). Os desafios do Frontend mentor ajudam você a melhorar as suas habilidades de programação através da construção de projetos realísticos.

## Tabela de conteúdos

- [O desafio](#o-desafio)
  - [Funcionalidades](#-funcionalidades)
    - [Controles de teste](#-controles-do-teste)
    - [Experiência de digitação](#-experiência-de-digitação)
    - [Resultados e progresso](#-resultados-e-progresso)
    - [UI - Responsividade](#-ui--responsividade)
- [Links](#links)
- [Construído com](#construído-com)
- [Autor](#autor)

## O desafio

Este projeto foi desenvolvido como um desafio do **Frontend Mentor**. O objetivo é criar um aplicativo de teste de velocidade de digitação o mais fiel possível ao design proposto, utilizando dados de um arquivo local `data.json` para gerar textos aleatórios.


### 🚀 Funcionalidades

#### 🎮 Controles do Teste
* **Início Rápido:** Inicie um teste clicando no botão "Start" ou simplesmente clicando no texto e começando a digitar.
* **Níveis de Dificuldade:** Seleção entre **Easy (Fácil)**, **Medium (Médio)** e **Hard (Difícil)** para textos de complexidade variada.
* **Modos de Jogo:** 
    * **Timed (15s):** Escreva o máximo que puder em 15 segundos.
    * **Timed (30s):** Escreva o máximo que puder em 30 segundos.
    * **Timed (60s):** Escreva o máximo que puder em 60 segundos.
    * **Timed (120s):** Escreva o máximo que puder em 120 segundos.
    * **Passage:** Sem limite de tempo (o cronômetro conta progressivamente).
* **Reinicialização:** Botão de restart disponível a qualquer momento para obter um novo texto aleatório da dificuldade selecionada.

#### ⌨️ Experiência de Digitação
* **Estatísticas em Tempo Real:** Visualização instantânea de **WPM** (Palavras por Minuto), **Precisão** (accuracy) e **Tempo**.
* **Feedback Visual:**
    * Letras corretas em **verde**.
    * Erros em **vermelho e sublinhados**.
    * Indicação visual da posição atual do cursor.
* **Correção de Erros:** Suporte ao uso de *backspace* para corrigir palavras (erros originais continuam contando para a estatística de precisão).

#### 🏆 Resultados e Progresso
* **Tela de Resumo:** Exibição detalhada de WPM, precisão e contagem de caracteres (corretos/incorretos) ao finalizar o teste.
* **Recordes Pessoais:**
    * Mensagem de **"Baseline Established!"** no primeiro teste para definir o recorde inicial.
    * Celebração **"High Score Smashed!"** com confetes ao bater o recorde pessoal.
* **Persistência de Dados:** O melhor resultado pessoal é salvo via `localStorage`, permanecendo disponível mesmo após fechar o navegador.

#### 🌐 Ranking Global (Leaderboard)

Além do recorde pessoal salvo localmente, o projeto conta com um sistema de ranking competitivo global que permite a interação entre diferentes usuários:

* **Registro de Performance com Prisma & TiDB:** Ao finalizar um teste, o usuário pode salvar seu WPM e precisão no banco de dados **TiDB Cloud (MySQL)**. A comunicação é feita através do **Prisma ORM**, garantindo que os dados sejam validados e gravados.
* **API REST em Node.js & Express:** Desenvolvi um backend robusto em **Node.js** utilizando o framework **Express**, processando as requisições de novos recordes e organizando a lógica de classificação.
* **Top 10 Mundial em Tempo Real:** O sistema realiza consultas inteligentes via **Prisma** para filtrar e exibir instantaneamente os 10 melhores resultados globais, permitindo que usuários de diferentes navegadores comparem suas habilidades.
* **Infraestrutura Cloud no Render:** O servidor backend está hospedado no **Render**, configurado com integração contínua (CI/CD) para garantir que cada melhoria no código seja refletida automaticamente no sistema de ranking.
    > **Nota:** Como o projeto utiliza a hospedagem gratuita do Render, o servidor entra em modo de repouso após um período de inatividade. Por isso, a primeira requisição pode levar cerca de 50 segundos para "acordar" o servidor. As requisições seguintes serão mais rápidas.

#### 📱 UI & Responsividade
* **Layout Adaptável:** Experiência otimizada para diferentes tamanhos de tela (Mobile, Tablet e Desktop).
* **Estados de Interação:** Feedback visual de *hover* e *focus* em todos os elementos interativos.


## Links

- Solução URL: [URL da solução](https://github.com/moisesferreira123/typing-speed-test-main)
- Live Site URL: [Live site URL](https://typing-speed-test-main.vercel.app/)


## Construído com

- HTML5
- CSS
- JavaScript
- React
- Tailwind CSS
- DaisyUI
- Node.js
- Express
- Prisma
- MySQL
- Visual Studio Code

## Autor

- Frontend Mentor - [@moisesferreira123](https://www.frontendmentor.io/profile/moisesferreira123)
- GitHub - [@moisesferreira123](https://github.com/moisesferreira123)
- LinkedIn - [Moisés Ferreira](https://linkedin.com/in/moises-ferreira-099278334)
