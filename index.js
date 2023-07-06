const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'EverytimeBot.aternos.me', // minecraft server ip
  username: 'mineflayer-bot', // minecraft username
  // auth: 'microsoft' // for offline mode servers, you can set this to 'offline'
  port: 25269,                // only set if you need a port that isn't 25565
  // version: false,             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // password: '12345678'        // set if you want to use password-based auth (may be unreliable)
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
    }, 60000);
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