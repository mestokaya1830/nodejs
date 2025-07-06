import express from "express";
const app = express()
import { EmbedBuilder, WebhookClient } from 'discord.js'
import helmet from 'helmet'


app.use(helmet())
app.use(express.json())
app.use(express.static('public'))

//discord webhook token and id
//https://discordapp.com/api/webhooks/1219083842724434010/8hEbvjRuAscS9G6AidmwJgoOqUuxl-K0DxCO0_nZc_729QuSlTDWcQu8Br6njxkVos9-

const webhook = new WebhookClient({id:'1219083842724434010', token: '8hEbvjRuAscS9G6AidmwJgoOqUuxl-K0DxCO0_nZc_729QuSlTDWcQu8Br6njxkVos9-'})
// webhook.send('How are you?').then(() => {
//   console.log('message sent!')
// })

//or
const embed = new EmbedBuilder()
	.setTitle('Some Title')
	.setColor(0x00FFFF);

  webhook.send({
		content: 'Webhook test',
		username: 'some-username',
		avatarURL: 'https://i.imgur.com/AfFp7pu.png',
		embeds: [embed],
	});

app.listen(3000, () => console.log('Server is running...'))