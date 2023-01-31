import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { OnBoardingCredentials } from "../interfaces/OnBoardingCredentials";
import { User } from "../interfaces/User";

const singOutBuilder = (fn: React.Dispatch<React.SetStateAction<User>>) => async () => {
    try {
        AsyncStorage.removeItem("user");
        fn({} as User);
    } catch (error) {
        throw new Error(error as string);
    }
};

const updateUserBuilder =
    (fnUser: React.Dispatch<React.SetStateAction<User>>, fnLoading: React.Dispatch<React.SetStateAction<boolean>>) => async (user: User) => {
        try {
            fnLoading(true);
            const jsonUser = JSON.stringify(user);
            await AsyncStorage.setItem("user", jsonUser);
            fnUser(user);
        } catch (error) {
            throw new Error(error as string);
        }
    };

const singInBuilder =
    (fnUser: React.Dispatch<React.SetStateAction<User>>, fnLoading: React.Dispatch<React.SetStateAction<boolean>>) =>
    async ({ name, lastname, email }: OnBoardingCredentials) => {
        try {
            fnLoading(true);
            const jsonUser = JSON.stringify({
                name,
                email,
                lastname,
                logged: true,
            });
            await AsyncStorage.setItem("user", jsonUser);
            fnUser({
                name,
                email,
                lastname,
                logged: true,
            } as User);
        } catch (error) {
            console.log(error);
        } finally {
            fnLoading(false);
        }
    };

const loadStorageDataBuilder = (fnUser: React.Dispatch<React.SetStateAction<User>>, fnLoading: React.Dispatch<React.SetStateAction<boolean>>) => async () => {
    const user = await AsyncStorage.getItem("user");
    const jsonUser = JSON.parse(user as string);
    if (jsonUser) {
        fnUser(jsonUser);
    }
    fnLoading(false);
};

const buildAuthContextData = (fnUser: React.Dispatch<React.SetStateAction<User>>, fnLoading: React.Dispatch<React.SetStateAction<boolean>>) => ({
    singIn: singInBuilder(fnUser, fnLoading),
    singOut: singOutBuilder(fnUser),
    updateUser: updateUserBuilder(fnUser, fnLoading),
    loadStorageData: loadStorageDataBuilder(fnUser, fnLoading),
});

export default buildAuthContextData;
