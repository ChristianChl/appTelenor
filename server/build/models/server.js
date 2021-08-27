"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const auth_1 = __importDefault(require("../routes/auth"));
const marca_1 = __importDefault(require("../routes/marca"));
const categoria_1 = __importDefault(require("../routes/categoria"));
const medida_1 = __importDefault(require("../routes/medida"));
const tipoProducto_1 = __importDefault(require("../routes/tipoProducto"));
const producto_1 = __importDefault(require("../routes/producto"));
const historialProducto_1 = __importDefault(require("../routes/historialProducto"));
const perfil_1 = __importDefault(require("../routes/perfil"));
const permiso_1 = __importDefault(require("../routes/permiso"));
const tipoDocumento_1 = __importDefault(require("../routes/tipoDocumento"));
const tipoPersona_1 = __importDefault(require("../routes/tipoPersona"));
const persona_1 = __importDefault(require("../routes/persona"));
const venta_1 = __importDefault(require("../routes/venta"));
const cotizacion_1 = __importDefault(require("../routes/cotizacion"));
const detalleVenta_1 = __importDefault(require("../routes/detalleVenta"));
const ingreso_1 = __importDefault(require("../routes/ingreso"));
const detalleIngreso_1 = __importDefault(require("../routes/detalleIngreso"));
const detalleCotizacion_1 = __importDefault(require("../routes/detalleCotizacion"));
const usuarioPermiso_1 = __importDefault(require("../routes/usuarioPermiso"));
const moneda_1 = __importDefault(require("../routes/moneda"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../database/connection"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        this.apiPaths = {
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
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '3000';
        //Métodos Iniciales
        this.dbConnnection();
        this.middlewares();
        this.routes();
        this.getRoutes();
    }
    //TODO: Conectar base de datos
    dbConnnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database Online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use(cors_1.default());
        //Lectura del body
        this.app.use(express_1.default.json());
        //Carpeta pública
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuario, usuario_1.default);
        this.app.use(this.apiPaths.auth, auth_1.default);
        this.app.use(this.apiPaths.marca, marca_1.default);
        this.app.use(this.apiPaths.categoria, categoria_1.default);
        this.app.use(this.apiPaths.medidad, medida_1.default);
        this.app.use(this.apiPaths.tipoProducto, tipoProducto_1.default);
        this.app.use(this.apiPaths.producto, producto_1.default);
        this.app.use(this.apiPaths.perfil, perfil_1.default);
        this.app.use(this.apiPaths.permiso, permiso_1.default);
        this.app.use(this.apiPaths.tipoDocumento, tipoDocumento_1.default);
        this.app.use(this.apiPaths.tipoPersona, tipoPersona_1.default);
        this.app.use(this.apiPaths.persona, persona_1.default);
        this.app.use(this.apiPaths.venta, venta_1.default);
        this.app.use(this.apiPaths.detalleVenta, detalleVenta_1.default);
        this.app.use(this.apiPaths.ingreso, ingreso_1.default);
        this.app.use(this.apiPaths.detalleIngreso, detalleIngreso_1.default);
        this.app.use(this.apiPaths.usuarioPermiso, usuarioPermiso_1.default);
        this.app.use(this.apiPaths.monedas, moneda_1.default);
        this.app.use(this.apiPaths.Cotizacion, cotizacion_1.default);
        this.app.use(this.apiPaths.DetalleCotizacion, detalleCotizacion_1.default);
        this.app.use(this.apiPaths.historialProducto, historialProducto_1.default);
    }
    //Manejar demas rutas
    getRoutes() {
        this.app.get('*', (req, res) => {
            res.sendFile(path_1.default.resolve(__dirname, '../public/index.html'));
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto  ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map