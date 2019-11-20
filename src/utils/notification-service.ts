var OneSignal = require("onesignal-node");
require("./dotenv");

const { ONE_SIGNAL_APP_AUTH_KEY, ONE_SIGNAL_APP_ID } = process.env;

const client = new OneSignal.Client({
  app: { appAuthKey: ONE_SIGNAL_APP_AUTH_KEY, appId: ONE_SIGNAL_APP_ID }
});

const NOTIFICATION_CONSTANTS = {
  ios_badgeType: "Increase",
  ios_badgeCount: 1
};

class NotificationService {
  client: any;

  constructor() {
    this.client = client;
  }

  createNotification(notificationDetails) {
    notificationDetails.include_external_user_ids = notificationDetails.users;
    const notification = new OneSignal.Notification({
      ...notificationDetails,
      ...NOTIFICATION_CONSTANTS
    });

    return notification;
  }

  sendNotification(notificationDetails) {
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

const notificationService = new NotificationService();

export { notificationService };
