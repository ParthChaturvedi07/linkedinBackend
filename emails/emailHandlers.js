const { MailtrapClient, sender } = require("mailtrap");
const { createWelcomeEmailTemplate } = require("./emailTemplates");
const dotenv = require("dotenv")
dotenv.config();

const mailtrapClient = new MailtrapClient({ token: process.env.MAILTRAP_TOKEN });

const sendWelcomeEmail = async (
  email,
  firstName,
  lastName,
  profileUrl
) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to LinkedinClone by parth.dev",
      html: createWelcomeEmailTemplate(firstName, lastName, profileUrl),
      category: "welcome",
    });

    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

module.exports = { sendWelcomeEmail };
