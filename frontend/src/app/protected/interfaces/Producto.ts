export interface Producto{
    id_Producto?: number;
    prod_modelo?: string;
    prod_descripcion?: string;
    prod_caracteristica?: string;
    prod_stock?: string;
    prod_imagen?: string;
    prod_activo?: string;
    fk_id_categoria?: string;
    fk_id_marca?: string;
    fk_id_medida?: string;
    fk_id_tipo?: string;
    ok?:boolean;
    msg?:string;
}