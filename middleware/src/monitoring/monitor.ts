import client from "prom-client";

export function setupMonitoring(app) {
  const register = new client.Registry();
  if (process.env.APP_NAME) {
    // client.collectDefaultMetrics({ app: process.env.APP_NAME, register });
    client.collectDefaultMetrics({ register });
  } else {
    client.collectDefaultMetrics({ register });
  }

  app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", register.contentType);
    res.send(await register.metrics());
  });

  return register;
}
