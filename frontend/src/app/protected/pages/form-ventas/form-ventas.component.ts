import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-ventas',
  templateUrl: './form-ventas.component.html',
  styleUrls: ['./form-ventas.component.css']
})
export class FormVentasComponent implements OnInit {

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
    ordenCompra: new FormControl()
    
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
    private router: Router
    ) {
      this.skillsForm = this.fb.group({
        skills: this.fb.array([]) ,
      });
      
      this.buildForm();
     }
  
     maxDate:any = "";
     filterVentas:any = []
    ngOnInit(): void {
    this.getCliente();
    this.getMoneda();
    this.getProductos();
    this.addSkills();
    this.getVentas();

    this.maxDate = new Date();
     
    this.formDatosVentas.controls.tipoDocIngreso.valueChanges.subscribe(changes => {
        console.log("Entro al change");
        this.Opciones(changes);

        this.venta.ven_numeroComprobante = this.siguienteVenta.toString();
    });
    
    
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
  totalFinal = 0;
  subTotal = 0;
  ventas:any = [];
  getVentas(){
    this.ventasService.getVentas().subscribe(
      res => {
        this.ventas = res;
        this.ventas = this.ventas.venta;

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
    console.log(indice)

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
        console.log(this.totalFinal);
        this.venta.ven_total = (this.totalFinal.toFixed(2)).toString();
   });
  }

  filterProducto:any = [];
  refenciaProducto:any = 0;
  stockPro = false;
  onKeyUpProducto(indice:any){

    
    console.log("Pruebaaa ");
    
    console.log(indice);
    
    this.filterProducto = [];
    console.log("Pruebaaa ");
    const idProducto = this.skillsForm.controls.skills.value[indice].producto;
    
    this.filterProducto = this.producto.filter(function(ele: any){
      return ele.id_Producto == idProducto;
    });
    
    if(this.filterProducto[0].prod_stock == 0){
      Swal.fire({
        icon: 'warning',
        title: 'Alerta',
        text: 'No hay stock para el producto seleccionado',
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
        console.log(this.filterProducto);
        this.stockPro = false;
        this.skillsForm.controls.skills.value[indice].num1 = 1;
        this.skillsForm.controls.skills.value[indice].num2 = this.filterProducto[0].prod_precioVenta

        this.info = this.skillsForm.value;
        const linesFormArray = this.skillsForm.get("skills") as FormArray;
        this.info.skills.forEach((a: { skills: any[]; },index: number) => {
          
          linesFormArray.at(index).setValue(a);
          
        });
        
        this.onKeyUp(indice);
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

        console.log(this.producto);
        console.log("this.producto.producto");
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
      console.log(value);
    });
  }
  onSubmit() {
    console.log(this.skillsForm.value);
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
  ///

  validarCampo(campo : string){
    return this.formDatosVentas.controls[campo].errors && this.formDatosVentas.controls[campo].touched 
          ; 
  }

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

  submitForm(): void {
    for (const i in this.formDatosVentas.controls) {
      this.formDatosVentas.controls[i].markAsDirty();
      this.formDatosVentas.controls[i].updateValueAndValidity();
    }
  }
  //Obtener datos del usario 
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

  //
  numComprobante: number | undefined;
  id = 0;
  guardarDatos(){

    
    console.log(this.venta)
     
    if(this.formDatosVentas.valid){

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
      Swal.fire('Error', 'Por favor complete los campos obligatorios', 'error');
    }

    
  }


  
}
