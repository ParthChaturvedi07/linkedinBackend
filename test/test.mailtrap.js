const { MailtrapClient } = require("mailtrap");
const dotenv = require("dotenv");
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: process.env.EMAIL_FROM,
  name: process.env.EMAIL_FROM_NAME,
};
const recipients = [
  {
    email: "parthchaturvedi265@gmail.com",
  },
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then(console.log, console.error);

module.exports = { sendWelcomeEmail, mailtrapClient, sender };