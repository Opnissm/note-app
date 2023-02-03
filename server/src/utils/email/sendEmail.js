const Sib = require("sib-api-v3-sdk");

const sendEmail = async (email, subject, { name, link }, template) => {
  const client = Sib.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
  const tranEmailApi = new Sib.TransactionalEmailsApi();
  const sender = {
    email: process.env.SMTP_EMAIL,
    name: process.env.APP_NAME,
  };
  const receivers = [
    {
      email: email,
    },
  ];

  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject,
      htmlContent: `
        <h1>Here is your password reset link: </h1>
        <a href="${link}">${link}</a>`,
    })
    .then(console.log)
    .catch(console.log);
};

module.exports = { sendEmail };
