# UniBet - Sistema Simulado de Apostas Esportivas

## Integrantes

* Pedro Lucas Ventura
* Matheus Steiner Milleto

---

# Descrição do Projeto

O UniBet é um sistema web de apostas esportivas fictícias desenvolvido para fins acadêmicos utilizando React, Context API, React Router DOM e JSON Server.

O sistema permite que usuários realizem apostas em eventos esportivos cadastrados pelo administrador, acompanhem seu saldo, visualizem histórico de apostas e consultem o ranking de jogadores.

O administrador possui acesso a funcionalidades exclusivas para gerenciamento dos eventos esportivos.

---

# Objetivos do Projeto

* Aplicar conceitos de React.
* Utilizar React Router DOM para navegação.
* Utilizar Context API para gerenciamento de autenticação.
* Consumir dados de uma API simulada através do JSON Server.
* Trabalhar com Hooks do React.
* Organizar o projeto utilizando componentes reutilizáveis.
* Simular regras de negócio de um sistema de apostas esportivas.

---

# Tecnologias Utilizadas

* React
* React Router DOM
* Context API
* Axios
* JSON Server
* JavaScript
* CSS
* GitHub

---

# Funcionalidades do Sistema

## Usuário

* Login no sistema
* Cadastro de novos usuários
* Visualização de eventos esportivos
* Realização de apostas
* Escolha do time vencedor da aposta
* Consulta de saldo
* Consulta de histórico de apostas
* Consulta de ranking de jogadores

## Administrador

* Login administrativo
* Cadastro de eventos esportivos
* Exclusão de eventos
* Encerramento das apostas
* Definição dos resultados dos eventos
* Atualização automática das apostas
* Atualização automática do saldo dos usuários

---

# Funcionalidade Extra

## Ranking de Jogadores

O sistema possui um ranking que classifica os usuários de acordo com o saldo disponível.

A classificação é atualizada automaticamente conforme os resultados das apostas.

---

# Regras de Negócio

### Cadastro de Usuários

* Novos usuários podem ser cadastrados.
* Todo usuário inicia com saldo fictício de R$ 1000,00.

### Realização de Apostas

* O usuário escolhe um evento.
* O usuário escolhe um dos times participantes.
* O usuário informa o valor da aposta.
* O valor apostado é descontado do saldo.

### Resultado dos Eventos

* O administrador define o vencedor do evento.
* O sistema verifica automaticamente todas as apostas pendentes.

### Usuário Vencedor

* Recebe o dobro do valor apostado.

Exemplo:

Aposta de R$ 100

Retorno:

R$ 200

### Usuário Perdedor

* Não recebe retorno.

### Ranking

* O ranking é ordenado pelo saldo dos usuários.
* Quanto maior o saldo, melhor a posição no ranking.

---

# Hooks Utilizados

## useState

Utilizado para armazenar estados locais dos componentes.

Exemplos:

* Formulários
* Eventos
* Usuários
* Apostas

## useEffect

Utilizado para carregar informações da API quando os componentes são renderizados.

Exemplos:

* Carregar usuários
* Carregar eventos
* Carregar histórico
* Carregar ranking

## useContext

Utilizado através do AuthContext para compartilhar as informações do usuário autenticado.

---

# Context API

Foi criado um AuthContext responsável por:

* Armazenar o usuário logado.
* Disponibilizar login.
* Disponibilizar logout.
* Controlar o acesso às rotas protegidas.

---

# Estrutura do Projeto

```text
src/
│
├── components/
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
│
├── contexts/
│   └── AuthContext.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── UsuarioDashboard.jsx
│   ├── EventosAdmin.jsx
│   ├── Eventos.jsx
│   ├── Apostar.jsx
│   ├── Historico.jsx
│   ├── Ranking.jsx
│   └── NotFound.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── services/
│   └── api.js
│
├── styles/
│   └── global.css
│
├── App.jsx
└── main.jsx
```

---

# Principais Rotas

```text
/login
/register
/
/eventos
/apostar
/historico
/ranking
/admin
```

---

# Consumo da API

O sistema utiliza Axios para consumir os dados do JSON Server.

Exemplos:

```javascript
api.get("/usuarios");
api.get("/eventos");
api.post("/apostas");
api.patch("/usuarios/2");
api.delete("/eventos/1");
```

---

# Como Executar o Projeto

## Instalar Dependências

```bash
npm install
```

## Executar o React

```bash
npm run dev
```

---

# Executar JSON Server

```bash
npx json-server db.json --watch --port 3000
```

---

# Usuários de Teste

## Administrador

Email:

```text
admin@bet.com
```

Senha:

```text
123
```

## Usuário

Email:

```text
user@bet.com
```

Senha:

```text
123
```

Também é possível cadastrar novos usuários diretamente pelo sistema.

---

# Divisão de Tarefas

## Pedro Lucas Ventura

* Configuração inicial do projeto
* AuthContext
* Rotas protegidas
* Dashboard do usuário
* Sistema de apostas
* Cadastro de usuários
* Melhorias visuais
* Integração entre apostas, saldo e ranking

## Matheus Steiner Milleto

* Tela de Login
* Histórico de apostas
* Ranking de jogadores
* Integração com JSON Server
* Painel administrativo
* Cadastro e exclusão de eventos
* Testes e validações

---

# Dificuldades Encontradas

* Controle de autenticação.
* Atualização automática dos saldos.
* Integração entre eventos e apostas.
* Atualização do ranking.
* Consumo de dados utilizando JSON Server.
* Controle de rotas protegidas.

---

# Melhorias Futuras

* Cadastro de esportes diferentes.
* Upload de imagens para eventos.
* Odds dinâmicas.
* Estatísticas dos usuários.
* Histórico financeiro detalhado.
* Melhor responsividade para dispositivos móveis.

---

# Conclusão

O projeto permitiu aplicar conceitos importantes de desenvolvimento front-end utilizando React, Hooks, Context API, React Router DOM e consumo de APIs.

Através do UniBet foi possível simular um sistema completo de apostas esportivas, incluindo autenticação, gerenciamento de eventos, controle de saldo, histórico de apostas e ranking de usuários.
