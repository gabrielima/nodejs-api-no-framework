import test from "node:test";
import assert from "node:assert";
import { promisify } from "node:util";

test("Hero Integration Test Suite", async (t) => {
  const testPort = 9003;

  process.env.PORT = testPort;
  const { server } = await import("../../src/index.js");
  const testServerAddress = `http://localhost:${testPort}/teste`;

  await t.todo("it should create a hero", async (t) => {
    const data = {
      name: "Teste",
      age: 10,
      city: "NYC",
    };
  });

  await promisify(server.close.bind(server));
});
