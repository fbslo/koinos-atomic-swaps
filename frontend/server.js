//Proxy by @joticajulian: https://github.com/joticajulian/kondor/blob/main/server.js
require("dotenv").config()
const fastify = require("fastify")({ logger: true });
const path = require("path");
const axios = require("axios");

let PORT = process.env.IS_LIVE == "false" ? 8080 : 8088

// proxy jsonrpc to avoid cors issues
const apiKoinos = "https://api.koinos.io";

fastify.options("/jsonrpc", async (req, reply) => {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, X-Auth-Token"
  );
  reply.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  reply.send({});
});

fastify.post("/jsonrpc", async (req, reply) => {
  const response = await axios.post(apiKoinos, req.body);
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  reply.send(response.data);
});

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/",
});

const start = async () => {
  try {
    await fastify.listen({port: PORT, host: "0.0.0.0"});
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
