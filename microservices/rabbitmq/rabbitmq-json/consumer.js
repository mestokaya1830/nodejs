import amqp from 'amqplib'
import Person from './persons.json' assert { type: "json" }

// open multiple consumer with queue name

const connect_rabbitmq = async () => {
  try {
    const con = await amqp.connect('amqp://localhost:5672')
    const channel = await con.createChannel()
    const assert = await channel.assertQueue('queueName')

    channel.consume('queueName', (result) => {
      const personInfo = Person.find(item => item.index == JSON.parse(result.content.toString()))
      console.log(personInfo)
      channel.ack(result)//mark as readed
    })

  } catch (error) {
    console.error(error)
  }
}
connect_rabbitmq()