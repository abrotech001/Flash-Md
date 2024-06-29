const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUdQajhjcDNnY1V4RThTRFZNUk93RE15RUJhaW5BbGp0Zm1seG0rVU1raz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0VqMnJGM3oyUi9sSDJKNmhkTldjU21RaS9LOWphVzd5UEZyaUpuOEpCST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpRTNhRXFJSG9mYmkyUlFWMzNuaVF3YVRYbmJ6NmI5eWVQeVRVUndLb204PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlZVErVDZ6NERFaHhiTE9sc2NhdmR2djcrRkYrbDNSMlNFa1lDQWk3eURzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVLcllTbHk2a2RTcStsdW04MytzQ0h3SnE2V2NCQTUwQWNQUmRNSVhBMmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRKaVpWaCtRUjFmVjdYNWtQQmk0anlKQ2ZJZThESytSaUpTd3p3bGlkQ3M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEs2N3Jpa215UHRIL1pxMWxNQ0d0czE1cVhRRVVNNmd5V3B1WWhpeTIzST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRVY4YnRRQ2IxcGRScXBDZENKVnlOVWFjMDFqNDVuMzBxT0Q0azJNT0FWWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpUWDJzbnVQWlROUk5hZXR5Y0J0UCswK0pIMnRIM2lEalUwZksrdGxEYXVTRmlwWWVBM1N4b1dXS0wrYVE3TkVqbU5QUjJQNTl6VG55Ums0K2d6WERnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjAzLCJhZHZTZWNyZXRLZXkiOiJZTUxScWoybi8vTFVPOTNWWHdvMVlHK0FCNzFsSkpVZG8rVlNoMldNNnVJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJxNFRKZDdsTlN0RzVvTGx1Y1laRFN3IiwicGhvbmVJZCI6IjM2MzExZjZhLWQ3NDEtNDM3YS1iZmNiLTNhMGY2YTI2YmY0ZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQSDFNOFRzVUdUeFU5eUJlTzNodjkyaW9tMzA9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhwZmJtYm8waFpzdWU2WHRmblZCY0d0MisxVT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xTdm9NNEdFSUdHZ2JRR0dBd2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImlJVTV4WHJLUnZzZUlqL3h0VFh6bERST3QrUFJTeXRiOUlXQStzRGlGZzA9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkhJSS95TjNnb0tONmdQK042SFJKY0dwdURrNEhvcUhYb3pDQksrY1JCTFpWZGlZeWVua2xyNWxqMGZoNVcyaXZER1BPN1I4TnRzQ1Z2VHlxZ2FrR0NnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI2Nmp0YXdJOSt3VlJyUVZrSnFWMTE2QjdYSENlZENFU1EzdHFDUmRTY0p2cE5GaFhmUTNmNThrdHQ4NEhGYUJrM09ZNFl1bFNYUHNhN1FIQ1JidUNCQT09In0sIm1lIjp7ImlkIjoiMjM0ODEwMDE1MTA0ODo1M0BzLndoYXRzYXBwLm5ldCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTAwMTUxMDQ4OjUzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQllpRk9jVjZ5a2I3SGlJLzhiVTE4NVEwVHJmajBVc3JXL1NGZ1ByQTRoWU4ifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxOTY4MTc5NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOaFgifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2348100151048", 
             
    AUTO_VIEW_STATUS: process.env.AUTO_VIEW_STATUS || "off",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_SAVE_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
