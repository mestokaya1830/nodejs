import amqp from 'amqplib'

const emailPublisher = async (data) => {
  const message = 'Email sent'
  const con = await amqp.connect('amqp://localhost:5672')
  const channel = await con.createChannel()
  const assert = await channel.assertQueue('emailQueue')
  channel.sendToQueue('emailQueue', Buffer.from(JSON.stringify(data)))
}


export default emailPublisher