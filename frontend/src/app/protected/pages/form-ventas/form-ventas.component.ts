import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PersonaService } from '../../services/persona.service';
import { Venta } from '../../interfaces/Venta';
import { MonedasService } from '../../services/monedas.service';
import { VentasService } from '../../services/ventas.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { debounceTime } from 'rxjs/operators';
import { ProductoService } from '../../services/producto.service';
import { DetalleVenta } from '../../interfaces/DetalleVenta';
import { DetallVentaService } from '../../services/detall-venta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HistorialProducto } from '../../interfaces/HistorialProducto';
import { HistorialProductoService } from '../../services/historial-producto.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-ventas',
  templateUrl: './form-ventas.component.html',
  styleUrls: ['./form-ventas.component.css']
})
export class FormVentasComponent implements OnInit {

  isVisibleProducto = false;

  skillsForm: FormGroup;
  persona:any = [];
  monedas:any = [];
  producto:any = [];

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

  direccionCliente = "";

  formDatosVentas = new FormGroup({
    tipoDocIngreso: new FormControl(null),
    tipoMoneda: new FormControl(),
    serieIngreso: new FormControl(),
    numComIngreso: new FormControl(),
    selecCliente: new FormControl(),
    direccionCliente: new FormControl(),
    fechaIngreso: new FormControl(),
    guiaRemitente: new FormControl(),
    ordenCompra: new FormControl(),
    tipoCambio: new FormControl()
    
  });

  detalleVenta : DetalleVenta = {
    id_detalleVenta: 0,
    detv_cantidad: 0,
    detv_precioVenta: 0,
    detv_subTotal: 0,
    detv_total: 0,
    fk_id_producto: 0,
    fk_id_venta: 0
  }

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
    fk_id_usuario:""
  }

  numeroCorrecto:any = 'no';

  venta: Venta = {
    id_venta: 0,
    ven_tipoComprobante: "",
    ven_serieComprobante: "",
    ven_numeroComprobante: "",
    ven_fechaHora: "",
    ven_impuesto: "",
    ven_total: "",
    ven_estado: "",
    ven_guiaRemitente:"",
    ven_ordenCompra: "",
    ven_observacion: "",
    ven_gravada: "",
    ven_igv: "",
    ven_tipoCambio : 1,
    fk_id_persona: 0,
    fk_id_usuario: "",
    fk_id_moneda: 0,
  }

  constructor(private personaService:PersonaService,
    private monedasService:MonedasService,
    private ventasService:VentasService,
    private authService:AuthService,
    private fb:FormBuilder,
    private productoService:ProductoService,
    private detallVentaService:DetallVentaService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private historialProductoService:HistorialProductoService,
    private datePipe: DatePipe
    ) 
    {
      this.skillsForm = this.fb.group({
        skills: this.fb.array([]) ,
      });
      
      this.buildForm();
     }
  
     maxDate:any = "";
     filterVentas:any = []
     fechaActual: any = "";
    ngOnInit(): void {

    const param = this.activatedRoute.snapshot.params
    this.getCliente();
    this.getMoneda();
    this.getProductos();
    
    this.getVentas();

    this.maxDate = new Date();
     
    this.formDatosVentas.controls.tipoDocIngreso.valueChanges.subscribe(changes => {
        this.Opciones(changes);

        this.venta.ven_numeroComprobante = this.siguienteVenta.toString();
    });
    this.fechaActual = this.datePipe.transform(new Date().toISOString(), 'yyyy-MM-dd');
    this.venta.ven_fechaHora = this.fechaActual;

    let inputFecha = document.getElementById("fechaIngreso");
    inputFecha?.setAttribute("disabled", "true");

    this.addSkills();
    
  }
  selectedDevice:any = "";
  onChangeTipoCambio(newValue:any) {
    this.selectedDevice = newValue;
    if(this.selectedDevice == 1){ 
        let input2 = document.getElementById("tipoCambio");
        input2?.setAttribute("disabled", "true");
        this.venta.ven_tipoCambio = 1;
        for(let i=0; i<this.skillsForm.value.skills.length; i++){
          this.info = this.skillsForm.value;
          if(this.info.skills[i].producto !=""){
            this.skillsForm.value.skills[i].num2 = ((Number(this.skillsForm.value.skills[i].precioOriginal)/Number(this.venta.ven_tipoCambio)).toFixed(2)).toString();
          }
          this.skillsForm.controls.skills.value[i].subTotal  = ((this.skillsForm.controls.skills.value[i].num1 *  this.skillsForm.controls.skills.value[i].num2)/1.18).toFixed(2);
          this.skillsForm.controls.skills.value[i].total = (this.skillsForm.controls.skills.value[i].num1 *  this.skillsForm.controls.skills.value[i].num2).toFixed(2);
        
        }
          this.info = this.skillsForm.value;
            const linesFormArray = this.skillsForm.get("skills") as FormArray;
            this.info.skills.forEach((a: { skills: any[]; },index: number) => {
              linesFormArray.at(index).setValue(a);
            });
          
            this.getTotal();

            
    }
    else{
      this.venta.ven_tipoCambio = 0;
      let input2 = document.getElementById("tipoCambio");
      input2?.removeAttribute("disabled");
    }
    // ... do other stuff here ...
  }

  OpcionesTCambio(opc: string){
    this.opc;
    if (opc == "1") {
      this.venta.ven_tipoCambio = 1;
    }
    else{
      this.venta.ven_tipoCambio = 0;
    }
  } 

  opc: any = "";
  Opciones(opc: string) {
    this.opc;
    if (opc == "1") {
      this.venta.ven_serieComprobante = "F001";
    } else if (opc == "2") {
      this.venta.ven_serieComprobante = "B001";
    } else if (opc == "3") {
      this.venta.ven_serieComprobante = "N001";
    } 

  }
  siguienteVenta = 0;
  totalFinal = 0;
  subTotal = 0;
  ventas:any = [];
  getVentas(){
    this.ventasService.getVentas().subscribe(
      res => {
        this.ventas = res;
        this.ventas = this.ventas.venta;
        this.siguienteVenta = this.ventas.length+1+10000;


        let numVenta = this.siguienteVenta;
        
        while(this.numeroCorrecto == 'no'){

          this.filterVentas = this.ventas.filter(function(ele: any){
            return ele.ven_numeroComprobante == numVenta;
          });

          if(this.filterVentas.length == 0){
            this.numeroCorrecto = 'si';
          } 
          else{
            this.numeroCorrecto = 'no';
            numVenta = numVenta + 1;
          }
        }

        this.siguienteVenta = numVenta;
      },
      err => console.error(err)
    );
  }
  
  addSkills() {
    this.subTotal = 0;
    this.skills.push(this.newSkill());
  }

  newSkill(): FormGroup {
    return this.fb.group({
      producto: '',
      igv: '1',
      num1: '',
      num2: '',
      precioOriginal:'',
      subTotal:'',
      total: ''
    })
  }

  get skills() : FormArray {
    return this.skillsForm.get("skills") as FormArray
  }

  removeSkill(i:number) {
    this.skills.removeAt(i);
  }

  probar : boolean = false;

  onKeyUp(indice:any){

    if(this.stockPro == true){
      this.skillsForm.controls.skills.value[indice].producto = this.refenciaProducto;
    }
    const idProducto = this.skillsForm.controls.skills.value[indice].producto;

    if(this.stockPro == true){
      this.skillsForm.controls.skills.value[indice].producto = 0;
    }

    
    this.filterProducto = this.producto.filter(function(ele: any){
      return ele.id_Producto == idProducto;
    });

    if(this.filterProducto[0].prod_stock < this.skillsForm.controls.skills.value[indice].num1){
      Swal.fire({
        icon: 'warning',
        title: 'Alerta',
        text: 'Sobrepaso el limite de Stock del Producto - Stock : ' + this.filterProducto[0].prod_stock,
      });

      this.skillsForm.controls.skills.value[indice].num1 = 0;
      this.skillsForm.controls.skills.value[indice].subTotal  = ((this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2)/1.18).toFixed(2);
      this.skillsForm.controls.skills.value[indice].total = (this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2).toFixed(2);
        
      this.info = this.skillsForm.value;

        const linesFormArray = this.skillsForm.get("skills") as FormArray;
        this.info.skills.forEach((a: { skills: any[]; },index: number) => {
          
          linesFormArray.at(index).setValue(a);
          
        });

        this.getTotal();
    }
    else{
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

    
  }

  igvtotal= 0;
  gravada = 0;

  getTotal(){
    this.totalFinal = 0;
    this.gravada = 0;
    this.igvtotal = 0;

    const linesFormArray = this.skillsForm.get("skills") as FormArray;
    this.info.skills.forEach((a: { skills: any[]; },index: number) => {

        this.gravada = Number(this.info.skills[index].subTotal) + this.gravada;
        this.venta.ven_gravada = (this.gravada.toFixed(2)).toString();


        this.igvtotal = (Number(this.info.skills[index].total)-(Number(this.info.skills[index].total)/1.18))+ this.igvtotal
        this.venta.ven_igv = (this.igvtotal.toFixed(2)).toString();
       
        this.totalFinal = Number(this.info.skills[index].total) + this.totalFinal;
        this.venta.ven_total = (this.totalFinal.toFixed(2)).toString();
   });
  }

  filterProducto:any = [];
  refenciaProducto:any = 0;
  stockPro = false;
  onKeyUpProducto(indice:any){
    
    this.filterProducto = [];
    const idProducto = this.skillsForm.controls.skills.value[indice].producto;
    
    this.filterProducto = this.producto.filter(function(ele: any){
      return ele.id_Producto == idProducto;
    });
    if(this.filterProducto.length != 0){
      if(this.filterProducto[0].prod_stock == 0){
        Swal.fire({
          icon: 'warning',
          title: 'Alerta',
          text: 'No hay stock para el producto seleccionado',
          confirmButtonText:
          ' <a routerLink="/dashboard/agregarIngreso"> <i  class="fa fa-thumbs-up"></i> Ir a Compras! </a>',
          showCancelButton: true,
          cancelButtonText:
          'OK!',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/dashboard/agregarIngreso');
          }
        });
  
        
        this.refenciaProducto = this.skillsForm.controls.skills.value[indice].producto;
        this.stockPro = true;
        this.skillsForm.controls.skills.value[indice].producto = 0;
  
        this.skillsForm.controls.skills.value[indice].num1 = 0;
        this.skillsForm.controls.skills.value[indice].num2 = 0;
        this.skillsForm.controls.skills.value[indice].subTotal  = ((this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2)/1.18).toFixed(2);
        this.skillsForm.controls.skills.value[indice].total = (this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2).toFixed(2);
         
  
        this.info = this.skillsForm.value;
          const linesFormArray = this.skillsForm.get("skills") as FormArray;
          this.info.skills.forEach((a: { skills: any[]; },index: number) => {
            
            linesFormArray.at(index).setValue(a);
            
          });
          this.onKeyUp(indice);
      }
      else{
          this.stockPro = false;
          this.skillsForm.controls.skills.value[indice].num1 = 1;
          this.skillsForm.controls.skills.value[indice].precioOriginal = this.filterProducto[0].prod_precioVenta;
  
          if(this.venta.fk_id_moneda == 2){
            this.skillsForm.controls.skills.value[indice].num2 = (this.filterProducto[0].prod_precioVenta / Number(this.venta.ven_tipoCambio)).toFixed(2);
          }
          else{
            this.skillsForm.controls.skills.value[indice].num2 = this.filterProducto[0].prod_precioVenta
          }
          
  
          this.info = this.skillsForm.value;
          const linesFormArray = this.skillsForm.get("skills") as FormArray;
          this.info.skills.forEach((a: { skills: any[]; },index: number) => {
            
            linesFormArray.at(index).setValue(a);
            
          });
          
          this.onKeyUp(indice);
      }
    }

    
    
  }
  info: any;

  getProductos(){
    this.productoService.getProductos().subscribe(
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

  private buildForm() {

    this.skillsForm.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
    });
  }
  onSubmit() {
  }


  //Abrir modal de Cliente 
  isVisibleCliente = false;
  openModalCliente(){
    this.idCliente = "";
    this.isVisibleCliente = true;
  }

  idCliente = "";
  modalEditCliente(id:string){
    this.isVisibleCliente = true;
    this.idCliente = id;
  }

  nuevoDatoCliente(){
    this.ngOnInit();
    this.isVisibleCliente = false;
  }
  ///

  validarCampo(campo : string){
    return this.formDatosVentas.controls[campo].errors && this.formDatosVentas.controls[campo].touched 
          ; 
  }

  getCliente(){
    this.personaService.getPersonas().subscribe(
      res => {
        this.persona = res;
        this.persona = this.persona.persona;
         this.persona = this.persona.filter(function(ele: any){

          return ele.TipoPersonas.tipoper_descripcion == 'Cliente';

        });
      },
      err => console.error(err)
    );
  }

  getMoneda(){
    this.monedasService.getMonedas().subscribe(
      res => {
        this.monedas = res;
        this.monedas = this.monedas.monedas;
      },
      err => console.error(err)
    );
  }

  submitForm(): void {
    for (const i in this.formDatosVentas.controls) {
      this.formDatosVentas.controls[i].markAsDirty();
      this.formDatosVentas.controls[i].updateValueAndValidity();
    }
  }
  //Obtener datos del usario 
  get usuario(){
    return this.authService.usuario;
    
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

  actualizaProducto(id:any, productoActualizar:any, detalleVenta:any){

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
    this.historialProducto.hist_cambioTiempo = "Venta";
    this.historialProducto.hist_cantVenta = detalleVenta.detv_cantidad;
    this.historialProducto.fk_id_usuario = this.usuario.uid;

    this.historialProductoService.saveHistorialProducto(this.historialProducto)
    .subscribe(ok =>{
      if( ok == true ) {
        

      }else{

      }
    })

    this.productoService.updateProducto(id, productoActualizar)
    .subscribe(
      ok => {
      });

  }

  //
  numComprobante: number | undefined;
  id = 0;
  guardarDatos(){
    if(this.formDatosVentas.valid){
      if(this.venta.ven_tipoCambio != 0){
        const refCompro = this.venta.ven_numeroComprobante;
        const ventaFilter = this.ventas.filter(function(ele: any){
        return ele.ven_numeroComprobante == refCompro;
      });
      
      if(ventaFilter.length == 0){
        if(this.skillsForm.valid){
          
          this.numComprobante = Number(this.venta.ven_numeroComprobante);
          this.venta.id_venta =  this.numComprobante;
          this.venta.fk_id_usuario = this.usuario.uid;
          const arrayProductos = this.skillsForm.value.skills;

          this.ventasService.saveVenta(this.venta).subscribe(resp =>{
            if( resp === true && this.formDatosVentas.valid ) {
      
              for(let i=0; i<arrayProductos.length; i++){
            
                this.detalleVenta.id_detalleVenta = 0;
                this.detalleVenta.detv_cantidad= Number(arrayProductos[i].num1);
                this.detalleVenta.detv_precioVenta=Number(arrayProductos[i].num2);
                this.detalleVenta.detv_subTotal=Number(arrayProductos[i].subTotal);
                this.detalleVenta.detv_total=Number(arrayProductos[i].total);
                this.detalleVenta.fk_id_producto = Number(arrayProductos[i].producto);
                console.log('numcomprobante', this.numComprobante);
                
                this.detalleVenta.fk_id_venta = Number(this.numComprobante);
                this.id = Number(this.detalleVenta.fk_id_producto)
                
                const productoIndi =  this.getProductoIndividual(this.producto,  this.id);
                const cantidadIngresada = Number(arrayProductos[i].num1);
                productoIndi[0].prod_stock = productoIndi[0].prod_stock - cantidadIngresada;
                this.actualizaProducto(this.id, productoIndi[0],this.detalleVenta);
    
                this.detallVentaService.saveDetalleVenta(this.detalleVenta)
                .subscribe(
                  ok=>{
                    if (ok== true) {
                      Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Venta Registrada Exitosamente!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      this.skillsForm.reset();
                      this.router.navigateByUrl('/dashboard/listaVentas');
                      
    
                    }
                    else{
                      this.formDatosVentas.markAllAsTouched();
                      Swal.fire('Error', ok, 'error');
                      
                    }
                  });
    
    
              }
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Venta Registrada Exitosamente!',
              });
      
            }else{
              this.formDatosVentas.markAllAsTouched();
              Swal.fire('Error', resp, 'error');
              
            }
            
          });



        }
        else{
          Swal.fire('Error', "Complete los datos de los productos", 'error');
        }
      }
      else{
        Swal.fire('Alerta', 'Ya existe un numero de comprobante ' + this.venta.ven_numeroComprobante + "\n Ingrese uno diferente", 'warning');
        
      }
      }
      else{
        this.formDatosVentas.markAllAsTouched();
        Swal.fire('Error', 'Por favor agregue el cantidad de cambio', 'error');
      }
      
        
      
    }
    else{
      this.formDatosVentas.markAllAsTouched();
      Swal.fire('Error', 'Por favor complete los campos obligatorios', 'error');
    }

    
  }

  onKeyupCambio(event: any){

    if(event.key != "."){
      this.info = this.skillsForm.value;
      for(let i=0; i<this.skillsForm.value.skills.length; i++){

          if(this.skillsForm.value.skills[i].producto !=""){
            this.skillsForm.value.skills[i].num2 = ((Number(this.skillsForm.value.skills[i].precioOriginal)/Number(this.venta.ven_tipoCambio)).toFixed(2)).toString();
          }
           this.skillsForm.controls.skills.value[i].subTotal  = ((this.skillsForm.controls.skills.value[i].num1 *  this.skillsForm.controls.skills.value[i].num2)/1.18).toFixed(2);
          this.skillsForm.controls.skills.value[i].total = (this.skillsForm.controls.skills.value[i].num1 *  this.skillsForm.controls.skills.value[i].num2).toFixed(2);
        
      }

      this.info = this.skillsForm.value;
        const linesFormArray = this.skillsForm.get("skills") as FormArray;
        this.info.skills.forEach((a: { skills: any[]; },index: number) => {
          linesFormArray.at(index).setValue(a);
        });
        this.getTotal();

    }

    
  }

  

  
}
