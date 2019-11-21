export type NotificationDetails = {
  contents: {
    en: string;
  };
  headings?: {
    en: string;
  };
  users: [string];
  include_external_user_ids?: Array<string>;
};
