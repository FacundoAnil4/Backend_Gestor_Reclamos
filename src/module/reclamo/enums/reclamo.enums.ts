export enum EstadoReclamo {
    NUEVO = 'NUEVO',
    ASIGNADO = 'ASIGNADO',
    EN_PROCESO = 'EN_PROCESO',
    RESUELTO = 'RESUELTO',
    CERRADO = 'CERRADO',
    CANCELADO = 'CANCELADO'
}

export enum TipoReclamo {
    ERROR = 'ERROR',
    MEJORA = 'MEJORA',
    NUEVA_FUNCIONALIDAD = 'NUEVA_FUNCIONALIDAD'
}

export enum PrioridadReclamo {
    BAJA = 'BAJA',
    MEDIA = 'MEDIA',
    ALTA = 'ALTA',
    URGENTE = 'URGENTE'
}

export enum CriticidadReclamo {
    MENOR = 'MENOR',
    MAYOR = 'MAYOR',
    BLOQUEANTE = 'BLOQUEANTE'
}