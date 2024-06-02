import {Router} from "express";

import { validarCampos } from "../middlewares/validar-campos.js";

import { 
    getUserSetting, 
    usuariosPut,
    usuariosRole, 
    passwordPatch,
    getUserSettingSolo,
    newCreditCard,
    newPay
} from "./settingsUser.controller.js";

const router = Router()

router.post('/user', getUserSetting)
router.post('/solo', getUserSettingSolo)
router.put('/user', [validarCampos], usuariosPut)
router.put('/role/:id', usuariosRole)
router.patch('/user', passwordPatch)
router.post('/newCard/:id', newCreditCard)
router.post('/newPay', newPay)

export default router