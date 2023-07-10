import amqp from 'amqplib'

// open multiple consumer with queue name

const connect_rabbitmq = async () => {
  try {
    const con = await amqp.connect('amqp://localhost:5672')
    const channel = await con.createChannel()
    const assert = await channel.assertQueue('jobsQueue')

    channel.consume('jobsQueue', (result) => {
      console.log(result.content.toString())
      channel.ack(result)//mark as readed
    })

  } catch (error) {
    console.error(error)
  }
}
connect_rabbitmq()