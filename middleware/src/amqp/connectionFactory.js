import * as amqp from "amqplib";

export function setupAQMPConnection() {
  return amqp.connect(process.env.RABBITMQ_ADDR).then(function (conn) {
    return conn.createChannel();
  });
}
