export interface Persona{
    id_Persona?: number;
    per_razonSocial?: string;
    per_numeroDocumento?: string;
    per_direccion?: string;
    per_celular?: string;
    per_telefonoFijo?: string;
    per_email?: string;
    per_activo?:string;
    fk_id_tipoDocumento?: string;
    fk_id_tipoPersona?: string;
    ok?:boolean;
    msg?:string;
}