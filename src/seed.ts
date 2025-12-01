import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsuarioService } from './module/usuario/usuario.service';
import { AreaService } from './module/area/area.service';
import { ClienteService } from './module/cliente/cliente.service';
import { ProyectoService } from './module/proyecto/proyecto.service';
import { TipoProyectoService } from './module/tipo_proyecto/tipo_proyecto.service';
import { ReclamoService } from './module/reclamo/reclamo.service';
import { EstadoService } from './module/estado/estado.service';
import { HistorialEstadoService } from './module/historial_estado/historial_estado.service';
import { CreateUsuarioDto } from './module/usuario/dto/create-usuario.dto';
import { RolUsuario } from './module/usuario/schema/usuario.schema';
import { EstadoReclamo, TipoReclamo, PrioridadReclamo, CriticidadReclamo } from './module/reclamo/enums/reclamo.enums';
import * as mongoose from 'mongoose';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    // Servicios
    const areaService = app.get(AreaService);
    const usuarioService = app.get(UsuarioService);
    const clienteService = app.get(ClienteService);
    const proyectoService = app.get(ProyectoService);
    const tipoProyectoService = app.get(TipoProyectoService);
    const reclamoService = app.get(ReclamoService);
    const estadoService = app.get(EstadoService);
    const historialEstadoService = app.get(HistorialEstadoService);

    console.log('🌱 --- INICIANDO MEGA SEED --- 🌱');

    // --------------------------------------------------------------------------------
    // 1. ESTADOS DE CLIENTE (Requisito previo)
    // --------------------------------------------------------------------------------
    console.log('🔹 Creando Estados Base...');
    let estadoActivoId = '';

    const estadoActivo = (await estadoService.findAll()).find(e => e.nombre === 'Activo');
    if (!estadoActivo) {
        const nuevo = await estadoService.create({ nombre: 'Activo' });
        estadoActivoId = nuevo._id.toString();
    } else {
        estadoActivoId = estadoActivo._id.toString();
    }

    // Creamos un historial de estado inicial para usar en todos los clientes
    const historialBase = await historialEstadoService.create({ estado: estadoActivoId });
    const idHistorialBase = historialBase._id.toString();

    // --------------------------------------------------------------------------------
    // 2. ÁREAS
    // --------------------------------------------------------------------------------
    console.log('🔹 Creando Áreas...');
    const areasData = [
        { nombre: 'Sistemas', descripcion: 'IT e Infraestructura' },
        { nombre: 'Ventas', descripcion: 'Comercial' },
        { nombre: 'Soporte N1', descripcion: 'Mesa de Ayuda' },
        { nombre: 'Soporte N2', descripcion: 'Soporte Técnico Avanzado' },
        { nombre: 'Facturación', descripcion: 'Administración y Pagos' },
    ];

    const areasMap = new Map<string, string>(); // Mapa Nombre -> ID

    for (const a of areasData) {
        let area = (await areaService.findAll()).find(ar => ar.nombre === a.nombre);
        if (!area) {
            area = await areaService.create(a);
        }
        areasMap.set(a.nombre, area._id.toString());
    }

    // --------------------------------------------------------------------------------
    // 3. USUARIOS
    // --------------------------------------------------------------------------------
    console.log('🔹 Creando Equipo...');
    const usuariosData = [
        { nombre: 'Admin General', email: 'admin@empresa.com', pass: 'admin123', rol: RolUsuario.ADMIN, area: 'Sistemas' },
        { nombre: 'Juan Soporte', email: 'juan@empresa.com', pass: 'user123', rol: RolUsuario.SOPORTE, area: 'Soporte N1' },
        { nombre: 'Maria Tecnica', email: 'maria@empresa.com', pass: 'user123', rol: RolUsuario.SOPORTE, area: 'Soporte N2' },
        { nombre: 'Pedro Ventas', email: 'pedro@empresa.com', pass: 'user123', rol: RolUsuario.SOPORTE, area: 'Ventas' },
    ];

    const usuariosIds: string[] = [];

    for (const u of usuariosData) {
        let user = await (usuarioService as any).usuarioRepository.findByEmail(u.email);
        if (!user) {
            user = await usuarioService.create({
                nombre: u.nombre,
                email: u.email,
                password: u.pass,
                rol: u.rol,
                id_area: areasMap.get(u.area)
            } as CreateUsuarioDto);
        }
        usuariosIds.push(user._id.toString());
    }

    // --------------------------------------------------------------------------------
    // 4. TIPOS DE PROYECTO
    // --------------------------------------------------------------------------------
    console.log('🔹 Creando Tipos de Proyecto...');
    const tiposData = ['Desarrollo Web', 'App Móvil', 'Consultoría Cloud', 'Marketing Digital', 'Soporte On-Site'];
    const tiposIds: string[] = [];

    for (const t of tiposData) {
        let tipo = (await tipoProyectoService.findAll()).find(tp => tp.nombre === t);
        if (!tipo) {
            tipo = await tipoProyectoService.create({ nombre: t });
        }
        tiposIds.push(tipo._id.toString());
    }

    // --------------------------------------------------------------------------------
    // 5. CLIENTES
    // --------------------------------------------------------------------------------
    console.log('🔹 Creando Clientes...');
    const clientesNombres = [
        'TechSolutions SA', 'Globex Corp', 'Initech', 'Umbrella Corp', 'Stark Ind',
        'Wayne Ent', 'Cyberdyne', 'Massive Dynamic', 'Acme Inc', 'Soylent Corp'
    ];
    const clientesIds: string[] = [];

    for (const nombre of clientesNombres) {
        let cliente = (await clienteService.findAll()).find(c => c.razon_social === nombre);
        if (!cliente) {
            cliente = await clienteService.create({
                razon_social: nombre,
                cuit: '20-' + Math.floor(Math.random() * 100000000) + '-1',
                contacto: '+54 11 1234 5678',
                email: `contacto@${nombre.replace(/\s/g, '').toLowerCase()}.com`,
                id_historial_estado: idHistorialBase
            });
        }
        clientesIds.push(cliente._id.toString());
    }

    // --------------------------------------------------------------------------------
    // 6. PROYECTOS
    // --------------------------------------------------------------------------------
    console.log('🔹 Creando Proyectos...');
    const proyectosIds: string[] = [];

    // Creamos 2 proyectos por cliente
    for (const idCliente of clientesIds) {
        for (let i = 1; i <= 2; i++) {
            const tipoRandom = tiposIds[Math.floor(Math.random() * tiposIds.length)];
            const proyecto = await proyectoService.create({
                nombre: `Proyecto ${i} - Cliente ${idCliente.slice(-4)}`,
                id_cliente: idCliente,
                id_tipoProyecto: tipoRandom
            });
            proyectosIds.push(proyecto._id.toString());
        }
    }

    // --------------------------------------------------------------------------------
    // 7. RECLAMOS MASIVOS
    // --------------------------------------------------------------------------------
    console.log('🔥 Generando Reclamos Masivos para el Dashboard...');

    // Helper para fechas random en los últimos 30 días
    const randomDate = (start: Date, end: Date) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    const tiposReclamo = Object.values(TipoReclamo);
    const prioridades = Object.values(PrioridadReclamo);
    const estados = Object.values(EstadoReclamo);
    const criticidades = Object.values(CriticidadReclamo);
    const areasIds = Array.from(areasMap.values());

    // Generamos 50 reclamos aleatorios
    for (let i = 0; i < 50; i++) {
        const proyectoId = proyectosIds[Math.floor(Math.random() * proyectosIds.length)];
        const areaId = areasIds[Math.floor(Math.random() * areasIds.length)];
        const usuarioId = usuariosIds[Math.floor(Math.random() * usuariosIds.length)];

        const estado = estados[Math.floor(Math.random() * estados.length)];
        const fecha = randomDate(new Date(2024, 0, 1), new Date()); // Desde enero hasta hoy

        // Truco para setear la fecha de creación manualmente (necesitamos inyectarla al modelo)
        // Como el servicio no permite setear createdAt, crearemos el objeto directo con el modelo
        // para simular historia.
        const reclamoModel = (reclamoService as any).reclamoRepository.reclamoModel;

        await reclamoModel.create({
            descripcion_detallada: `Incidente reportado #${i + 100} - Error en módulo de sistema`,
            id_proyecto: new mongoose.Types.ObjectId(proyectoId),
            id_area: new mongoose.Types.ObjectId(areaId),
            id_usuario_creador: new mongoose.Types.ObjectId(usuariosIds[0]), // Creado por admin
            id_usuario_asignado: estado !== EstadoReclamo.NUEVO ? new mongoose.Types.ObjectId(usuarioId) : null,
            id_tipo_reclamo: tiposReclamo[Math.floor(Math.random() * tiposReclamo.length)],
            id_prioridad: prioridades[Math.floor(Math.random() * prioridades.length)],
            id_criticidad: criticidades[Math.floor(Math.random() * criticidades.length)],
            id_estado_reclamo: estado,
            resumen_resolucion: (estado === EstadoReclamo.CERRADO || estado === EstadoReclamo.RESUELTO) ? 'Solucionado mediante parche de seguridad.' : '',
            createdAt: fecha
        });
    }

    console.log('✅ SEED COMPLETADO CON ÉXITO 🚀');
    console.log('   - 1 Estado Base');
    console.log(`   - ${areasData.length} Áreas`);
    console.log(`   - ${usuariosData.length} Usuarios`);
    console.log(`   - ${tiposData.length} Tipos de Proyecto`);
    console.log(`   - ${clientesNombres.length} Clientes`);
    console.log(`   - ${proyectosIds.length} Proyectos`);
    console.log('   - ~50 Reclamos con fechas históricas');

    await app.close();
}
bootstrap();