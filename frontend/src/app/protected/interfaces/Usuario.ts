export interface Usuarios{
    
    id_usuario?: number;
    us_apellidos?: string;
    us_nombres?: string;
    us_numeroDocumento?: string;
    us_direccion?: string;
    us_telefono?: string;
    us_email?: string;
    us_fechaRegistro?: string;
    us_login?: string;
    us_clave?: string;
    us_activo?: string;
    fk_id_perfil?: string;
    fk_id_tipoDocumento?: string;
    ok?: boolean;
    msg?: string;
}