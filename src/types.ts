export type NotificationDetails = {
  app_url: string;
  contents: {
    en: string;
  };
  headings?: {
    en: string;
  };
  users: [string];
  include_external_user_ids?: Array<string>;
};
