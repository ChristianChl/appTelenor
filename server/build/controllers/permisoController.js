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
exports.deletePermiso = exports.putPermiso = exports.postPermiso = exports.getPermiso = exports.getPermisos = void 0;
const permiso_1 = __importDefault(require("../models/permiso"));
const getPermisos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const permiso = yield permiso_1.default.findAll();
    res.json({ permiso });
});
exports.getPermisos = getPermisos;
const getPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const permiso = yield permiso_1.default.findByPk(id);
    if (permiso) {
        res.json(permiso);
    }
    else {
        res.status(404).json({
            msg: `no existe un permiso con el id ${id}`
        });
    }
});
exports.getPermiso = getPermiso;
const postPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const permiso = permiso_1.default.build(body);
        yield permiso.save();
        return res.status(201).json({
            ok: true,
            permiso
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postPermiso = postPermiso;
const putPermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const permiso = yield permiso_1.default.findByPk(id);
        if (!permiso) {
            return res.status(404).json({
                msg: 'No existe el permiso con el id ' + id
            });
        }
        yield permiso.update(body);
        res.json(permiso);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putPermiso = putPermiso;
const deletePermiso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const permiso = yield permiso_1.default.findByPk(id);
    if (!permiso) {
        return res.status(404).json({
            msg: 'No existe el permiso con el id' + id
        });
    }
    yield permiso.destroy();
    res.json(permiso);
});
exports.deletePermiso = deletePermiso;
//# sourceMappingURL=permisoController.js.map