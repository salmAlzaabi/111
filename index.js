const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

// =============================================
//         الإعدادات - غيّرها هنا
// =============================================
const config = {
  imageChannelId: '1515746178074153060', // ID الروم
  warningImage: 'https://cdn.discordapp.com/attachments/1500844249736937602/1515745446071504926/1195827812565798953.png?ex=6a301f73&is=6a2ecdf3&hm=ad4c34e8313b97d39efa80663ae465cc3167b4e7de19ed86f0a938cace899c4f&',
};

client.login(process.env.TOKEN); // توكن البوت الآمن
// =============================================

client.once('ready', () => {
  console.log(`✅ البوت شغال: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== config.imageChannelId) return;

  const hasImage = message.attachments.some(att =>
    att.contentType?.startsWith('image/')
  );

  if (!hasImage) return;

  try {
    await message.channel.send({
      files: [config.warningImage]
    });
  } catch (err) {
    console.error('خطأ في إرسال الصورة:', err);
  }
});

