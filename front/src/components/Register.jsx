import { useState } from 'react';
import { LogoRegister } from './LogoRegister';
import { Input } from './Input';
import {
    validationEmail,
    validatePassword,
    validateUsername,
    validateConfirmPassword
} from '../shared/validators';
import { useRegister } from '../shared/hooks';

export const Register = ({ switchAuthHandler }) => {
    const { register, isLoading } = useRegister();

    const [formState, setFormState] = useState({
        username: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
        passwordConfirm: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        },
    });

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [termsModalOpen, setTermsModalOpen] = useState(false);

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
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

            case 'passwordConfirm':
                isValid = validateConfirmPassword(formState.password.value, value);
                break;

            case 'username':
                isValid = validateUsername(value);
                break;

            default:
                break;
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }));
    };

    const handleRegister = (event) => {
        event.preventDefault();

        if (termsAccepted) {
            register(formState.username.value, formState.password.value, formState.email.value);
        } else {
            alert("You must accept the terms and conditions to register.");
        }
    };

    const isSubmitButtonDisable = isLoading || !formState.username.isValid || !formState.email.isValid || !formState.password.isValid || !formState.passwordConfirm.isValid || !termsAccepted;

    return (
        <div className="register-container">
            <LogoRegister text={'Register'} />
            <form className='auth-form'>
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
                    <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="input-box">
                    <Input
                        field='username'
                        placeholder='User name'
                        className='login-input'
                        value={formState.username.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    <i className="fa-solid fa-user"></i>
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
                    <i className="fa-solid fa-key"></i>
                </div>
                <div className="input-box">
                    <Input
                        field='passwordConfirm'
                        placeholder='Password Confirmation'
                        className='login-input'
                        value={formState.passwordConfirm.value}
                        onChangeHandler={handleInputValueChange}
                        type='password'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    <i className="fa-solid fa-lock"></i>
                </div>
                <div className="terms-and-conditions">
                    <label>
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={() => setTermsAccepted(!termsAccepted)}
                        />
                        Accept terms and conditions
                    </label>
                    <span
                        onClick={() => setTermsModalOpen(true)}
                        style={{ color: 'blue', cursor: 'pointer' }}
                    >
                        Terms and Conditions
                    </span>
                </div>
                <button onClick={handleRegister} disabled={isSubmitButtonDisable}>
                    Register
                </button>
            </form>
            <span onClick={switchAuthHandler} className="auth-form-switch-label">
                Already have you an account? log in now!
            </span>
            {termsModalOpen && (
                <div className="terms-modal-overlay">
                    <div className="terms-modal">
                        <h2>Terms and Conditions</h2>
                        <p>Términos y Condiciones
Español
Términos y Condiciones de Uso de la Aplicación
Bienvenido a nuestra aplicación. Al utilizar nuestros servicios, usted acepta cumplir con los
siguientes términos y condiciones:
1. Descripción del Servicio Nuestra aplicación actúa como intermediario entre los
usuarios y los locales de mecánica. Proporcionamos una plataforma donde los usuarios
pueden encontrar servicios de mecánica cercanos en caso de emergencia vehicular.
2. Limitación de Responsabilidad Nos limitamos a proporcionar una plataforma de
conexión entre usuarios y proveedores de servicios mecánicos. No somos responsables
por cualquier daño, robo, agresión o cualquier otro tipo de incidente que pueda ocurrir
durante la prestación de los servicios mecánicos. Los usuarios aceptan que cualquier
reclamo debe ser dirigido directamente al proveedor del servicio.
3. Uso de Tarjetas de Crédito
○ Los usuarios pueden registrar y utilizar sus tarjetas de crédito para pagar los
servicios a través de nuestra aplicación.
○ Utilizamos Stripe para procesar los pagos. Stripe almacena y maneja la
información de pago de manera segura.
○ No almacenamos información sensible de las tarjetas de crédito en nuestra base
de datos.
○ Los usuarios aceptan que las tarifas de procesamiento de pagos pueden aplicar
y que serán añadidas al costo total del servicio.
4. Tarifas
○ Las tarifas por el uso de nuestra aplicación y los servicios proporcionados por los
mecánicos serán claramente especificadas antes de completar una transacción.
○ Nos reservamos el derecho de modificar las tarifas en cualquier momento, con
previo aviso a los usuarios.
5. Conducta del Usuario
○ Los usuarios deben comportarse de manera respetuosa y adecuada durante las
interacciones con los proveedores de servicios.
○ Cualquier comportamiento inapropiado, violento o ilegal puede resultar en la
suspensión o terminación de la cuenta del usuario.
6. Privacidad
○ Respetamos su privacidad y manejamos su información personal de acuerdo
con nuestra Política de Privacidad.
○ Para más detalles, consulte nuestra Política de Privacidad disponible en nuestro
sitio web.
7. Modificaciones
○ Nos reservamos el derecho de modificar estos términos y condiciones en
cualquier momento.
○ Notificaremos a los usuarios sobre cualquier cambio significativo a través de la
aplicación o por correo electrónico.
8. Ley Aplicable
○ Estos términos y condiciones se rigen por las leyes del país donde se encuentre
registrada nuestra empresa.
○ Cualquier disputa será resuelta en los tribunales competentes de dicha
jurisdicción.
Si tiene alguna pregunta sobre estos términos y condiciones, por favor contáctenos a través de
nuestro servicio de atención al cliente.
English
Terms and Conditions of Use of the Application
Welcome to our application. By using our services, you agree to comply with the following terms
and conditions:
1. Service Description Our application acts as an intermediary between users and
mechanic shops. We provide a platform where users can find nearby mechanic services
in case of vehicular emergencies.
2. Limitation of Liability We are limited to providing a platform for connecting users with
mechanic service providers. We are not responsible for any damage, theft, assault, or
any other type of incident that may occur during the provision of mechanic services.
Users agree that any claims must be directed to the service provider.
3. Credit Card Usage
○ Users can register and use their credit cards to pay for services through our
application.
○ We use Stripe to process payments. Stripe securely stores and handles payment
information.
○ We do not store sensitive credit card information in our database.
○ Users agree that processing fees may apply and will be added to the total service
cost.
4. Fees
○ Fees for using our application and services provided by mechanics will be clearly
specified before completing a transaction.
○ We reserve the right to modify the fees at any time, with prior notice to users.
5. User Conduct
○ Users must behave respectfully and appropriately during interactions with service
providers.
○ Any inappropriate, violent, or illegal behavior may result in the suspension or
termination of the user's account.
6. Privacy
○ We respect your privacy and handle your personal information in accordance
with our Privacy Policy.
○ For more details, please refer to our Privacy Policy available on our website.
7. Modifications
○ We reserve the right to modify these terms and conditions at any time.
○ We will notify users of any significant changes through the application or by
email.
8. Governing Law
○ These terms and conditions are governed by the laws of the country where our
company is registered.
○ Any disputes will be resolved in the competent courts of that jurisdiction.
If you have any questions about these terms and conditions, please contact us through our
customer service</p>
                        <button onClick={() => {
                            setTermsAccepted(true);
                            setTermsModalOpen(false);
                        }}>
                            Accept
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
