import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";
import { verifySignup, authLimiter } from "../middlewares";

const router = Router();

router.post("/signin", [verifySignup.validateFieldsLogin, authLimiter.Login], authCtrl.signIn);

router.post("/signup", [
    verifySignup.validateFields,
    authLimiter.amountLimit,
    verifySignup.checkDuplicateEmail,
    // verifySignup.checkDuplicatePhone,
    verifySignup.verifyExistedRole,
], authCtrl.signUp);

// Ruta para crear un perfil con el rol de Admin
router.post("/admin", [
  verifySignup.validateFields, 
  authLimiter.amountLimit, 
  verifySignup.checkDuplicateEmail,
  // verifySignup.checkDuplicatePhone, 
  verifySignup.verifyExistedRole, 
], authCtrl.addAdmin);

export default router;
