import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { Cotizacion } from '../../interfaces/Cotizacion';
import { DetalleVenta } from '../../interfaces/DetalleVenta';
import { Venta } from '../../interfaces/Venta';
import { DetallVentaService } from '../../services/detall-venta.service';
import { DetalleCotizacionService } from '../../services/detalle-cotizacion.service';
import { MonedasService } from '../../services/monedas.service';
import { PersonaService } from '../../services/persona.service';
import { ProductoService } from '../../services/producto.service';
import { VentasService } from '../../services/ventas.service';
import { CotizacionService } from '../../services/cotizacion.service';

@Component({
  selector: 'app-venta-cotizacion',
  templateUrl: './venta-cotizacion.component.html',
  styleUrls: ['./venta-cotizacion.component.css']
})
export class VentaCotizacionComponent implements OnInit {

  @Input() isVisibleCotizacionVenta: any;
  @Input() idCotizacionVenta: any;
  @Output() newVisibleCotizacionVenta : EventEmitter<boolean>  = new EventEmitter<boolean>();

  skillsForm: FormGroup;
  monedas: any = [];
  persona:any = [];
  ventas:any = [];
  detalleCotizacion:any = [];
  producto:any = [];
  detalleCotiFilter:any = [];
  productoFilter:any = [];

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

  detalleVenta : DetalleVenta = {
    id_detalleVenta: 0,
    detv_cantidad: 0,
    detv_precioVenta: 0,
    detv_subTotal: 0,
    detv_total: 0,
    fk_id_producto: 0,
    fk_id_venta: 0
  }

  cotizacion: Cotizacion = {
    id_cotizacion: 0,
    coti_fechaHora: '',
    coti_observacion: '',
    coti_total: '',
    coti_tipoCambio:'',
    coti_hechoVenta: true,
    fk_id_moneda: '',
    fk_id_persona:'',
    fk_id_usuario:''
  };

  constructor(private fb:FormBuilder,
    private monedasService:MonedasService,
    private personaService:PersonaService,
    private detalleCotizacionService:DetalleCotizacionService,
    private productoService:ProductoService,
    private ventasService:VentasService,
    private authService:AuthService,
    private detallVentaService:DetallVentaService,
    private cotizacionService:CotizacionService,
    private router: Router) { 

    this.skillsForm = this.fb.group({
      skills: this.fb.array([]) ,
    });
  }
  romover = false;
  ngOnInit(): void {
    if(this.idCotizacionVenta != ""){
      this.getMoneda();
      this.getCliente();
      this.getProductos();
      this.getVentas();
      this.getCotizacion();

      this.venta.ven_fechaHora ="";
      this.venta.ven_tipoComprobante = "";
      this.venta.ven_serieComprobante ="";
      this.venta.ven_numeroComprobante ="";

      this.formDatosVentas.markAsUntouched();
      
      this.formDatosVentas.clearAsyncValidators();
      this.formDatosVentas.clearValidators();
      
      this.formDatosVentas.controls["tipoDocIngreso"].reset();

      
      
      this.formDatosVentas.controls.tipoDocIngreso.valueChanges.subscribe(changes => {
        console.log("Entro al change");
        this.Opciones(changes);

        this.venta.ven_numeroComprobante = this.siguienteVenta.toString();
      });
      
      this.gravada = 0;
      this.igvtotal = 0;
      let cantidadSkills = this.skillsForm.controls.skills.value.length;
      cantidadSkills = cantidadSkills -1;

      for(let i = cantidadSkills; i>=0  ; i--){
        this.skills.removeAt(i);
      }

      this.detalleCotizacionService.getDetalleCotizacions().subscribe(
        res =>{
              
          this.detalleCotizacion = res;
          this.detalleCotizacion = this.detalleCotizacion.detalleCotizacion;

              
          let idCotizacionFilter = this.idCotizacionVenta;

          this.detalleCotiFilter = this.detalleCotizacion.filter(function(ele: any){
            return ele.fk_id_cotizacion == idCotizacionFilter;
          });

          console.log(this.detalleCotiFilter);
          for(let i=0 ; i<this.detalleCotiFilter.length; i++){
            this.addSkills();
            this.romover = false;
            let idProducto = this.detalleCotiFilter[i].fk_id_producto;
            this.skillsForm.controls.skills.value[i].producto = this.detalleCotiFilter[i].fk_id_producto;
            this.skillsForm.controls.skills.value[i].num1 = this.detalleCotiFilter[i].decoti_cantidad;
            this.skillsForm.controls.skills.value[i].num2 = this.detalleCotiFilter[i].decoti_precioVenta;
            this.skillsForm.controls.skills.value[i].precioOriginal = this.detalleCotiFilter[i].Productos.prod_precioVenta;
            this.skillsForm.controls.skills.value[i].subTotal = ((this.skillsForm.controls.skills.value[i].num1 *  this.skillsForm.controls.skills.value[i].num2)/1.18).toFixed(2);
            this.skillsForm.controls.skills.value[i].total = this.detalleCotiFilter[i].decoti_total;
            
            this.productoFilter = this.producto.filter(function(ele: any){
              return ele.id_Producto == idProducto;
            });
            
            if(this.productoFilter.length > 0){
              if(this.productoFilter[0].prod_stock == 0){
                this.romover = true;
                //this.removeSkill(i)
                this.skillsForm.controls.skills.value[i].num1 = 0;
                
                Swal.fire('Alerta',"No se cuenta con stock para el producto - " + this.productoFilter[0].prod_modelo, 'warning');
              }
              else{
                if(this.detalleCotiFilter[i].decoti_cantidad > this.productoFilter[0].prod_stock){
                  this.skillsForm.controls.skills.value[i].num1 = this.productoFilter[0].prod_stock;
                  Swal.fire('Alerta',"No se cuenta con suficiente stock para el producto " + this.productoFilter[0].prod_modelo, 'warning');
                  
                  this.skillsForm.controls.skills.value[i].subTotal = ((this.skillsForm.controls.skills.value[i].num1 *  this.skillsForm.controls.skills.value[i].num2)/1.18).toFixed(2);
                  
                  this.skillsForm.controls.skills.value[i].total = (this.skillsForm.controls.skills.value[i].num1 *  this.skillsForm.controls.skills.value[i].num2).toFixed(2);
                }
              }
              
              
            }
          }


          if(this.skillsForm.controls.skills.value.length > 0){
            this.venta.fk_id_persona = this.detalleCotiFilter[0].Cotizacions.fk_id_persona; 
            this.venta.fk_id_moneda = this.detalleCotiFilter[0].Cotizacions.fk_id_moneda; 
            this.venta.ven_total = this.detalleCotiFilter[0].Cotizacions.coti_total; 
            this.venta.ven_tipoCambio = this.detalleCotiFilter[0].Cotizacions.coti_tipoCambio;
          }
          
          let cantidadSkills = this.skillsForm.controls.skills.value.length;
          cantidadSkills = cantidadSkills -1;

          for(let i = cantidadSkills; i>=0  ; i--){
            if(this.skillsForm.controls.skills.value[i].num1 == 0){
              this.skills.removeAt(i);
            }
            
          }

          /*
          this.venta.ven_gravada = (this.gravada).toString(); 
          this.venta.ven_igv = ((this.igvtotal).toFixed(2)).toString(); */

         
              this.info = this.skillsForm.value;
              const linesFormArray = this.skillsForm.get("skills") as FormArray;
              this.info.skills.forEach((a: { skills: any[]; },index: number) => {

                console.log(linesFormArray.at(index).setValue(a));
                if(linesFormArray.value[index].num1 != 0){
                    linesFormArray.at(index).setValue(a);
                }
                
                
              });
              this.getTotal();

        },
        err => console.log(err)
      )


    }
    else{

    }
    
  }
  cotizacionIndividual:any = []
  getCotizacion(){
    this.cotizacionService.getCotizacion(this.idCotizacionVenta).subscribe(
      res => {
        this.cotizacion = res;
        console.log(this.cotizacion);

      },
      err => console.error(err)
    );
  }
  opc: any = "";
  Opciones(opc: string) {
    // console.log(opc);
    this.opc;
    if (opc == "1") {
      console.log("ID 1");
      this.venta.ven_serieComprobante = "F001";
    } else if (opc == "2") {
      console.log("ID 2");
      this.venta.ven_serieComprobante = "B001";
    } else if (opc == "3") {
      this.venta.ven_serieComprobante = "N001";
    } 
  }

  siguienteVenta = 0;
  numeroCorrecto:any = 'no';
  filterVentas:any = []
  getVentas(){
    this.ventasService.getVentas().subscribe(
      res => {
        this.ventas = res;
        this.ventas = this.ventas.venta;
        this.numeroCorrecto = 'no'
        console.log(this.ventas);
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

        console.log("this.producto.producto");
      },
      err => console.error(err)
    );
  }

  getProductos(){
    this.productoService.getProductos().subscribe(
      res => {
        this.producto = res;
        this.producto = this.producto.producto;
        
        this.producto = this.producto.filter(function(ele: any){
          return ele.prod_activo == true;
        });

        console.log(this.producto);
        console.log("this.producto.producto");
      },
      err => console.error(err)
    );
  }

  validarCampo(campo : string){
    return this.formDatosVentas.controls[campo].errors && this.formDatosVentas.controls[campo].touched 
          ; 
  }
  submitForm(): void {
    for (const i in this.formDatosVentas.controls) {
      this.formDatosVentas.controls[i].markAsDirty();
      this.formDatosVentas.controls[i].updateValueAndValidity();
    }
  }

  handleCancelCategoria(): void {
    console.log('Button cancel clicked!');
    this.formDatosVentas.reset();
    this.isVisibleCotizacionVenta = false;
    this.newVisibleCotizacionVenta.emit(this.isVisibleCotizacionVenta);
  }
  info: any;
  selectedDevice:any = "";
  onChangeTipoCambio(newValue:any) {
    console.log(newValue);
    this.selectedDevice = newValue;
    if(this.selectedDevice == 1){ 
        let input2 = document.getElementById("tipoCambio");
        input2?.setAttribute("disabled", "true");
        this.venta.ven_tipoCambio = 1;
        for(let i=0; i<this.skillsForm.value.skills.length; i++){

          if(this.info.skills[i].producto !=""){
            this.skillsForm.value.skills[i].num2 = ((Number(this.skillsForm.value.skills[i].precioOriginal)/Number(this.venta.ven_tipoCambio)).toFixed(2)).toString();
          }
          this.skillsForm.controls.skills.value[i].subTotal  = ((this.skillsForm.controls.skills.value[i].num1 *  this.skillsForm.controls.skills.value[i].num2)/1.18).toFixed(2);
          this.skillsForm.controls.skills.value[i].total = (this.skillsForm.controls.skills.value[i].num1 *  this.skillsForm.controls.skills.value[i].num2).toFixed(2);
        
        }
  
          console.log(this.info);
          this.info = this.skillsForm.value;
            const linesFormArray = this.skillsForm.get("skills") as FormArray;
            this.info.skills.forEach((a: { skills: any[]; },index: number) => {
              linesFormArray.at(index).setValue(a);
            });
          
            this.getTotal(); 
    }
    else{
      
      let input2 = document.getElementById("tipoCambio");
      input2?.removeAttribute("disabled");

    }
    // ... do other stuff here ...
  }
  igvtotal= 0;
  gravada = 0;
  totalFinal = 0;
  getTotal(){
    this.totalFinal = 0;
    this.gravada = 0;
    this.igvtotal = 0;

    if(this.info.skills.length != 0){
      const linesFormArray = this.skillsForm.get("skills") as FormArray;
        this.info.skills.forEach((a: { skills: any[]; },index: number) => {

            this.gravada = Number(this.info.skills[index].subTotal) + this.gravada;
            this.venta.ven_gravada = (this.gravada.toFixed(2)).toString();

            this.igvtotal = (Number(this.info.skills[index].total)-(Number(this.info.skills[index].total)/1.18))+ this.igvtotal
            this.venta.ven_igv = (this.igvtotal.toFixed(2)).toString();
          
            this.totalFinal = Number(this.info.skills[index].total) + this.totalFinal;
            console.log(this.totalFinal);
            this.venta.ven_total = (this.totalFinal.toFixed(2)).toString();
        });
    }
    else{
      this.venta.ven_gravada = "0";
      this.venta.ven_igv ="0";
      this.venta.ven_total="0";

    }
    
  }

  subTotal = 0;
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

  get usuario(){
    return this.authService.usuario;
    console.log(this.usuario);
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

  actualizaProducto(id:any, productoActualizar:any){
    this.productoService.updateProducto(id, productoActualizar)
    .subscribe(
      ok => {
        console.log("verifique stock catualizado");
      });

  }

  numComprobante: number | undefined;
  id = 0;
  handleOkCotizaVenta(){
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
      
              
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Venta Registrada Exitosamente!',
              });
              /*
              this.cotizacion.id_cotizacion = this.idCotizacionVenta;
              this.cotizacion.coti_fechaHora = '';
              this.cotizacion.coti_observacion = this.cotizacionIndividual[0].coti_observacion;
              this.cotizacion.coti_total = this.cotizacionIndividual[0].coti_total;
              this.cotizacion.coti_tipoCambio = this.cotizacionIndividual[0].coti_tipoCambio;
              
              this.cotizacion.fk_id_persona = this.cotizacionIndividual[0].fk_id_persona;
              this.cotizacion.fk_id_moneda = this.cotizacionIndividual[0].fk_id_moneda;
              this.cotizacion.fk_id_usuario = this.cotizacionIndividual[0].fk_id_usuario;*/

              this.cotizacion.coti_hechoVenta = true;
              
              
              this.cotizacionService.updateCotizacion(this.idCotizacionVenta,this.cotizacion)
              .subscribe(
                ok => {
                  console.log("Se actualizo la cotizacion");
              });
              


      
            }else{
              this.formDatosVentas.markAllAsTouched();
              Swal.fire('Error', resp, 'error');
              console.log(resp);
            }
            
          });


          for(let i=0; i<arrayProductos.length; i++){
            
            this.detalleVenta.id_detalleVenta = 0;
            this.detalleVenta.detv_cantidad= Number(arrayProductos[i].num1);
            this.detalleVenta.detv_precioVenta=Number(arrayProductos[i].num2);
            this.detalleVenta.detv_subTotal=Number(arrayProductos[i].subTotal);
            this.detalleVenta.detv_total=Number(arrayProductos[i].total);
            this.detalleVenta.fk_id_producto = Number(arrayProductos[i].producto);
            this.detalleVenta.fk_id_venta = Number(this.numComprobante.toString());
            this.id = Number(this.detalleVenta.fk_id_producto)
            
            const productoIndi =  this.getProductoIndividual(this.producto,  this.id);
            const cantidadIngresada = Number(arrayProductos[i].num1);
            productoIndi[0].prod_stock = productoIndi[0].prod_stock - cantidadIngresada;
            this.actualizaProducto(this.id, productoIndi[0]);

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
                  console.log("Exito");

                }
                else{
                  this.formDatosVentas.markAllAsTouched();
                  Swal.fire('Error', ok, 'error');
                  console.log(ok);
                }
              });


          }
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

  getMoneda(){
    this.monedasService.getMonedas().subscribe(
      res => {
        this.monedas = res;
        console.log(this.monedas);
        this.monedas = this.monedas.monedas;
        console.log("Monedas");
        console.log(this.monedas);
        //const personasFiltradas = this.persona.filter((x: { TipoPersonas: { tipoper_descripcion: string; }; }) => x.TipoPersonas.tipoper_descripcion == 'Proveedor');
        
        
      },
      err => console.error(err)
    );
  }

  onKeyupCambio(event: any){
    console.log(event.key);
    console.log(this.venta.ven_tipoCambio);

    if(event.key != "."){
      this.info = this.skillsForm.value;
      console.log(this.info);
      for(let i=0; i<this.skillsForm.value.skills.length; i++){

          if(this.skillsForm.value.skills[i].producto !=""){
            this.skillsForm.value.skills[i].num2 = ((Number(this.skillsForm.value.skills[i].precioOriginal)/Number(this.venta.ven_tipoCambio)).toFixed(2)).toString();
          }
           this.skillsForm.controls.skills.value[i].subTotal  = ((this.skillsForm.controls.skills.value[i].num1 *  this.skillsForm.controls.skills.value[i].num2)/1.18).toFixed(2);
          this.skillsForm.controls.skills.value[i].total = (this.skillsForm.controls.skills.value[i].num1 *  this.skillsForm.controls.skills.value[i].num2).toFixed(2);
        
      }

      console.log(this.info);
      this.info = this.skillsForm.value;
        const linesFormArray = this.skillsForm.get("skills") as FormArray;
        this.info.skills.forEach((a: { skills: any[]; },index: number) => {
          linesFormArray.at(index).setValue(a);
        });
        this.getTotal();
    }
  }

  handleCancelCotizaVenta(){
    console.log('Button cancel clicked!');
    this.isVisibleCotizacionVenta = false;
    this.newVisibleCotizacionVenta.emit(this.isVisibleCotizacionVenta);
  }

  //Abrir modal de Cliente 
  isVisibleCliente = false;
  openModalCliente(){
    this.idCliente = "";
    this.isVisibleCliente = true;
    
  }

  idCliente = "";
  modalEditCliente(id:string){

    console.log("Este es el id _-----" + id);
    this.isVisibleCliente = true;
    this.idCliente = id;
  }

  nuevoDatoCliente(){
    this.ngOnInit();
    this.isVisibleCliente = false;
  }

  //Obtener los Clientes
  getCliente(){
    this.personaService.getPersonas().subscribe(
      res => {
        this.persona = res;
        console.log(this.persona);
        this.persona = this.persona.persona;
        console.log(this.persona);
        //const personasFiltradas = this.persona.filter((x: { TipoPersonas: { tipoper_descripcion: string; }; }) => x.TipoPersonas.tipoper_descripcion == 'Proveedor');
        
         this.persona = this.persona.filter(function(ele: any){

          return ele.TipoPersonas.tipoper_descripcion == 'Cliente';

        });
        

        console.log(this.persona);
      },
      err => console.error(err)
    );
  }

  onSubmit() {
    console.log(this.skillsForm.value);
  }
  filterProducto:any = [];
  onKeyUp(indice:any){
    

    const idProducto = this.skillsForm.controls.skills.value[indice].producto;

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
         
        // Sub-Total
        if(this.skillsForm.controls.skills.value[indice].igv == "" || this.skillsForm.controls.skills.value[indice].igv == "2"){
          this.skillsForm.controls.skills.value[indice].subTotal  = (this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2).toFixed(2);
          console.log(this.skillsForm.controls.skills.value[indice].subTotal);
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

}
