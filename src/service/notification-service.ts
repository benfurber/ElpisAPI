const OneSignal = require("onesignal-node");
require("./dotenv");

const { ONE_SIGNAL_APP_AUTH_KEY, ONE_SIGNAL_APP_ID } = process.env;
import { NotificationDetails } from "../types";

const NOTIFICATION_CONSTANTS = {
  ios_badgeType: "Increase",
  ios_badgeCount: 1
};

interface CreateNotificationService {
  createNotification(notification: NotificationDetails): any;
}

interface SendNotificationService {
  sendNotification(notification: NotificationDetails): any;
}

class NotificationService implements CreateNotificationService, SendNotificationService {

  client: any;

  constructor(client: any) {
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
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}

const client = new OneSignal.Client({
  app: { appAuthKey: ONE_SIGNAL_APP_AUTH_KEY, appId: ONE_SIGNAL_APP_ID }
});
const notificationService = new NotificationService(client);

export { notificationService, CreateNotificationService, SendNotificationService };
