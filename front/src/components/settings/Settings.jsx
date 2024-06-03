import { useEffect } from "react";
import { UserSettings } from './user/UserSettings.jsx';

import { useUserSettings, useUserDetails } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import { PasswordSettings } from "./user/PasswordSettings.jsx";


export const Settings = () => {

    const { userSettings, isFetching, saveSettings } = useUserSettings()
    const { isLogged } = useUserDetails();

    if (isFetching) {
        return <LoadingSpinner />
    }

    return (
        <div>
        <span className="settings-supreme">Settings</span>
            <div className="settings-container">
                <div>
                    <UserSettings settings={userSettings} saveSettings={saveSettings} />
                </div>
                <div>
                    <PasswordSettings />
                </div>
            </div>
        </div>
    )
}