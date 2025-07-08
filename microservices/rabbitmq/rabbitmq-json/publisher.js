import amqp from 'amqplib'
import Person from './persons.json' assert { type: "json" }

// open multiple publisher with queue name

const connect_rabbitmq = async () => {
  try {
    const con = await amqp.connect('amqp://localhost:5672')
    const channel = await con.createChannel()
    const assert = await channel.assertQueue('queueName')

    Person.forEach(item => {
      if(item.index > 600) {
        channel.sendToQueue('queueName', Buffer.from(JSON.stringify(item.index)))
        console.log(item.index)
      }
    })

  } catch (error) {
    console.error(error)
  }
}
connect_rabbitmq()