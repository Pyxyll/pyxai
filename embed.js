export default function createEmbed(userName, twitchChannel, followers) {
    return {
        color: 0x0099ff,
        title: `${userName.toUpperCase()} Is going live![🔴]`,
        url: "https://www.twitch.tv/pyxyll",
        author: {
            name: "Pyx-AI",
            icon_url: "https://cdn.discordapp.com/avatars/1082638933202051172/371cc926706b3fbe27f15956d4daf048?size=1024",
            //   url: "https://discord.js.org",
        },
        description:
            userName + " Is now LIVE on twitch, streaming: " + twitchChannel.gameName,
        thumbnail: {
            url: "https://cdn.discordapp.com/avatars/108294151023386624/3ecf3aa914b9f010a27df1b80cccb3e6?size=1024",
        },
        fields: [
            {
                name: twitchChannel.title,
                value: twitchChannel.gameName,
            },
            {
                name: "\u200b",
                value: "\u200b",
                inline: false,
            },
            {
                name: "Followers",
                value: followers,
                inline: true,
            },
            {
                name: "Current Donation Goal",
                value: "10/100 (Euro)",
                inline: true,
            },
        ],
        image: {
            url: "https://media1.giphy.com/media/dkWmyFiITN843zDZpX/giphy.gif?cid=790b76115a1f1598a175f6a9e5834ace60c44f390bc4ab21&rid=giphy.gif&ct=g",
        },
        timestamp: new Date().toISOString(),
        // footer: {
        //   text: "Some footer text here",
        //   icon_url: "https://i.imgur.com/AfFp7pu.png",
        // },
    };
};

export default function embedButton() {
    const button = new ActionRowBuilder()
  .addComponents(
    new ButtonBuilder()
      .setLabel('View on Twitch')
      .setURL('https://twitch.tv/pyxyll')
      .setStyle(ButtonStyle.Link)
      .setEmoji('949063528000684122')
  )
}