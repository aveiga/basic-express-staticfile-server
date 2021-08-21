import request from "supertest";
import { server } from "../index";

describe('GET Guitar Endpoints', () => {
  it('should get a guitars list', async () => {
    const res = await request(server)
      .get('/unsecure-guitars');

    expect(res.statusCode).toEqual(200)
    return expect(res.body).not.toBeUndefined();
  })
});

afterAll(() => {
  server.close();
});