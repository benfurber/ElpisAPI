const OneSignal = require("onesignal-node");
require("./dotenv");

const { ONE_SIGNAL_APP_AUTH_KEY, ONE_SIGNAL_APP_ID } = process.env;
import { NotificationDetails } from "../types";

const NOTIFICATION_CONSTANTS = {
  ios_badgeType: "Increase",
  ios_badgeCount: 1
};

class NotificationService {
  client: any;

  constructor(client) {
    this.client = client;
  }

  createNotification(notificationDetails: NotificationDetails) {
    notificationDetails.include_external_user_ids = notificationDetails.users;
    const notification = new OneSignal.Notification({
      ...notificationDetails,
      ...NOTIFICATION_CONSTANTS
    });

    return notification;
  }

  sendNotification(notificationDetails: NotificationDetails) {
    const notification = this.createNotification(notificationDetails);
    this.client
      .sendNotification(notification)
      .then(function(response) {
        console.log(response.data, response.httpResponse.statusCode);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const client = new OneSignal.Client({
  app: { appAuthKey: ONE_SIGNAL_APP_AUTH_KEY, appId: ONE_SIGNAL_APP_ID }
});
const notificationService = new NotificationService(client);

export { notificationService };
