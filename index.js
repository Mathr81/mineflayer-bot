require('dotenv').config();
const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: process.env.SERVER_IP, // Adresse IP du serveur Minecraft
  username: process.env.BOT_USERNAME, // Nom d'utilisateur du bot Minecraft
  port: process.env.SERVER_PORT, // Port du serveur Minecraft
});

function jump() {
  bot.setControlState('jump', true);
  setTimeout(() => {
    bot.setControlState('jump', false);
  }, 500);
}

function getRandomJumpTime() {
  return Math.floor(Math.random() * (30000 - 5000 + 1)) + 5000; // Génère un temps aléatoire entre 5 et 30 secondes en millisecondes
}

bot.on('spawn', () => {
  console.log('Bot connecté !');
  setInterval(() => {
    jump();
    console.log('Le bot a sauté !');
  }, getRandomJumpTime());
});

function lookAtNearestPlayer() {
  const playerFilter = (entity) => entity.type === 'player';
  const playerEntity = bot.nearestEntity(playerFilter);

  if (!playerEntity) return;

  const pos = playerEntity.position.offset(0, playerEntity.height, 0);
  bot.lookAt(pos);
}

bot.on('physicTick', lookAtNearestPlayer);

bot.on('kicked', (reason, loggedIn) => {
  console.log('Bot expulsé :', reason);
});

bot.on('error', (err) => {
  if (err.message.includes('ECONREFUSED')) {
    console.log('Le serveur est éteint ou fermé.');
  } else {
    console.log('Erreur du bot :', err);
  }
});
