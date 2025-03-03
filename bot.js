const TelegramBot = require("node-telegram-bot-api");

// 🔥 Replace this with your Bot Token from BotFather
const BOT_TOKEN = "8072415363:AAHeLol1y_Y0DnENso82dqEcktzM0WWyfPk";

// Create a new Telegram bot (Polling mode)
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log("🚀 Cloud-Bot is now running...");

// Malayalam meme image URL
const malayalamMemeImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFM5vaGSsLDxzyqCosOsVYiRS189sqms8c0Q&s";

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Hi! I am Cloud-Bot. \nDo you want to join our premium channel?",
    {
      reply_markup: {
        inline_keyboard: [[{ text: "✅ Yes, I'm interested", callback_data: "join_premium" }]],
      },
    }
  );
});

// Handle Inline Button Clicks
bot.on("callback_query", (query) => {
    const chatId = query.message.chat.id;
    const myVideoFileId = "AAMCBQADGQEB2Eo3Z8V3lvlL72eb04q1-8TWqvVtDZIAAi0YAAJaiyhWy93pezWBsssBAAdtAAM2BA";
    if (query.data === "join_premium") {
      bot.sendMessage(
        chatId,
        "🔍 Please verify all the details in the demo group: [Demo Group](https://t.me/+gimADbjnoZowYzE1)",
        {
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [{ text: "▶️ Continue", callback_data: "continue_payment" }],
              [{ text: "❌ Not Interested", callback_data: "not_interested" }],
            ],
          },
        }
      );
    } else if (query.data === "continue_payment") {
        bot.sendMessage(chatId, 
          "🔗 Here are the demo videos for payment instructions:\n\n" +
          "💳 **PhonePe Gift Card**: [Watch the Video](https://youtube.com/shorts/ItLTW7O9RJs?si=c1tbRT4uSUyP48qr)\n\n" +
          "🎁 **Amazon Gift Card**:[Watch the Video](https://youtube.com/shorts/1KW3y1VJlY0?si=oSwgiWGeqXbOPM7A)", 
          {
            parse_mode: "Markdown",
            reply_markup: {
              inline_keyboard: [
                [{ text: "📤 Share Payment Screenshot", callback_data: "share_screenshot" }]
              ],
            },
        });
    } else if (query.data === "share_screenshot") {
      bot.sendMessage(
        chatId,
        "📸 Please upload your payment screenshot below with a caption."
      );
    } else if (query.data === "done_upload") {
      bot.sendMessage(chatId, "✅ Admin will verify the details. Thank you!");
    } else if (query.data === "not_interested") {
      bot.sendMessage(chatId, "🙏 Thank you for contacting us! If you change your mind, feel free to reach out anytime.");
    }
  });
  

// /send-code command
bot.onText(/\/send-code/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "📸 Please send your payment screenshot.");
});

// Handle Image Upload (User sends a payment screenshot)
bot.on("photo", (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "✅ Payment proof received. Click 'Done' when finished.", {
      reply_markup: {
        inline_keyboard: [[{ text: "✅ Done", callback_data: "done_upload" }]],
      },
    });
  });
  
  

// Handle unknown messages (Reply with a Malayalam meme + /start button)
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
  
    // Check if the message contains text (ignore photos, stickers, etc.)
    if (!msg.text) return;
  
    const text = msg.text;
  
    // If the message is not a recognized command, show the meme
    if (!text.startsWith("/")) {
      bot.sendPhoto(chatId, malayalamMemeImage, {
        reply_markup: {
          inline_keyboard: [[{ text: "🔄 Restart", callback_data: "join_premium" }]],
        },
      });
    }
  });
  
//admin side code

const ADMIN_CHAT_ID = "7759676551"; // Your chat ID

bot.on("photo", (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username ? `@${msg.from.username}` : "No username"; // Get username or show "No username"
  const photo = msg.photo[msg.photo.length - 1].file_id; // Get the highest quality photo
  const caption = msg.caption ? msg.caption : "No caption provided";
  // Send confirmation to the user

  // Forward the payment proof to the admin
  bot.sendPhoto(ADMIN_CHAT_ID, photo, {
    caption: `📸 *New Payment Proof Uploaded*\n\n👤 *User*: ${username}\n🆔 *User ID*: ${chatId}\n📝 *Caption*: ${caption}\n\nVerify the payment.`,
    parse_mode: "Markdown",
  });
});


const express = require("express");
const app = express();

const PORT = process.env.PORT || 3435; // Match the Koyeb exposed port

app.get("/", (req, res) => {
    res.send("Bot is running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
