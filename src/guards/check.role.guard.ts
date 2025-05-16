import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Request } from "express";
import { UserRoles } from "src/modules/users";
import { User } from "src/modules/users/models";
import { ROLE_KEYS } from "src/decorators/role.decorator";

@Injectable()
export class CheckRoles implements CanActivate{
    constructor(private reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request & {role?:UserRoles,userId?:string}>()
        const roles = this.reflector.getAllAndOverride<UserRoles[]>(ROLE_KEYS,[
            context.getHandler(),
            context.getClass()
        ])

        let userRole = request.role;

        if(!userRole || !roles.includes(userRole)){
            throw new ForbiddenException("You are not allowed to do that action!")
        }
        return true;
    }
}