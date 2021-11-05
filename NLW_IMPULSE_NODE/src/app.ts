import "dotenv/config"
import express from "express";

import http from "http"
import cors from "cors"

import { Server } from "socket.io"
import { router } from "./routes";

const app = express();
app.use(cors())

const serverHttp = http.createServer(app)

/*
  criação do servidor usando o http, o express e o  web socket
*/
const io = new Server(serverHttp, {
  cors:{
    origin: "*"
  }
});
io.on("connection", socket =>{
  console.log(`Usuário conectado no socket ${socket.id}`)
})

app.use(express.json());

app.use(router);

/*
  ele vai no github se atenticar dentro da aplicação
*/

app.get("/github", (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

/*
Rota de callback pra para validar se o usuario tem permissao do token
*/

app.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  return response.json(code)
})

export {serverHttp, io}



