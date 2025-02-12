
import request from "supertest";
import { app, server } from "../src/index"; 

describe("User API", () => {
  afterAll((done) => {
    if (server) {
      server.close(done); 
    } else {
      done(); 
    }
  });

  it("should return 200 for health check", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
  });
});
