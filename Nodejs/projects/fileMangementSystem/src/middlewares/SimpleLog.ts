import { Request, Response, NextFunction } from "express"

export function simpleLog(req: Request, res: Response, next: NextFunction){
    const path = req.method;
    const url = req.url;
    console.log("middleware log", path, url);
    next();
}