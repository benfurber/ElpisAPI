import * as sgMail from "@sendgrid/mail";

const { SENDGRID_API_KEY } = process.env;

class EmailService {
  client: any;

  constructor(client) {
    this.client = client;
    client.setApiKey(SENDGRID_API_KEY);
  }

  async sendPasswordReset(user) {
    const { id, passwordRequest } = user;
    const link = `elpis://reset-password?id=${id}&passwordRequest=${passwordRequest}`;

    const msg = {
      to: user.email,
      from: "may@elpis.app",
      subject: "Reset your Elpis password",
      text: `link: ${link}`,
      html: `<a href="${link}" universal="true">${link}</a>`
    };
    await sgMail.send(msg);
  }
}

const emailService = new EmailService(sgMail);

export { emailService };
