import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongoDB";

export class Authmiddleware {
  static ValidateJwt = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("Validating JWT");
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(401).json({ error: "No Token provided " });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer" });
    const token = authorization.split(" ").at(1) || "";
    try {
      //
      const payload = await JwtAdapter.ValidateToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid Token" });

      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(401).json({ error: "User not found" });

      req.body.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
