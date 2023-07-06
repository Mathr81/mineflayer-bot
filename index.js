require('dotenv').config()
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: process.env.SERVER_IP, // minecraft server ip
  username: process.env.BOT_USERNAME, // minecraft username
  port: process.env.SERVER_PORT,
})

function jump () {
    bot.setControlState('jump', true)
    setTimeout(() => {
        bot.setControlState('jump', false)
    }, 500);
}

bot.on('spawn', () => {
    console.log('Bot connecté !');
    setInterval(() => {
        if (Math.random() < 0.5) {
            jump();
        }
    }, 30000);
});

function lookAtNearestPlayer () {
    const playerFilter = (entity) => entity.type === 'player'
    const playerEntity = bot.nearestEntity(playerFilter)
    
    if (!playerEntity) return
    
    const pos = playerEntity.position.offset(0, playerEntity.height, 0)
    bot.lookAt(pos)
  }
  
bot.on('physicTick', lookAtNearestPlayer)

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  bot.chat(message)
})

// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)