export interface DetalleIngreso{
    id_detalleIngreso?: number;
    deti_cantidad?: number;
    deti_precioCompra?: number;
    deti_precioVenta?: number ;
    fk_id_producto?: number;
    fk_id_ingreso?: number;
    ok?:boolean;
    msg?:string;
}