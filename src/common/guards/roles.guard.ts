import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RolUsuario } from '../../module/usuario/schema/usuario.schema';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<RolUsuario[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // Si la ruta no tiene roles requeridos, dejamos pasar
        if (!requiredRoles) {
            return true;
        }

        // Obtenemos el usuario del request (inyectado por JwtStrategy)
        const { user } = context.switchToHttp().getRequest();

        // Verificamos si el rol del usuario está en la lista permitida
        return requiredRoles.some((role) => user.rol === role);
    }
}