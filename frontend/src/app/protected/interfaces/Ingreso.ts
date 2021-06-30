export interface Ingreso{
    id_ingreso?: number;
    ing_tipoComprobante?: string;
    ing_serieComprobante?: string;
    ing_numeroComprobante?: string;
    ing_fechaHora?: string;
    ing_impuesto?: string;
    ing_totalCompra?: string;
    ing_estado	?: string;
    ing_guiaRemitente?:string;
    ing_ordenCompra? : string;
    ing_observacion? : string;
    fk_id_persona?: string;
    fk_id_usuario?: string;
    ok?:boolean;
    msg?:string;
}