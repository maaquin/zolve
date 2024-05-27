import { useEffect } from "react";
import { UserSettings } from './user/UserSettings';

import { useUserSettings, useUserDetails } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import { PasswordSettings } from "./user/PasswordSettings";


export const Settings = () => {

    const { userSettings, isFetching, saveSettings } = useUserSettings()
    const { isLogged } = useUserDetails();

    if (isFetching) {
        return <LoadingSpinner />
    }

    return (
        <div>
            <div className="settings-container">
                <div>
                    <span>Settings</span>
                    <UserSettings settings={userSettings} saveSettings={saveSettings} />
                </div>
                <div>
                    <span>Change password</span>
                    <PasswordSettings />
                </div>
            </div>
        </div>
    )
}