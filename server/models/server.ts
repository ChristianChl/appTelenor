import express, {Application} from 'express';
import userRoutes from '../routes/usuario';
import authRoutes from '../routes/auth';
import marcaRoutes from '../routes/marca';
import categoriaRoutes from '../routes/categoria';
import medidaRoutes from '../routes/medida';
import tipoProducto from '../routes/tipoProducto';
import producto from '../routes/producto';
import historialProducto from '../routes/historialProducto';
import perfil from '../routes/perfil';
import permiso from '../routes/permiso';
import tipoDocumento from '../routes/tipoDocumento';
import tipoPersona from '../routes/tipoPersona';
import persona from '../routes/persona';
import venta from '../routes/venta';
import Cotizacion from  '../routes/cotizacion';
import detalleVenta from '../routes/detalleVenta';
import ingreso from '../routes/ingreso';
import detalleIngreso from '../routes/detalleIngreso';
import DetalleCotizacion from  '../routes/detalleCotizacion';
import usuarioPermiso from '../routes/usuarioPermiso';
import moneda from '../routes/moneda';
import cors from 'cors';
import db from '../database/connection';
import path from 'path';
import { Request, Response } from "express";

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuario: '/api/usuario',
        auth: '/api/auth',
        marca: '/api/marca',
        categoria: '/api/categoria',
        medidad: '/api/medida',
        tipoProducto: '/api/tipoProducto',
        producto: '/api/producto',
        historialProducto: '/api/historialProducto',
        perfil: '/api/perfil',
        permiso: '/api/permiso',
        tipoDocumento: '/api/tipoDocumento',
        tipoPersona: '/api/tipoPersona',
        persona: '/api/persona',
        venta: '/api/venta',
        detalleVenta: '/api/detalleVenta',
        ingreso: '/api/ingreso',
        detalleIngreso: '/api/detalleIngreso',
        usuarioPermiso: '/api/usuarioPermiso',
        monedas: '/api/moneda',
        Cotizacion: '/api/cotizacion',
        DetalleCotizacion: '/api/detalleCotizacion'

    }
    


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';

        //Métodos Iniciales
        this.dbConnnection();
        this.middlewares();
        this.routes();
        this.getRoutes();
    }
    //TODO: Conectar base de datos

    async dbConnnection(){
        try {

            await db.authenticate();
            console.log('Database Online');
            
        } catch (error) {

            throw new Error(error);
            
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura del body
        this.app.use(express.json());

        //Carpeta pública
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.apiPaths.usuario, userRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.marca, marcaRoutes);
        this.app.use(this.apiPaths.categoria, categoriaRoutes);
        this.app.use(this.apiPaths.medidad, medidaRoutes);
        this.app.use(this.apiPaths.tipoProducto, tipoProducto);
        this.app.use(this.apiPaths.producto, producto);
        this.app.use(this.apiPaths.perfil, perfil);
        this.app.use(this.apiPaths.permiso, permiso);
        this.app.use(this.apiPaths.tipoDocumento, tipoDocumento);
        this.app.use(this.apiPaths.tipoPersona, tipoPersona);
        this.app.use(this.apiPaths.persona, persona);
        this.app.use(this.apiPaths.venta, venta);
        this.app.use(this.apiPaths.detalleVenta, detalleVenta);
        this.app.use(this.apiPaths.ingreso, ingreso);
        this.app.use(this.apiPaths.detalleIngreso, detalleIngreso);
        this.app.use(this.apiPaths.usuarioPermiso, usuarioPermiso);
        this.app.use(this.apiPaths.monedas, moneda );
        this.app.use(this.apiPaths.Cotizacion, Cotizacion );
        this.app.use(this.apiPaths.DetalleCotizacion, DetalleCotizacion );
        this.app.use(this.apiPaths.historialProducto, historialProducto );

    }

    //Manejar demas rutas
    getRoutes(){
        this.app.get('*', (req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname, '../public/index.html'));
        })
    }
    
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto  ' + this.port);
        })
    }
}

export default Server;