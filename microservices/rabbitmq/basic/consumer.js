import amqp from 'amqplib'

const emailConsumer = async () => {
  const con = await amqp.connect('amqp://localhost:5672')
  const channel = await con.createChannel()
  const assert = await channel.assertQueue('emailQueue')
  setTimeout(() => {
    channel.consume('emailQueue', (result) => {
      console.log(result.content.toString())
      channel.ack(result)//finished and delete queue
    })
  }, 5000)
}

export default  emailConsumer