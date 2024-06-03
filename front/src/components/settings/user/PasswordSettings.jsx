import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { validateConfirmPassword, validatePassword } from '../../../shared/validators';
import { Input } from '../../Input';
import { useChangePassword } from '../../../shared/hooks';

const inputs = [
    {
        field: 'password',
        validatePassword,
        label: 'Password',
        type: 'password'
    },
    {
        field: 'newPassword',
        validateConfirmPassword,
        label: 'New Password',
        type: 'password'
    },
];

export const PasswordSettings = () => {
    const [formState, setFormState] = useState({
        password: {
            isValid: false,
            showError: false,
            value: ''
        },
        newPassword: {
            isValid: false,
            showError: false,
            value: ''
        }
    });

    const { changePassword } = useChangePassword();

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value: value
            }
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = validatePassword(value);

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }));
    };

    const isSubmitButtonDisabled = !formState.password.isValid || !formState.newPassword.isValid;

    const handleFormSubmit = (event) => {
        event.preventDefault();

        changePassword(formState.password.value, formState.newPassword.value);
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <form className="settings-form">
            <span className='tile-settings'>Change password</span>
            {inputs.map((input) => (
                <div className="password-input-container" key={input.field}>
                    <label htmlFor={input.field}>{input.label}</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id={input.field}
                        value={formState[input.field].value}
                        onChange={(e) => handleInputValueChange(e.target.value, input.field)}
                        onBlur={(e) => handleInputValidationOnBlur(e.target.value, input.field)}
                    />
                    <FontAwesomeIcon
                        className="show-password-icon"
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={togglePasswordVisibility}
                    />
                    {formState[input.field].showError && (
                        <span className="error-message">{input.validationMessage}</span>
                    )}
                </div>
            ))}
            <button onClick={handleFormSubmit} disabled={isSubmitButtonDisabled}>
                Update password
            </button>
        </form>
    );
};