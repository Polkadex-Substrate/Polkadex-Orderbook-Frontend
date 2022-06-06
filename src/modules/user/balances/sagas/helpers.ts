import { eventChannel } from "redux-saga";
import { u8aToString } from "@polkadot/util";

import { RabbitmqChannelType } from "@polkadex/orderbook/modules/public/rabbitmqChannel";

export async function fetchBalanceUpdatesChannel(
  chann: RabbitmqChannelType,
  queueName: string,
  routingKey: string
) {
  const queue = await chann.queue(queueName, { durable: false, autoDelete: true });
  await queue.bind("topic_exchange", routingKey);
  console.log("created balance update queue", queueName);
  return eventChannel((emitter) => {
    const amqpConsumer = queue.subscribe({ noAck: false }, (res) => {
      const msg = u8aToString(res.body);
      console.log("balance update msg =>", msg);
      emitter(msg);
      res.ack();
    });
    return () => {
      amqpConsumer.then((consumer) => consumer.cancel());
    };
  });
}
