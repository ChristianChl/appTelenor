export interface DetalleVenta{
    id_detalleVenta?: number;
    detv_cantidad?: number;
    detv_precioVenta?: number ;
    detv_subTotal?: number;
    detv_total?: number ;
    fk_id_producto?: number;
    fk_id_venta?: number;
    ok?:boolean;
    msg?:string;
}