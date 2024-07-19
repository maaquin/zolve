import {Router} from "express";

import { validarCampos } from "../middlewares/validar-campos.js";

import { 
    getUserSetting, 
    usuariosPut,
    usuariosRole, 
    passwordPatch,
    getUserSettingSolo,
    newCreditCard,
<<<<<<< HEAD
    newPay,
    getCreditCards
=======
    newPay
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e
} from "./settingsUser.controller.js";

const router = Router()

router.post('/user', getUserSetting)
router.post('/solo', getUserSettingSolo)
router.put('/user', [validarCampos], usuariosPut)
router.put('/role/:id', usuariosRole)
router.patch('/user', passwordPatch)
router.post('/newCard/:id', newCreditCard)
router.post('/newPay', newPay)
<<<<<<< HEAD
router.get('/cards/:id', getCreditCards)
=======
>>>>>>> 370a30cc00298b3a5cec866d0798fe32dff9659e

export default router