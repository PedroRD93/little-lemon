import { OnBoardingCredentials } from "./OnBoardingCredentials";
import { User } from "./User";

export interface AuthContextData {
    user: User;
    singIn: (credentials: OnBoardingCredentials) => Promise<void>;
    singOut: () => Promise<void>;
    updateUser: (user: User) => Promise<void>;
    loading: boolean;
    loadStorageData: () => Promise<void>;
}
