import { Router } from "express";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

import { 
    newStore, 
    listStores, 
    listBadStores, 
    listStoreId, 
    updateStore, 
    deleteStore, 
    restoreStore 
} from "./store.controller.js";

const router = Router();

router.post("/", [validarCampos], newStore);
router.get("/", listStores);
router.get("/bad", listBadStores);
router.get("/:id", listStoreId);
router.put( "/update", [validarJWT, validarCampos], updateStore);
router.put("/delete", [validarJWT], deleteStore);
router.put("/restore", [validarJWT], restoreStore);

export default router;