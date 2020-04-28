// FACTS BOT

// CREATE A BOT from TELEGRAM
// name : FactsBot ; username : facts_2020_bot
const TOKEN = process.env.TOKEN;

// IMPORT
const Telegraf = require('telegraf');

// CONSTANTs
const helpText = 
`
FACTS BOT

/start -
/help - 
`

// Create an object from the Telegraf Class
const bot = new Telegraf(TOKEN);

//CODE
bot.command(['start', 'help'], ctx => {
    ctx.reply(helpText);
});

// LISTENING
bot.launch();