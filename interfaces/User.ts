import { EmailNotifications } from "./EmailNotifications";

export interface User {
    name: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    emailNotification: EmailNotifications;
    avatarUrl: string;
    logged: boolean;
}
