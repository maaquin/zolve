import { useState } from "react";
import { newCard as newCardRequest } from '../../../services'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

// Cargar la clave pública de Stripe
const stripePromise = loadStripe('pk_test_51PKhccBcQHKelvaud4seBzFC14iIkBRRrBK0r8HnzsXciQBN9tWZs9dSZxyX4QfW43Sk36qZbJa2XxlpVfAURUps00AqPnD5PI');

export const useNewCard = (userId) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const newCard = async (cardElement) => {
        setIsLoading(true);

        // Obtener la instancia de Stripe
        const stripe = await stripePromise;

        if (!stripe) {
            setIsLoading(false);
            return toast.error('Stripe.js has not loaded yet.');
        }

        // Crear el payment method usando Stripe.js
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setIsLoading(false);
            return toast.error(error.message);
        }

        // Enviar el payment method ID al backend
        const response = await newCardRequest({
            payment_method: paymentMethod.id
        }, userId);

        setIsLoading(false);

        if (response.error) {
            return toast.error(response.e?.response?.data || 'Ocurrio un error, intentalo de nuevo');
        }

        toast.success('New card added successfully');
        navigate('/');
    }

    return {
        newCard,
        isLoading
    }
}