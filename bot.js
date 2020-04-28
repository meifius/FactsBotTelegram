// FACTS BOT
// Accessing Google Sheet (JSON)
// template: https://spreadsheet.google.com/feeds/cells/YOURGOOGLESHEETCODE/SHEETPAGENUMBER/public/full?alt=json
// In this case we use the next google sheet ID : 1YrzerQBJdqWbbvblridzpcQs_95jSSG1fVwewf2tIKg
// page : 1

// CREATE A BOT from TELEGRAM
// name : FactsBot ; username : facts_2020_bot
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
`

// VARIABLES
let dataStore = [];

// FUNCTIONs
getData();

async function getData(){
    try {
        let res = await axios(LINK);
        let data = res.data.feed.entry;

        data.forEach(item => {
            dataStore.push({
                row : item.gs$cell.row,
                column : item.gs$cell.column,
                value : item.gs$cell.inputValue,
            });
        });
    } catch (error) {
        console.log(error);
    }
}

// Create an object from the Telegraf Class
const bot = new Telegraf(TOKEN);

//CODE
// start and help command
bot.command(['start', 'help'], ctx => {
    ctx.reply(helpText);
});

// fact command
bot.command('fact', ctx => {
    let maxRow = dataStore.filter(item => {
        return (item.row == '1' && item.column == '2');
    })[0].value

    console.log(maxRow);
});

// LISTENING
bot.launch();