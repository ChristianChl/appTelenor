export interface Cotizacion{
    id_cotizacion?: number;
    coti_fechaHora?: string;
    coti_total?: string;
    coti_observacion? : string;
    coti_tipoCambio?:string;
    coti_hechoVenta?:boolean;
    fk_id_persona?: string;
    fk_id_usuario?: string;
    fk_id_moneda?: string;
    ok?:boolean;
    msg?:string;
}