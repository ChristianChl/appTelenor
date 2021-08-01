import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Producto } from '../../interfaces/Producto';
import { CategoriasService } from '../../services/categorias.service';
import { MarcaService } from '../../services/marca.service';
import { ProductoService } from '../../services/producto.service';
import { TipoProductoService } from '../../services/tipo-producto.service';
import { UnidadMedidaService } from '../../services/unidad-medida.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  @Input() isVisibleProducto: any;
  @Input() idProducto: any;
  @Output() newVisibleProducto : EventEmitter<boolean>  = new EventEmitter<boolean>();

  img = 'https://tse2.mm.bing.net/th?id=OIP.2jHHTQc6_5uS-HvEaMzK1wHaHa&pid=Api&P=0&w=300&h=300';
  formProducto = new FormGroup({
    modeloProducto: new FormControl(),
    descripcionProducto: new FormControl(),
    caracteristicaProducto : new FormControl(),
    categoriaProducto : new FormControl(),
    marcaProducto : new FormControl(),
    medidaProducto : new FormControl(),
    tipoProducto : new FormControl(),
    activoProducto : new FormControl(),
    precioProducto : new FormControl(),
    imgProducto : new FormControl()
  });

  inputValue?: string;
  edit: boolean = false;
  switchValue = false;
  checked = true;

  producto: Producto = {
    id_Producto: 0,
    prod_modelo: "",
    prod_descripcion: "",
    prod_caracteristica: "",
    prod_stock: 0,
    prod_imagen: "",
    prod_activo: "",
    prod_precioVenta: 0,
    fk_id_categoria: "",
    fk_id_marca: "",
    fk_id_medida: "",
    fk_id_tipo: ""
  };
  
  toppings: FormGroup;
  // Funciones de Marca

  idMarca = "";
  isVisibleMarca = false;
  showModalMarca(){
    console.log(this.isVisibleMarca);
    this.isVisibleMarca = true;  
    
    this.idMarca = "";
    console.log(this.idMarca);
  }

  nuevoDatoMarca(){
    console.log("prueba regresando");
    this.ngOnInit();
    this.isVisibleMarca = false;
  }

  showModalEditarMarca(id:string){
    this.isVisibleMarca = true;  
    console.log("Editar Categoria");
    this.idMarca = id;
  }

  // Funcines de Categoria 

  idCategoria = "";

  isVisibleCategoria = false;

  showModalCategoria(): void {
    
    this.isVisibleCategoria = true;  
  }

  nuevoDatoCategoria(){
    this.ngOnInit();
    this.isVisibleCategoria = false;
    this.idCategoria = "";
  }

  handleCancelCategoria(): void {
    console.log('Button cancel clicked!');
    this.isVisibleCategoria = false;
  }

  handleCancelMarca(): void {
    console.log('Button cancel clicked!');
    this.isVisibleMarca = false;
  }

  selectedCategoria = null;
  selectedMedida = null;
  selectedTipo= null;
  selectedMarca= null;

  categoria:any = [];
  marca:any = [];
  medida:any = [];
  tipoProducto:any = [];

  constructor(fb: FormBuilder, private formBuilder : FormBuilder, 
    private marcaService: MarcaService, 
    private productoService: ProductoService, 
    private categoriaService: CategoriasService,
    private medidaService: UnidadMedidaService, 
    private tipoProductoService: TipoProductoService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) { 

    this.buildForm();

    this.toppings = fb.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false
    });
  }

  ngOnInit(): void {

    this.edit = false;
    this.producto.prod_activo = "true";
    if(this.idProducto != ""){
      this.productoService.getProducto(this.idProducto)
      .subscribe(
        res => {
          console.log(res);
          this.producto = res;
          this.edit = true;
        },
        err => console.log(err)
      )
    }
      console.log("prueba de oninit");
      this.edit = false;

    this.getCategoria();
    this.getMarca();
    this.getMedida();
    this.getTipoProducto();
  }

  getCategoria(){
      this.categoriaService.getCategorias().subscribe(
        res=>{
          this.categoria = res;
          console.log(this.categoria);
          this.categoria = this.categoria.categoria;
        }
      )
  }

  getMarca(){
    this.marcaService.getMarcas().subscribe(
      res=>{
        this.marca = res;
        this.marca = this.marca.marca;
      }
    )
  }

  getMedida(){
    this.medidaService.getMedidas().subscribe(
      res=>{
        this.medida = res;
        this.medida = this.medida.medida;
      }
    )
  }

  getTipoProducto(){
    this.tipoProductoService.getTipoProductos().subscribe(
      res=>{
        this.tipoProducto = res;
        this.tipoProducto = this.tipoProducto.tipoProducto;
      }
    )
  }

  
  validarCampo(campo : string){
    return this.formProducto.controls[campo].errors && this.formProducto.controls[campo].touched 
          ; 
  }
  
  private buildForm() {
    this.formProducto = this.formBuilder.group({
      modeloProducto: ['' , [Validators.required]],
      descripcionProducto: ['', [Validators.required]],
      caracteristicaProducto: ['', []],
      categoriaProducto: ['', [Validators.required]],
      marcaProducto: ['', [Validators.required]],
      medidaProducto: ['', [Validators.required]],
      tipoProducto: ['', [Validators.required]],
      precioProducto: ['', [Validators.required]],
      activoProducto: ['', [Validators.required]],
      imgProducto: ['', []],
    });

    this.formProducto.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      console.log(value);
    });
  }

  submitForm(): void {
    for (const i in this.formProducto.controls) {
      this.formProducto.controls[i].markAsDirty();
      this.formProducto.controls[i].updateValueAndValidity();
    }
  }


  saveNewProducto(){

  
    this.productoService.saveProducto(this.producto)
    .subscribe(ok =>{
      
      if( ok == true && this.formProducto.valid ) {
        
        Swal.fire('Success', 'Producto creado exitosamente!', 'success');
        this.formProducto.reset();
        this.router.navigateByUrl('/dashboard/listaProducto');
        this.handleCancelProducto();

      }else{
        this.formProducto.markAllAsTouched();
        Swal.fire('Error', ok, 'error');
        console.log(ok);
      }
      
    });
  }

  updateProducto(){

    console.log("Entro a editar");
    const params = this.activatedRoute.snapshot.params;
    this.productoService.updateProducto(this.idProducto, this.producto)
      .subscribe(
        ok => {
          if (this.formProducto.valid) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se guardo con Exito',
              showConfirmButton: false,
              timer: 1500
            });
            this.formProducto.reset();
            this.ngOnInit();
            this.isVisibleProducto = false;
            this.newVisibleProducto.emit(this.isVisibleProducto);
          }
          else{
            this.formProducto.markAllAsTouched();
            Swal.fire('Error', ok, 'error');
            console.log(ok);
          }
          
        });
  }

  

  handleCancelProducto(){
    console.log('Button cancel clicked!');
    
    
    this.isVisibleProducto = false;
    this.formProducto.reset();
    this.producto.id_Producto = 0;
    this.producto.prod_modelo = "";
    this.producto.prod_descripcion = "";
    this.producto.prod_caracteristica = "";
    this.producto.prod_stock = 0;
    this.producto.prod_imagen = "";
    this.producto.fk_id_categoria = "";
    this.producto.fk_id_marca = "";
    this.producto.fk_id_medida = "";
    this.producto.fk_id_tipo = "";
    this.newVisibleProducto.emit(this.isVisibleProducto);
    //this.producto.prod_modelo="";

    console.log("el id" + this.producto.id_Producto);
  }

}
