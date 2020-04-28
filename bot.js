// FACTS BOT
// Accessing Google Sheet (JSON)
// template: https://spreadsheet.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/full?alt=json
// In this case we use the next google sheet ID : 1YrzerQBJdqWbbvblridzpcQs_95jSSG1fVwewf2tIKg
// page : 1

// CREATE A BOT from TELEGRAM
// name : FactsBot ; username : facts_2020_bot
// const TOKEN = process.env.TOKEN;
const TOKEN = process.env.TOKEN;

// IMPORT
const Telegraf = require('telegraf');
const axios = require('axios');

// CONSTANTs
const LINK = 'https://spreadsheet.google.com/feeds/cells/1YrzerQBJdqWbbvblridzpcQs_95jSSG1fVwewf2tIKg/1/public/full?alt=json';
const helpText = 
`
FACTS BOT

/start -
/help - 
/fact -
/update - 
`

// VARIABLES
let dataStore = [];

// FUNCTIONs
getData();

async function getData() {
  try {
    let res = await axios(LINK);
    // console.log(res.data.feed.entry);
    let data = res.data.feed.entry;
    dataStore = [];
    data.forEach(item => {
      dataStore.push({
        row: item.gs$cell.row,
        col: item.gs$cell.col,
        val: item.gs$cell.inputValue,
      })
    })
    // console.log(dataStore);
  } catch (err) {
    console.log(err);
    throw new Error;
  }
}

// Create an object from the Telegraf Class
const bot = new Telegraf(TOKEN);

//CODE
// start and help command
bot.command(['start', 'help'], ctx => {
    ctx.reply(helpText);
});

// update command
bot.command('update', async ctx => {
    try {
        await getData();
        ctx.reply('update');
    } catch (error) {
        console.log(error);
        ctx.reply('Error');
    }
});

// fact command
bot.command('fact', ctx => {
    let maxRow = dataStore.filter(item => {
      return (item.row == '1' && item.col == '2');
    })[0].val;
  
    let k = Math.floor(Math.random() * maxRow) + 1;
  
    let fact = dataStore.filter(item => {
      return (item.row == k && item.col == '5');
    })[0];
  
    let message =
      `
    Fact #${fact.row}:
    ${fact.val}
    `;
  
    ctx.reply(message);
})

// LISTENING
bot.launch();