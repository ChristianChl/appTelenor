export interface Venta{
    id_venta?: number;
    ven_tipoComprobante?: string;
    ven_serieComprobante?: string;
    ven_numeroComprobante?: string;
    ven_fechaHora?: string;
    ven_impuesto?: string;
    ven_total?: string;
    ven_estado	?: string;
    ven_guiaRemitente?:string;
    ven_ordenCompra? : string;
    ven_observacion? : string;
    ven_gravada? : string;
    ven_igv? : string;
    fk_id_persona?: number;
    fk_id_usuario?: string;
    fk_id_moneda?: number;
    ok?:boolean;
    msg?:string;
}