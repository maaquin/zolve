<<<<<<< HEAD
import { useState } from "react";
import { Logo } from './Logo';
import { Input } from './Input';
import {
    validationEmail,
    validatePassword
} from '../shared/validators';
import { useLogin } from "../shared/hooks";
=======
import { useState } from "react"
import { Logo } from './Logo'
import { Input } from './Input'
import {
    validationEmail,
    validatePassword
} from '../shared/validators'
import { useLogin } from "../shared/hooks"
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e

export const Login = ({ switchAuthHandler }) => {
    const { login, isLoading } = useLogin();

    const [formState, setFormState] = useState({
        email: {
            value: '',
<<<<<<< HEAD
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
        },
    });
=======
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
    })
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
<<<<<<< HEAD
        }));
    };

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        switch (field) {
            case 'email':
                isValid = validationEmail(value);
                break;

            case 'password':
                isValid = validatePassword(value);
                break;

            default:
                break;
=======
        }))
    }

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'email':
                isValid = validationEmail(value)
                break

            case 'password':
                isValid = validatePassword(value)
                break

            default:
                break
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
<<<<<<< HEAD
        }));
    };

    const handleLogin = (event) => {
        event.preventDefault();

        login(formState.email.value, formState.password.value);
    };

    const isSubmitButtonDisable = isLoading || !formState.email.isValid || !formState.password.isValid;
=======
        }))
    }

    const handleLogin = (event) => {
        event.preventDefault()

        login(formState.email.value, formState.password.value)
    }

    const isSubmitButtonDisable = isLoading || !formState.email.isValid || !formState.password.isValid
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e

    return (
        <div className="login-container">
            <form className="auth-form">
                <Logo text={'Log in'} />
                <div className="input-box">
                    <Input
                        field='email'
                        placeholder='Email'
                        className='login-input'
                        value={formState.email.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
<<<<<<< HEAD
                    <i className={`fa-solid ${formState.email.showError ? 'fa-triangle-exclamation text-red' : 'fa-envelope'}`}></i>
=======
                    <i className="fa-solid fa-envelope"></i>
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e
                </div>
                <div className="input-box">
                    <Input
                        field='password'
                        placeholder='Password'
                        className='login-input'
                        value={formState.password.value}
                        onChangeHandler={handleInputValueChange}
                        type='password'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
<<<<<<< HEAD
                    <i className={`fa-solid ${formState.password.showError ? 'fa-triangle-exclamation text-red' : 'fa-lock'}`}></i>
=======
                    <i className="fa-solid fa-lock"></i>
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e
                </div>
                <button onClick={handleLogin} disabled={isSubmitButtonDisable} className="login__button">
                    Log in
                </button>
                <div onClick={switchAuthHandler} className="auth-form-switch-label">
<<<<<<< HEAD
                    Don't have an account? Register now!
                </div>
            </form>
        </div>
    );
};
=======
                    Don't have an acount? register now!
                </div>
            </form>
        </div>
    )
}
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e
