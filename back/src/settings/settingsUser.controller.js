import User from '../users/user.model.js'
import bcryptjs from 'bcryptjs'
import Stripe from 'stripe'

const stripe = Stripe('sk_test_51PKhccBcQHKelvauX3S9BB06tVJYO46e0KqkNrrTdo6Xgj2tQkfSwno3LgItFSqIVeYCvDGZ6x85Yrgwqk2WABFB00ZjZlOWIA');

export const getUserSetting = async (req, res) => {
    try {
        const { userId } = req.body

        console.log(userId)

        const userData = await User.findById(userId)

        return res.status(200).json({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            role: userData.role,
            store: userData.store,
            nit: userData.nit,
            creditCard: userData.creditCard
        })
    } catch (e) {
        return res.status(500).send('Something went wrong')
    }
}

export const getUserSettingSolo = async (req, res) => {
    try {
        const { userId } = req.body

        const user = await User.find({ estado: true, _id: userId });
        res.status(200).json(user);
    } catch (e) {
        return res.status(500).send('Something went wrong')
    }
}

export const usuariosPut = async (req, res) => {
    const { userId, username, email, nit, creditCard } = req.body;

    const actualizaciones = { username: username, email: email, nit: nit, creditCard: creditCard };
    const usuarioActualizado = await User.findByIdAndUpdate(userId, actualizaciones, { new: true });

    console.log(usuarioActualizado)

    res.status(200).json({
        msg: 'Tu usuario ha sido actualizado'
    });
}

export const usuariosRole = async (req, res) => {
    const { userId } = req.body;

    const actualizaciones = { role: 'ADMIN_ROLE' };
    const usuarioActualizado = await User.findByIdAndUpdate(userId, actualizaciones, { new: true });

    console.log(usuarioActualizado)

    res.status(200).json({
        msg: 'Tu usuario ha sido actualizado',
        usuario_nuevo: usuarioActualizado.usuario
    });
}

export const passwordPatch = async (req, res) => {
    try {
        const { userId, password, newPassword } = req.body

        const userData = await User.findById(userId, { password: 1 })

        const isPasswordCorrect = await bcryptjs.compare(password, userData.password)

        if (!isPasswordCorrect) {
            return res.status(400).send('Invalid password. Please try again')
        }

        const encryptedPassword = await bcryptjs.hash(newPassword, 10)

        await User.updateOne({ _id: userId }, { password: encryptedPassword })

        return res.status(200).send('Password changed succesfully')
    } catch (e) {
        return res.status(500).send('Somthing went wrong')
    }
}

export const newCreditCard = async (req, res) => {
    try {
        const { userId } = req.params;
        const { payment_method } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        let customer;
        if (!user.customerId) {
            // Crear un nuevo cliente en Stripe
            customer = await stripe.customers.create({
                payment_method: payment_method,
                invoice_settings: {
                    default_payment_method: payment_method,
                },
            });
            user.customerId = customer.id;
            await user.save();
        } else {
            // Actualizar el método de pago para un cliente existente
            customer = await stripe.customers.update(user.customerId, {
                invoice_settings: {
                    default_payment_method: payment_method,
                },
            });
        }

        res.status(200).json({ msg: 'Payment method added successfully', customer });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export const newPay = async (req, res) => {
    const { customerId, amount, payment_method } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            customer: customerId,
            payment_method: payment_method,
            off_session: true,
            confirm: true,
        });

        res.send({ success: true, paymentIntent });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}