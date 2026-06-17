# UniBet - Sistema Simulado de Apostas Esportivas

## Integrantes

* Pedro Lucas Ventura
* Matheus Steiner Milleto

---

## Descrição

O UniBet é um sistema de apostas esportivas fictícias desenvolvido com React para fins acadêmicos.

O sistema possui dois tipos de usuários:

### Administrador

* Cadastrar eventos esportivos
* Excluir eventos
* Encerrar apostas
* Definir resultados dos jogos

### Usuário

* Realizar cadastro
* Fazer login
* Visualizar eventos
* Realizar apostas
* Consultar histórico
* Consultar ranking
* Acompanhar saldo

---

## Tecnologias Utilizadas

* React
* React Router DOM
* Context API
* Axios
* JSON Server
* CSS

---

## Funcionalidade Extra

### Ranking de Jogadores

O sistema possui um ranking que classifica os usuários pelo saldo disponível, atualizado automaticamente após os resultados das apostas.

---

## Hooks Utilizados

### useState

Utilizado para armazenar estados dos componentes.

### useEffect

Utilizado para carregar dados da API.

### useContext

Utilizado através do AuthContext para compartilhar os dados do usuário autenticado.

---

## Estrutura do Projeto

```text
src/
├── components/
├── contexts/
├── pages/
├── routes/
├── services/
├── styles/
├── App.jsx
└── main.jsx
```

---

## Principais Rotas

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

## Como Executar

### Instalar Dependências

```bash
npm install
```

### Executar React

```bash
npm run dev
```

### Executar JSON Server

```bash
npx json-server db.json --watch --port 3000
```

---

## Usuários de Teste

### Administrador

```text
Email: admin@bet.com
Senha: 123
```

### Usuário

```text
Email: user@bet.com
Senha: 123
```

---

## Divisão de Tarefas

### Pedro Lucas Ventura

* Configuração inicial do projeto
* AuthContext
* Rotas protegidas
* Dashboard do usuário
* Sistema de apostas
* Cadastro de usuários
* Melhorias visuais

### Matheus Steiner Milleto

* Tela de Login
* Histórico de apostas
* Ranking
* Painel administrativo
* Cadastro e exclusão de eventos
* Testes e validações

---

## Considerações Finais

O projeto permitiu aplicar conceitos de React, Hooks, Context API, React Router DOM e consumo de APIs através do JSON Server, simulando o funcionamento de uma plataforma de apostas esportivas.
