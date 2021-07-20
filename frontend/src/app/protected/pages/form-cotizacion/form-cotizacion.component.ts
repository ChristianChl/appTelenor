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
    tipoMoneda : new FormControl()
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
    console.log(this.siguienteCoti);
    if(this.idCotizacion != ""){
      
      let cantidadSkills = this.skillsForm.controls.skills.value.length;
      cantidadSkills = cantidadSkills -1;

      for(let i = cantidadSkills; i>=0  ; i--){
        this.skills.removeAt(i);
      }

      this.cotizacionService.getCotizacion(this.idCotizacion)
      .subscribe(
        res => {
          
          console.log(res);
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

              console.log(this.detalleCotiFilter);
              for(let i=0 ; i<this.detalleCotiFilter.length; i++){
                this.addSkills();
                this.skillsForm.controls.skills.value[i].id =   this.detalleCotiFilter[i].id_detalleCotizacion;
                this.skillsForm.controls.skills.value[i].num1 = this.detalleCotiFilter[i].decoti_cantidad;
                this.skillsForm.controls.skills.value[i].num2 = this.detalleCotiFilter[i].decoti_precioVenta;
                this.skillsForm.controls.skills.value[i].producto = this.detalleCotiFilter[i].fk_id_producto;
                this.skillsForm.controls.skills.value[i].total = this.detalleCotiFilter[i].decoti_total;
                
              }
              console.log(this.skillsForm.controls.skills );
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
        console.log(this.skillsForm.controls.skills)
        
        
        this.cotizacion.fk_id_moneda =  '';
        this.cotizacion.fk_id_persona='';
        this.cotizacion.fk_id_usuario='';
        this.cotizacion.coti_total = '';
        this.cotizacion.coti_observacion = '';
        console.log(this.skills.value)
        /*
        for(let i = 0; i<this.skillsForm.controls.skills.value.length  ; i++){
          this.skills.removeAt(i);
        }*/
        this.limpiarArray();

        if(this.isVisibleCotizacion ===  true){
          this.addSkills();
        }

        console.log("prueba de oninit");
        this.edit = false;
        
      
    }
  }

  get usuario(){
    return this.authService.usuario;
    console.log(this.usuario);
  }

  handleCancelCotizacion(): void {
    console.log('Button cancel clicked!');
    this.isVisibleCotizacion = false;
    this.newVisibleCotizacion.emit(this.isVisibleCotizacion);
  }

  

  
  private buildForm() {
    this.formCotizacion = this.formBuilder.group({
      selecCliente: ['', [Validators.required]],
      tipoMoneda: ['',[Validators.required]]
    });

  }

  saveNewCotizacion(){

    if(this.formCotizacion.valid){
      if(this.skillsForm.controls.skills.value.length != 0){
        if(this.skillsForm.valid){

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

              this.formCotizacion.reset();
      
            }else{
              this.formCotizacion.markAllAsTouched();
              Swal.fire('Error', resp, 'error');
              console.log(resp);
            }
            
          });
          
          for(let i=0; i<arrayProductos.length; i++){

            this.detalleCotizacion.decoti_cantidad= Number(arrayProductos[i].num1);
            this.detalleCotizacion.decoti_precioVenta= Number(arrayProductos[i].num2);
            this.detalleCotizacion.decoti_total= Number(arrayProductos[i].total);
            this.detalleCotizacion.fk_id_cotizacion= this.siguienteCoti;
            this.detalleCotizacion.fk_id_producto= Number(arrayProductos[i].producto);
            
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
                  console.log("Exito");

                }
                else{
                  this.formCotizacion.markAllAsTouched();
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
        Swal.fire('Error', "Debe Agregar al menos un Producto", 'error');
      }
    }
    else{
      this.formCotizacion.markAllAsTouched();
      Swal.fire('Error', 'Por favor complete los campos obligatorios', 'error');
    }
    /*
    console.log("nuevo");
    
      const value = this.formCotizacion.value;
      console.log(value);
        this.cotizacionService.saveCotizacion(this.cotizacion)
      .subscribe(
        ok=>{
          
        });*/
    
  }

  updateCotizacion(){
    
    if(this.formCotizacion.valid){
      console.log("prueba editar");
      if(this.skillsForm.controls.skills.value.length != 0){
        if(this.skillsForm.valid){
          this.cotizacionService.updateCotizacion(this.idCotizacion, this.cotizacion)
        .subscribe(
          ok => {
            console.log("dfdf");
            
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
            console.log(this.detalleCotiFilter); 
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
                  
  
                    console.log("Se actualizo con exito el producto" + this.detalleCotizacion.id_detalleCotizacion + " ")
                 
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
                  
                    console.log("Se guardo  con exito el nuevo producto" + this.detalleCotizacion.id_detalleCotizacion + " ")
                  
                  
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
    console.log("validar");
    return this.formCotizacion.controls[campo].errors && this.formCotizacion.controls[campo].touched; 
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

  addSkills() {

    this.skills.push(this.newSkill());
  }

  newSkill(): FormGroup {
    return this.fb.group({
      id:'',
      producto: '',
      num1: '',
      num2: '',
      total: ''
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

    console.log("Prueba eliminar");
    this.getTotalEliminado(i);

    
  }

  
  onSubmit() {
    console.log(this.skillsForm.value);
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

  filterProducto:any = [];
  refenciaProducto:any = 0;
  stockPro = false;
  info: any;
  onKeyUpProducto(indice:any){

    
    console.log("Pruebaaa ");
    
    console.log(indice);
    
    this.filterProducto = [];
    console.log("Pruebaaa ");
    const idProducto = this.skillsForm.controls.skills.value[indice].producto;
    
    this.filterProducto = this.producto.filter(function(ele: any){
      return ele.id_Producto == idProducto;
    });

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

    
    
          
        //Total
        this.skillsForm.controls.skills.value[indice].total = (this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2).toFixed(2);
        
        
        this.info = this.skillsForm.value;
        const linesFormArray = this.skillsForm.get("skills") as FormArray;
        this.info.skills.forEach((a: { skills: any[]; },index: number) => {
          linesFormArray.at(index).setValue(a);
        });
        this.getTotal();
    

    
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
        console.log(this.totalFinal);
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
          console.log(this.totalFinal);
          this.cotizacion.coti_total = (this.totalFinal.toFixed(2)).toString();
        }
        
   });
  }
}
