const supertest = require("supertest");
const mongoose = require("mongoose");
const { app, server } = require("../index");
const api = supertest(app);

test("GET /api/quests", async () => {
  const response = await api.get("/api/quests");
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(3);
});
test("GET /api/quests/:id", async () => {
  const response = await api.get("/api/quests/62c40ddbf24935e7e1f0ad10");
  expect(response.status).toBe(200);
  expect(response.body.title).toBe("Pregunta 1");
});
test("quests returned as json", async () => {
  await api
    .get("/api/quests")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
