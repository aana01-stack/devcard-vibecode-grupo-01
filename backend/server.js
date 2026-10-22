const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

// O Render define a porta por ambiente; localmente usamos 3000.
const porta = process.env.PORT || 3000;

// Build do React, gerado por `npm run build` na raiz do projeto.
const pastaFrontend = path.join(__dirname, "..", "frontend", "dist");
const arquivoIndex = path.join(pastaFrontend, "index.html");

app.use(cors());
app.use(express.json());

const perfil = {
  nome: "Dev em Formação",
  apelido: "Code Student",
  turma: "3º SIS",
  area: "Programação Mobile e Back-End",
  status: "Aprendendo a criar projetos reais com apoio da IA",
  bio: "Estudante de Desenvolvimento de Sistemas explorando React, Node, Express e boas práticas de vibecoding.",
};

const habilidades = [
  {
    nome: "React",
    nivel: "iniciante",
    descricao: "Criar interfaces usando componentes, estado e eventos.",
  },
  {
    nome: "Node.js",
    nivel: "iniciante",
    descricao: "Executar JavaScript fora do navegador.",
  },
  {
    nome: "Express",
    nivel: "iniciante",
    descricao: "Criar rotas e APIs simples.",
  },
  {
    nome: "API REST",
    nivel: "iniciante",
    descricao: "Fazer sistemas conversarem usando rotas e JSON.",
  },
  {
    nome: "Vibecoding",
    nivel: "em evolução",
    descricao: "Usar IA para acelerar a criação, sem deixar de entender o código.",
  },
];

const projetos = [
  {
    nome: "DevLab Fundamentos",
    tipo: "Projeto de estudo",
    descricao: "Miniapp criado para entender React, estado, eventos, API e JSON.",
  },
  {
    nome: "DevCard VibeCode",
    tipo: "Projeto prático",
    descricao: "Cartão digital de desenvolvedor conectado a uma API Express.",
  },
  {
    nome: "API de Frases Dev",
    tipo: "Back-end",
    descricao: "Rota que retorna frases aleatórias para motivar estudantes de programação.",
  },
];

const frases = [
  "A IA acelera, mas o entendimento guia.",
  "Programar é transformar problemas grandes em passos pequenos.",
  "Código bom é aquele que funciona, pode ser lido e pode ser melhorado.",
  "Antes de pedir para a IA criar, descreva bem o que você quer.",
  "Vibecoding não é parar de programar: é aprender a orientar melhor a máquina.",
  "Quem entende a lógica consegue revisar melhor o que a IA entrega.",
];

const contato = {
  email: "dev.formacao@escola.edu.br",
  github: "https://github.com/code-student-dev",
  linkedin: "https://www.linkedin.com/in/dev-em-formacao",
};

function sortearFrase() {
  const indice = Math.floor(Math.random() * frases.length);
  return frases[indice];
}

// A raiz "/" agora e do frontend. As informacoes da API ficam em "/api".
app.get("/api", (req, res) => {
  res.json({
    mensagem: "API do DevCard VibeCode está funcionando.",
    rotas: [
      "/api/perfil",
      "/api/habilidades",
      "/api/projetos",
      "/api/frase",
      "/api/devcard",
      "/api/curtidas",
      "/api/contato",
    ],
  });
});

app.get("/api/perfil", (req, res) => {
  res.json(perfil);
});

app.get("/api/habilidades", (req, res) => {
  res.json(habilidades);
});

app.get("/api/projetos", (req, res) => {
  res.json(projetos);
});

app.get("/api/frase", (req, res) => {
  res.json({
    frase: sortearFrase(),
  });
});

app.get("/api/contato", (req, res) => {
  res.json(contato);
});

app.get("/api/devcard", (req, res) => {
  res.json({
    perfil,
    habilidades,
    projetos,
    fraseInicial: sortearFrase(),
  });
});

let curtidas = 0;

app.get("/api/curtidas", (req, res) => {
  res.json({ curtidas });
});

app.post("/api/curtidas", (req, res) => {
  curtidas += 1;
  res.json({ curtidas });
});

// --- Servindo o frontend compilado ---

// 1) Arquivos reais do build (JS, CSS, imagens, favicon).
app.use(express.static(pastaFrontend));

// 2) Qualquer outra pagina abre o index.html do React (rotas do navegador).
app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return next();
  }

  if (req.path.startsWith("/api/")) {
    return next();
  }

  if (!fs.existsSync(arquivoIndex)) {
    return res.status(503).json({
      erro: "Frontend ainda nao compilado.",
      dica: "Rode `npm run build` na raiz do projeto antes de `npm start`.",
    });
  }

  res.sendFile(arquivoIndex);
});

// --- Erro: rota de API desconhecida devolve JSON ---

app.use((req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada.",
    dica: "Confira se o endereço foi digitado corretamente.",
    rotasDisponiveis: [
      "/api",
      "/api/perfil",
      "/api/habilidades",
      "/api/projetos",
      "/api/frase",
      "/api/devcard",
      "/api/curtidas",
      "/api/contato",
    ],
  });
});

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
  console.log(`Frontend compilado em: ${arquivoIndex}`);
});

