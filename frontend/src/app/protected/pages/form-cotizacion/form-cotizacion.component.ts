import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

import { Cotizacion } from '../../interfaces/Cotizacion';
import { DetalleCotizacion } from '../../interfaces/DetalleCotizacion';
import { CotizacionService } from '../../services/cotizacion.service';
import { MonedasService } from '../../services/monedas.service';
import { PersonaService } from '../../services/persona.service';
import { ProductoService } from '../../services/producto.service';
import { DetalleCotizacionService } from '../../services/detalle-cotizacion.service';

@Component({
  selector: 'app-form-cotizacion',
  templateUrl: './form-cotizacion.component.html',
  styleUrls: ['./form-cotizacion.component.css']
})
export class FormCotizacionComponent implements OnInit {
  
  @Input() isVisibleCotizacion: any;
  @Input() idCotizacion: any;
  @Input() siguienteCoti: any;
  @Output() newVisibleCotizacion : EventEmitter<boolean>  = new EventEmitter<boolean>(); 
  skillsForm: FormGroup;
  
  persona:any = [];
  monedas:any = [];
  producto:any = [];
  formCotizacion = new FormGroup({
    selecCliente: new FormControl(),
    tipoMoneda : new FormControl(),
    tipoCambio: new FormControl()
  });

  tipoDoc: any = [
    {text:"Seleccionar", value:""},
    {text:"Factura", value:"1"},
    {text:"Boleta", value:"2"},
    {text:"Nota de Venta", value:"3"},
  ];

  detalleCotizacion:DetalleCotizacion ={
    id_detalleCotizacion: 0,
    decoti_cantidad: 0,
    decoti_precioVenta: 0,
    decoti_total: 0,
    fk_id_producto: 0,
    fk_id_cotizacion: 0
  }

  inputValue?: string;
  edit: boolean = false;
  switchValue = false;
  checked = true;

  cotizacion: Cotizacion = {
    id_cotizacion: 0,
    coti_fechaHora: '',
    coti_observacion: '',
    coti_total: '',
    coti_tipoCambio:'',
    coti_hechoVenta: false,
    fk_id_moneda: '',
    fk_id_persona:'',
    fk_id_usuario:''
  };

  toppings: FormGroup;

  constructor(
  private formBuilder : FormBuilder,
  private cotizacionService: CotizacionService, 
  private router: Router, 
  private activatedRoute: ActivatedRoute,
  private authService:AuthService,
  private personaService:PersonaService,
  private monedasService:MonedasService,
  private fb:FormBuilder,
  private productoService:ProductoService,
  private detalleCotizacionService:DetalleCotizacionService) { 
    this.skillsForm = this.fb.group({
      skills: this.fb.array([]) ,
    });
    this.buildForm();

    this.toppings = fb.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false
    });
  }

  detalleCotizacionEdit:any = [];
  detalleCotiFilter:any=[];

  limpiarArray(){
    let cantidadSkills = this.skillsForm.controls.skills.value.length;
    cantidadSkills = cantidadSkills -1;

    for(let i = cantidadSkills; i>=0  ; i--){
      this.skills.removeAt(i);
    }
  }

  ngOnInit(): void {
    this.getCliente();
    this.getMoneda();
    
    this.getProductos();
    const params = this.activatedRoute.snapshot.params;
    if(this.idCotizacion != ""){
      
      let cantidadSkills = this.skillsForm.controls.skills.value.length;
      cantidadSkills = cantidadSkills -1;

      for(let i = cantidadSkills; i>=0  ; i--){
        this.skills.removeAt(i);
      }

      this.cotizacionService.getCotizacion(this.idCotizacion)
      .subscribe(
        res => {
          
          this.cotizacion = res;
          this.edit = true;

          this.detalleCotizacionService.getDetalleCotizacions().subscribe(
            res =>{
                  
              this.detalleCotizacionEdit = res;
              this.detalleCotizacionEdit = this.detalleCotizacionEdit.detalleCotizacion;
              let idCotizacionFilter = this.cotizacion.id_cotizacion;

              this.detalleCotiFilter = this.detalleCotizacionEdit.filter(function(ele: any){
                return ele.fk_id_cotizacion == idCotizacionFilter;
              });

              for(let i=0 ; i<this.detalleCotiFilter.length; i++){
                this.addSkills();
                this.skillsForm.controls.skills.value[i].id =   this.detalleCotiFilter[i].id_detalleCotizacion;
                this.skillsForm.controls.skills.value[i].num1 = this.detalleCotiFilter[i].decoti_cantidad;
                this.skillsForm.controls.skills.value[i].num2 = this.detalleCotiFilter[i].decoti_precioVenta;
                this.skillsForm.controls.skills.value[i].producto = this.detalleCotiFilter[i].fk_id_producto;
                this.skillsForm.controls.skills.value[i].total = this.detalleCotiFilter[i].decoti_total;
                
              }
              
              this.info = this.skillsForm.value;
              const linesFormArray = this.skillsForm.get("skills") as FormArray;
              this.info.skills.forEach((a: { skills: any[]; },index: number) => {
                
                linesFormArray.at(index).setValue(a);
                
              });
            },
            err => console.log(err)
          )

        },
        err => console.log(err)
      )

    }
    else
    {   
        this.cotizacion.fk_id_moneda =  '';
        this.cotizacion.fk_id_persona='';
        this.cotizacion.fk_id_usuario='';
        this.cotizacion.coti_total = '';
        this.cotizacion.coti_observacion = '';
        /*
        for(let i = 0; i<this.skillsForm.controls.skills.value.length  ; i++){
          this.skills.removeAt(i);
        }*/
        this.limpiarArray();

        if(this.isVisibleCotizacion ===  true){
          this.addSkills();
        }

        this.edit = false;
        
      
    }
  }

  selectedDevice:any = "";
  onChangeTipoCambio(newValue:any) {
    this.selectedDevice = newValue;
    if(this.selectedDevice == 1){ 
        let input2 = document.getElementById("tipoCambio");
        input2?.setAttribute("disabled", "true");
        this.cotizacion.coti_tipoCambio = "1";
        for(let i=0; i<this.skillsForm.value.skills.length; i++){
          this.info = this.skillsForm.value;
          if(this.info.skills[i].producto !=""){
            this.skillsForm.value.skills[i].num2 = ((Number(this.skillsForm.value.skills[i].precioOriginal)/Number(this.cotizacion.coti_tipoCambio)).toFixed(2)).toString();
          }
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
      if(this.idCotizacion == ""){
        this.cotizacion.coti_tipoCambio = "";
      }
      
      let input2 = document.getElementById("tipoCambio");
      input2?.removeAttribute("disabled");

    }
    // ... do other stuff here ...
  }

  onKeyupCambio(event: any){
    if(event.key != "."){
      this.info = this.skillsForm.value;
      for(let i=0; i<this.skillsForm.value.skills.length; i++){

          if(this.skillsForm.value.skills[i].producto !=""){
            this.skillsForm.value.skills[i].num2 = ((Number(this.skillsForm.value.skills[i].precioOriginal)/Number(this.cotizacion.coti_tipoCambio)).toFixed(2)).toString();
          }
           
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

  get usuario(){
    return this.authService.usuario;
  }

  handleCancelCotizacion(): void {
    this.isVisibleCotizacion = false;
    this.newVisibleCotizacion.emit(this.isVisibleCotizacion);
  }

  

  
  private buildForm() {
    this.formCotizacion = this.formBuilder.group({
      selecCliente: ['', [Validators.required]],
      tipoMoneda: ['',[Validators.required]],
      tipoCambio: ['',[Validators.required]],
      
    });

  }

  saveNewCotizacion(){

    if(this.formCotizacion.valid){
      if(this.skillsForm.controls.skills.value.length != 0){
        if(this.skillsForm.valid){
          console.log('cotizacion2', this.siguienteCoti);
          
          this.cotizacion.id_cotizacion = this.siguienteCoti;
          this.cotizacion.fk_id_usuario = this.usuario.uid;
          const arrayProductos = this.skillsForm.value.skills;

          this.cotizacionService.saveCotizacion(this.cotizacion).subscribe(resp =>{
            if( resp === true) {
      
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Venta Registrada Exitosamente!',
              });
              for(let i=0; i<arrayProductos.length; i++){

                this.detalleCotizacion.decoti_cantidad= Number(arrayProductos[i].num1);
                this.detalleCotizacion.decoti_precioVenta= Number(arrayProductos[i].num2);
                this.detalleCotizacion.decoti_total= Number(arrayProductos[i].total);
                this.detalleCotizacion.fk_id_cotizacion= this.siguienteCoti;
                this.detalleCotizacion.fk_id_producto= Number(arrayProductos[i].producto);
                console.log('detallecotizacion', this.detalleCotizacion);
                
                this.detalleCotizacionService.saveDetalleCotizacion(this.detalleCotizacion)
                .subscribe(
                  ok=>{
                    if (ok== true) {
                      Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Cotizacion realizada Exitosamente!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      this.skillsForm.reset();
                      //this.router.navigateByUrl('/dashboard/listaVentas');
                      this.handleCancelCotizacion();
    
                    }
                    else{
                      this.formCotizacion.markAllAsTouched();
                      Swal.fire('Error', ok, 'error');
                    }
                  });
              }

              this.formCotizacion.reset();
      
            }else{
              this.formCotizacion.markAllAsTouched();
              Swal.fire('Error', resp, 'error');
            }
            
          });
          
         
        }
        else{
          Swal.fire('Error', "Complete los datos de los productos", 'error');
        }
      }
      else{
        Swal.fire('Error', "Debe Agregar al menos un Producto", 'error');
      }
    }
    else{
      this.formCotizacion.markAllAsTouched();
      Swal.fire('Error', 'Por favor complete los campos obligatorios', 'error');
    }
  }

  updateCotizacion(){
    
    if(this.formCotizacion.valid){
      if(this.skillsForm.controls.skills.value.length != 0){
        if(this.skillsForm.valid){
          this.cotizacionService.updateCotizacion(this.idCotizacion, this.cotizacion)
        .subscribe(
          ok => {
            
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se guardo con Exito',
                showConfirmButton: false,
                timer: 1500
              });
              this.formCotizacion.reset();
              this.ngOnInit();
              this.isVisibleCotizacion = false;
              this.newVisibleCotizacion.emit(this.isVisibleCotizacion);
        });
  
  
            const arrayProductos = this.skillsForm.value.skills;
            for(let i=0; i<arrayProductos.length; i++){
              
              if(arrayProductos[i].id != ""){
  
                this.detalleCotizacion.id_detalleCotizacion= Number(arrayProductos[i].id);
                this.detalleCotizacion.decoti_cantidad= Number(arrayProductos[i].num1);
                this.detalleCotizacion.decoti_precioVenta= Number(arrayProductos[i].num2);
                this.detalleCotizacion.decoti_total= Number(arrayProductos[i].total);
                this.detalleCotizacion.fk_id_cotizacion= this.idCotizacion;
                this.detalleCotizacion.fk_id_producto= Number(arrayProductos[i].producto);
                
                this.detalleCotizacionService.updateDetalleCotizacion(this.detalleCotizacion.id_detalleCotizacion, this.detalleCotizacion)
                .subscribe(
                ok=>{

                });
  
              }
              else{
                this.detalleCotizacion.id_detalleCotizacion = 0;
                this.detalleCotizacion.decoti_cantidad= Number(arrayProductos[i].num1);
                this.detalleCotizacion.decoti_precioVenta= Number(arrayProductos[i].num2);
                this.detalleCotizacion.decoti_total= Number(arrayProductos[i].total);
                this.detalleCotizacion.fk_id_cotizacion= this.idCotizacion;
                this.detalleCotizacion.fk_id_producto= Number(arrayProductos[i].producto);
  
                this.detalleCotizacionService.saveDetalleCotizacion(this.detalleCotizacion)
                .subscribe(
                ok=>{
                  
                });
              }
            }
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se guardo con Exito',
              showConfirmButton: false,
              timer: 1500
            });
        }
        else{
          Swal.fire('Error', "Complete los datos de los productos", 'error');
        }
        
      }
      else{
        Swal.fire('Error', "Debe Agregar al menos un Producto", 'error');
      }
      


    }
    else{
      this.formCotizacion.markAllAsTouched();
      Swal.fire('Error', 'Por favor complete los campos obligatorios', 'error');
    }
    

  }

  validarCampo(campo : string){
    return this.formCotizacion.controls[campo].errors && this.formCotizacion.controls[campo].touched; 
  }

  

  getCliente(){
    this.personaService.getPersonas().subscribe(
      res => {
        this.persona = res;
        this.persona = this.persona.persona;
        //const personasFiltradas = this.persona.filter((x: { TipoPersonas: { tipoper_descripcion: string; }; }) => x.TipoPersonas.tipoper_descripcion == 'Proveedor');
        
         this.persona = this.persona.filter(function(ele: any){

          return ele.TipoPersonas.tipoper_descripcion == 'Cliente';

        });
      },
      err => console.error(err)
    );
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

  getMoneda(){
    this.monedasService.getMonedas().subscribe(
      res => {
        this.monedas = res;
        this.monedas = this.monedas.monedas;
        //const personasFiltradas = this.persona.filter((x: { TipoPersonas: { tipoper_descripcion: string; }; }) => x.TipoPersonas.tipoper_descripcion == 'Proveedor');
        
        
      },
      err => console.error(err)
    );
  }

  addSkills() {

    this.skills.push(this.newSkill());
  }

  newSkill(): FormGroup {
    return this.fb.group({
      id:'',
      producto: '',
      precioOriginal: '',
      num1: '',
      num2: '',
      total: '',
      continuaStockCero:''
    })
  }

  get skills() : FormArray {
    return this.skillsForm.get("skills") as FormArray
  }

  removeSkill(i:number) {

    if(this.skills.value[i].id != ""){
      
      this.detalleCotizacionService.deleteDetalleCotizacion(this.skills.value[i].id).subscribe(
        res=> {
          console.log(res)
        },
        err => console.log(err)
      );

  }

    this.skills.removeAt(i);
    this.getTotalEliminado(i);

    
  }

  
  onSubmit() {

  }

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

  filterProducto:any = [];
  refenciaProducto:any = 0;
  stockPro = false;
  info: any;
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
        });
  
        this.refenciaProducto = this.skillsForm.controls.skills.value[indice].producto;
        this.stockPro = true;
        this.skillsForm.controls.skills.value[indice].producto = 0;
  
        this.skillsForm.controls.skills.value[indice].num1 = 0;
        this.skillsForm.controls.skills.value[indice].num2 = 0;
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
          this.skillsForm.controls.skills.value[indice].num2 = this.filterProducto[0].prod_precioVenta
          this.skillsForm.controls.skills.value[indice].continuaStockCero = 0;
          this.skillsForm.controls.skills.value[indice].precioOriginal = this.filterProducto[0].prod_precioVenta;
  
          if(this.cotizacion.fk_id_moneda == "2"){
            this.skillsForm.controls.skills.value[indice].num2 = (this.filterProducto[0].prod_precioVenta / Number(this.cotizacion.coti_tipoCambio)).toFixed(2);
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
      
      this.skillsForm.controls.skills.value[indice].num1 = this.filterProducto[0].prod_stock;
      this.skillsForm.controls.skills.value[indice].total = (this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2).toFixed(2);
        
      this.info = this.skillsForm.value;

        const linesFormArray = this.skillsForm.get("skills") as FormArray;
        this.info.skills.forEach((a: { skills: any[]; },index: number) => {
          
          linesFormArray.at(index).setValue(a);
          
        });

        this.getTotal();
    }
    else{
      //Total
      this.skillsForm.controls.skills.value[indice].total = (this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2).toFixed(2);
        
        
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
  totalFinal = 0;
  getTotal(){
    this.totalFinal = 0;
    this.gravada = 0;
    this.igvtotal = 0;

    const linesFormArray = this.skillsForm.get("skills") as FormArray;
    this.info.skills.forEach((a: { skills: any[]; },index: number) => {

        this.totalFinal = Number(this.info.skills[index].total) + this.totalFinal;
        this.cotizacion.coti_total = (this.totalFinal.toFixed(2)).toString();
   });
  }

  getTotalEliminado(indice:any){
    this.totalFinal = 0;
    this.gravada = 0;
    this.igvtotal = 0;

    const linesFormArray = this.skillsForm.get("skills") as FormArray;
    this.info.skills.forEach((a: { skills: any[]; },index: number) => {

        if(index != indice){
          this.totalFinal = Number(this.info.skills[index].total) + this.totalFinal;
          this.cotizacion.coti_total = (this.totalFinal.toFixed(2)).toString();
        }
        
   });
  }
}
