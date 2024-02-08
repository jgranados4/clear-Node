import { Router } from "express";
import { authController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImple } from "../../infrastructure";
import { Authmiddleware } from "../middlewares/auth.middlewares";

export class AuthRouter {
  static get routes(): Router {
    const router = Router();

    const datasource= new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImple(datasource);
    const controller=new authController(authRepository);

    router.post("/login",controller.LoginUser);
    router.post("/Register",controller.RegisterUser);
    router.get("/", [Authmiddleware.ValidateJwt], controller.getUsers);
    return router;
  }
}