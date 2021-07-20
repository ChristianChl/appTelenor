export interface DetalleCotizacion{
    id_detalleCotizacion?: number;
    decoti_cantidad?: number;
    decoti_precioVenta?: number ;
    decoti_total?: number;
    fk_id_producto?: number;
    fk_id_cotizacion?: number;
    ok?:boolean;
    msg?:string;
}