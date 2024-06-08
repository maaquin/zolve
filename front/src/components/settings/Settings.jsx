import { useEffect } from "react";
import { UserSettings } from './user/UserSettings.jsx';
import { useUserSettings, useUserDetails } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import { PasswordSettings } from "./user/PasswordSettings.jsx";

export const Settings = () => {
    const { userSettings, isFetching, saveSettings } = useUserSettings();
    const { isLogged } = useUserDetails();

    if (isFetching) {
        return <LoadingSpinner />;
    }

    return (
        <div className="settings-container">
            <div>
                <span>Account Settings</span>
                <UserSettings settings={userSettings} saveSettings={saveSettings} />
            </div>
            <div>
                <span>Change Password</span>
                <PasswordSettings />
            </div>
            <div className="deactivate-section">
                <span>Deactivate your account</span>
                <button className="deactivate-btn">Deactivate</button>
            </div>
        </div>
    );
};