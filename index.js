require("dotenv").config();
const express = require("express");
const axios = require("axios");
const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const app = express();
const port = process.env.PORT || 3000;

const twitchClientID = process.env.TWITCH_CLIENT_ID;
const twitchSecret = process.env.TWITCH_SECRET;
const twitchStreamer = process.env.STREAMER_NAME;
const discordChannelID = process.env.DISCORD_CHANNEL_ID;
let twitchToken;
let isLive = false;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Log In our bot
client.login(process.env.DISCORD_BOT_TOKEN);

// Fetch the OAuth token from Twitch
axios
  .post(
    `https://id.twitch.tv/oauth2/token?client_id=${twitchClientID}&client_secret=${twitchSecret}&grant_type=client_credentials`
  )
  .then((res) => {
    twitchToken = res.data.access_token;
  });

// Function to send a live notification to Discord
function sendLiveNotification(streamData) {
  let channel = client.channels.cache.get(discordChannelID);
  if (channel) {
    const button = new ButtonBuilder()
      .setLabel("Join Stream") // Set button text
      .setStyle(ButtonStyle.Link) // Set button style (LINK opens in browser)
      .setURL(`https://twitch.tv/${twitchStreamer}`); // Set button URL
    // .setEmoji("949063528000684122");

    const row = new ActionRowBuilder().addComponents(button); // Add button to row
    const content = `Howdy @everyone, ${twitchStreamer} is live now!`;
    const embed = {
      color: 0xad1457,
      title: `${twitchStreamer.toUpperCase()} is live now [🔴]`,
      url: `https://twitch.tv/${twitchStreamer}`,
      description: streamData.title,
      thumbnail: {
        url: "https://i.imgur.com/AC49BvZ.gif",
      },
      timestamp: new Date().toISOString(),
      image: {
        url: `https://static-cdn.jtvnw.net/previews-ttv/live_user_${twitchStreamer}-1280x720.jpg`,
      },
      footer: {
        text: streamData.game_name,
      },
    };

    channel.send({ content, embeds: [embed], components: [row] });
  }
}

// Check if the bot is connected to Twitch
app.get("/twitch", (req, res) => {
  if (twitchToken) {
    res.status(200).json({ connected: true });
  } else {
    res.status(500).json({ connected: false });
  }
});

// Check if the bot is connected to Discord
app.get("/discord", (req, res) => {
  if (client.readyAt) {
    res.status(200).json({ connected: true });
  } else {
    res.status(500).json({ connected: false });
  }
});

// Get the current live status
app.get("/status", (req, res) => {
  res.status(200).json({ isLive });
});

// Every minute, check if the stream is live
setInterval(() => {
  axios
    .get(`https://api.twitch.tv/helix/streams?user_login=${twitchStreamer}`, {
      headers: {
        "Client-ID": twitchClientID,
        Authorization: `Bearer ${twitchToken}`,
      },
    })
    .then((res) => {
      if (res.data.data.length > 0) {
        // Stream is live
        if (!isLive) {
          // Stream just went live
          isLive = true;
          let streamData = {
            title: res.data.data[0].title,
            game_name: res.data.data[0].game_name,
          }; // Extracting stream title and game_name from the response
          sendLiveNotification(streamData);
          console.log(streamData);
        }
      } else {
        // Stream is offline
        isLive = false;
      }
    });
}, 60000);

// Start the web server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
