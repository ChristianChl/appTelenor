import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Ingreso } from '../../interfaces/Ingreso';
import { DetalleIngreso } from '../../interfaces/DetalleIngreso';
import { PersonaService } from '../../services/persona.service'
import { ProductoService } from '../../services/producto.service';
import { IngresoService } from '../../services/ingreso.service';
import { DetalleIngresoService } from '../../services/detalle-ingreso.service';
import { HistorialProductoService } from '../../services/historial-producto.service';


import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HistorialProducto } from '../../interfaces/HistorialProducto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-ingreso',
  templateUrl: './form-ingreso.component.html',
  styleUrls: ['./form-ingreso.component.css']
})
export class FormIngresoComponent implements OnInit{

  skillsForm: FormGroup;
  info: any;
  
  persona:any = [];
  producto:any = [];
  productoActualizar:any = [];

  prueba = "15";

  formDatosIngreso = new FormGroup({
    serieIngreso: new FormControl(),
    tipoDocIngreso: new FormControl(),
    numComIngreso: new FormControl(),
    proveedor: new FormControl(),
    fechaIngreso: new FormControl(),
    guiaRemitente: new FormControl(),
    ordenCompra: new FormControl()
    
  });

  historialProducto:HistorialProducto = {
    id_historial: 0,
    id_producto: 0,
    hist_modelo: "",
    hist_descripcion: "",
    hist_caracteristica: "",
    hist_stock: 0,
    hist_imagen: "",
    hist_activo: "",
    hist_precioVenta: 0,
    hist_cambioTiempo:"",
    hist_cantVenta:0,
    hist_cantCompra:0,
    fk_id_categoria: "",
    fk_id_marca: "",
    fk_id_medida: "",
    fk_id_tipo: "",
    fk_id_usuario: ""
  }

  ingreso: Ingreso = {
    id_ingreso: 0,
    ing_tipoComprobante: "",
    ing_serieComprobante: "",
    ing_numeroComprobante: "",
    ing_fechaHora: "",
    ing_impuesto: "",
    ing_totalCompra: "" ,
    ing_estado	: "",
    ing_guiaRemitente:"",
    ing_observacion:"",
    ing_gravada : "",
    ing_igv : "",
    ing_ordenCompra:"",
    fk_id_persona:"" ,
    fk_id_usuario: ""
  };

  detalleIngreso : DetalleIngreso = {
    id_detalleIngreso: 0,
    deti_cantidad: 0,
    deti_precioCompra: 0,
    deti_precioVenta: 0,
    deti_subTotal: 0,
    deti_total: 0,
    fk_id_producto: 0,
    fk_id_ingreso: 0
  }


  tipoDoc: any = [
    {text:"Seleccionar", value:""},
    {text:"Factura", value:"1"},
    {text:"Boleta", value:"2"},
    {text:"Nota de Venta", value:"3"},
  ];

  igv: any = [
    {text:"Si", value:"1"},
    {text:"No", value:"2"},
  ];

  igvtotal= 0;
  gravada = 0;

  constructor(
    private prductoService:ProductoService,
    private personaService: PersonaService, 
    private ingresoService: IngresoService,
    private detalleIngresoService:DetalleIngresoService,
    private authService: AuthService,
    private fb:FormBuilder,
    private router: Router,
    private historialProductoService:HistorialProductoService,
    private datePipe: DatePipe) {
 
    this.skillsForm = this.fb.group({
      skills: this.fb.array([]) ,
    });
    
    this.buildForm();
  }
  fechaActual: any = "";
  ngOnInit(): void {
    this.getProveedor();
    this.getProductos();
    this.addSkills();

    this.fechaActual = this.datePipe.transform(new Date().toISOString(), 'yyyy-MM-dd');
    this.ingreso.ing_fechaHora = this.fechaActual;
  }
  
  getProductos(){
    this.prductoService.getProductos().subscribe(
      res => {
        this.producto = res;
        this.producto = this.producto.producto;
        
        this.producto = this.producto.filter(function(ele: any){
          return ele.prod_activo == true;
        });
      },
      err => console.error(err)
    );
  }
  
  getProductoIndividual(arrayProductos:any, id:any){
    let filterProducto = []
    for(let i=0; i<arrayProductos.length; i++){

        if(arrayProductos[i].id_Producto == id){
          filterProducto.push(arrayProductos[i]);
        }
    }
    return filterProducto
  }

  actualizaProducto(id:any, productoActualizar:any, detalleIngreso:any){

    this.historialProducto.id_producto = productoActualizar.id_Producto;
    this.historialProducto.hist_modelo = productoActualizar.prod_modelo;
    this.historialProducto.hist_descripcion = productoActualizar.prod_descripcion;
    this.historialProducto.hist_caracteristica = productoActualizar.prod_caracteristica;
    this.historialProducto.hist_stock = productoActualizar.prod_stock;
    this.historialProducto.hist_imagen = productoActualizar.prod_imagen;
    this.historialProducto.hist_activo = productoActualizar.prod_activo;
    this.historialProducto.hist_precioVenta = productoActualizar.prod_precioVenta;
    this.historialProducto.hist_activo = productoActualizar.prod_activo;
    this.historialProducto.fk_id_categoria = productoActualizar.fk_id_categoria;
    this.historialProducto.fk_id_marca = productoActualizar.fk_id_marca;
    this.historialProducto.fk_id_medida = productoActualizar.fk_id_medida;
    this.historialProducto.fk_id_tipo = productoActualizar.fk_id_tipo;
    this.historialProducto.hist_cambioTiempo = "Compra";
    this.historialProducto.hist_cantCompra = detalleIngreso.deti_cantidad;
    this.historialProducto.fk_id_usuario = this.usuario.uid;

    this.historialProductoService.saveHistorialProducto(this.historialProducto)
    .subscribe(ok =>{
      if( ok == true ) {

      }else{
      }
    })


    this.prductoService.updateProducto(id, productoActualizar)
    .subscribe(
      ok => {
      });

  }

  numComprobante: number | undefined;
  id = 0;
  guardarDatos(){
    
    const value = this.formDatosIngreso.value;
    const num = this.ingreso.ing_numeroComprobante;
    this.numComprobante = Number(this.ingreso.ing_numeroComprobante);
    this.ingreso.id_ingreso = Number(this.ingreso.ing_numeroComprobante);
    this.ingreso.fk_id_usuario = this.usuario.uid;
    
    const arrayProductos = this.skillsForm.value.skills;

    if(this.formDatosIngreso.valid)
    {
      if(this.skillsForm.valid){

      this.ingresoService.saveIngreso(this.ingreso)
      .subscribe(
      ok=>{
        if (ok== true && this.formDatosIngreso.valid && this.skillsForm.valid) {
          
              this.formDatosIngreso.reset();
        }
        else{
          this.formDatosIngreso.markAllAsTouched();
          Swal.fire('Error', ok, 'error');
        }
      });
      
     

        for(let i=0; i<arrayProductos.length; i++){
          
          this.detalleIngreso.id_detalleIngreso = 0;
          this.detalleIngreso.deti_cantidad= Number(arrayProductos[i].num1);
          this.detalleIngreso.deti_precioCompra=Number(arrayProductos[i].num2);
          this.detalleIngreso.deti_precioVenta = 0.00;
          this.detalleIngreso.deti_subTotal=Number(arrayProductos[i].subTotal);
          this.detalleIngreso.deti_total=Number(arrayProductos[i].total);
          this.detalleIngreso.fk_id_producto = Number(arrayProductos[i].producto);
          this.detalleIngreso.fk_id_ingreso = Number(this.numComprobante.toString());
          this.id = Number(this.detalleIngreso.fk_id_producto)
          //Obtener el producto


          const productoIndi =  this.getProductoIndividual(this.producto,  this.id);

          const cantidadIngresada = Number(arrayProductos[i].num1);

          productoIndi[0].prod_stock = productoIndi[0].prod_stock + cantidadIngresada;
          

          this.actualizaProducto(this.id, productoIndi[0],this.detalleIngreso);
          //
          this.detalleIngresoService.saveIngreso(this.detalleIngreso)
          .subscribe(
            ok=>{
              if (ok== true) {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Se guardo con Exito el producto',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.skillsForm.reset();
                this.router.navigateByUrl('/dashboard/listaIngreso');

              }
              else{
                this.formDatosIngreso.markAllAsTouched();
                Swal.fire('Error', ok, 'error');
              }
            });
        }
     }
     else{
      Swal.fire('Error', "Complete los datos de los productos", 'error');
     }
    }

    else{

      this.formDatosIngreso.markAllAsTouched();
      Swal.fire('Error', 'Por favor complete los campos obligatorios', 'error');

    }
    
    
  }
  

  get skills() : FormArray {
    return this.skillsForm.get("skills") as FormArray
  }

  newSkill(): FormGroup {
    return this.fb.group({
      producto: '',
      igv: '1',
      num1: '',
      num2: '',
      subTotal:'',
      total: ''
    })
  }

  addSkills() {
    this.subTotal = 0;
    this.skills.push(this.newSkill());
  }

  removeSkill(i:number) {
    this.skills.removeAt(i);
  }

  onSubmit() {

  }

  private buildForm() {


    this.formDatosIngreso.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {

    });

    this.skillsForm.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {

    });
  }

  prueba2(){

  
  }
  probar : boolean = false;

  cambioIgv(indice:any, validacion:boolean){
      if(this.skillsForm.controls.skills.value[indice].igv == "" || this.skillsForm.controls.skills.value[indice].igv == "2"){
        this.skillsForm.controls.skills.value[indice].subTotal  = (this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2).toFixed(2);
        
      }
      else{
        this.skillsForm.controls.skills.value[indice].subTotal  = ((this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2)-((this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2)*0.18)).toFixed(2);
        
      }

      
      this.info = this.skillsForm.value;

      const linesFormArray = this.skillsForm.get("skills") as FormArray;
      this.info.skills.forEach((a: { skills: any[]; },index: number) => {
       
        linesFormArray.at(index).setValue(a);
        
     });
  }

  totalFinal = 0;
  subTotal = 0;
  onKeyUp(indice:any){

    this.probar = false;
    // Sub-Total
    if(this.skillsForm.controls.skills.value[indice].igv == "" || this.skillsForm.controls.skills.value[indice].igv == "2"){
      this.skillsForm.controls.skills.value[indice].subTotal  = (this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2).toFixed(2);
      
    }
    else{
      this.skillsForm.controls.skills.value[indice].subTotal  = ((this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2)/1.18).toFixed(2);
      
    }

    //Total
    this.skillsForm.controls.skills.value[indice].total = (this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2).toFixed(2);
    
    this.subTotal = this.skillsForm.controls.skills.value[indice].subTotal;

    

    this.info = this.skillsForm.value;

    const linesFormArray = this.skillsForm.get("skills") as FormArray;
    this.info.skills.forEach((a: { skills: any[]; },index: number) => {
       
       linesFormArray.at(index).setValue(a);
       
    });
    
    this.getTotal();
  }

  getTotal(){
    this.totalFinal = 0;
    this.gravada = 0;
    this.igvtotal = 0;

    const linesFormArray = this.skillsForm.get("skills") as FormArray;
    this.info.skills.forEach((a: { skills: any[]; },index: number) => {

        this.gravada = Number(this.info.skills[index].subTotal) + this.gravada;
        this.ingreso.ing_gravada = (this.gravada.toFixed(2)).toString();


        this.igvtotal = (Number(this.info.skills[index].total)-(Number(this.info.skills[index].total)/1.18))+ this.igvtotal
        this.ingreso.ing_igv = (this.igvtotal.toFixed(2)).toString();
       
        this.totalFinal = Number(this.info.skills[index].total) + this.totalFinal;
        
        this.ingreso.ing_totalCompra = (this.totalFinal.toFixed(2)).toString();
   });
  }

  // Primer cards 

  get usuario(){
    return this.authService.usuario;
  } 

  isVisibleProveedor = false;

  openModalProveedor(){
    this.idProveedor = "";
    this.isVisibleProveedor = true;
  }

  idProveedor = "";
  modalEditProveedor(id:string){
    this.isVisibleProveedor = true;
    this.idProveedor = id;
  }

  nuevoDatoProveedor(){
    this.ngOnInit();
    this.isVisibleProveedor = false;
  }

  validarCampo(campo : string){
    return this.formDatosIngreso.controls[campo].errors && this.formDatosIngreso.controls[campo].touched 
          ; 
  }

  submitForm(): void {
    for (const i in this.formDatosIngreso.controls) {
      this.formDatosIngreso.controls[i].markAsDirty();
      this.formDatosIngreso.controls[i].updateValueAndValidity();
    }
  }

  getProveedor(){

    this.personaService.getPersonas().subscribe(
      res => {
        this.persona = res;
        this.persona = this.persona.persona;
       
         this.persona = this.persona.filter(function(ele: any){
          return ele.TipoPersonas.tipoper_descripcion == 'Proveedor' && ele.per_activo == true;
          });
      },
      err => console.error(err)
    );
  }
  isVisibleProducto:any = false;

  idProductoModal:any = "";
  paginaAnterior:string =""
   openModalProducto(){
    this.paginaAnterior = "compra";
    this.idProductoModal= "";
    this.isVisibleProducto = true;
  }

  nuevoDatoProducto(){
    this.getProductos();
    this.isVisibleProducto = false;
  }

}
