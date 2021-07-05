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


import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    ing_ordenCompra:"",
    fk_id_persona:"" ,
    fk_id_usuario: ""
  };

  detalleIngreso : DetalleIngreso = {
    id_detalleIngreso: 0,
    deti_cantidad: 0,
    deti_precioCompra: 0,
    deti_precioVenta: 0,
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

  constructor(
    private prductoService:ProductoService,
    private personaService: PersonaService, 
    private ingresoService: IngresoService,
    private detalleIngresoService:DetalleIngresoService,
    private authService: AuthService,
    private fb:FormBuilder,
    private router: Router,) {
 
    this.skillsForm = this.fb.group({
      skills: this.fb.array([]) ,
    });
    
    this.buildForm();
  }
  ngOnInit(): void {
    this.getProveedor();
    this.getProductos();
    this.addSkills();
  }
  
  getProductos(){
    this.prductoService.getProductos().subscribe(
      res => {
        this.producto = res;
        this.producto = this.producto.producto;
        
        console.log(this.producto);
        console.log("this.producto.producto");
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

  actualizaProducto(id:any, productoActualizar:any){
    this.prductoService.updateProducto(id, productoActualizar)
    .subscribe(
      ok => {
        console.log("verifique stock catualizado");
      });

  }

  numComprobante: number | undefined;
  id = 0;
  guardarDatos(){
    console.log("pureba de ingreso");
    
    const value = this.formDatosIngreso.value;
    const num = this.ingreso.ing_numeroComprobante;
    this.numComprobante = Number(this.ingreso.ing_numeroComprobante);
    this.ingreso.id_ingreso = Number(this.ingreso.ing_numeroComprobante);
    this.ingreso.fk_id_usuario = this.usuario.uid;
    
    console.log(this.skillsForm.value.skills);
    const arrayProductos = this.skillsForm.value.skills;

    if(this.formDatosIngreso.valid)
    {
      if(this.skillsForm.valid){

      this.ingresoService.saveIngreso(this.ingreso)
      .subscribe(
      ok=>{
        if (ok== true && this.formDatosIngreso.valid && this.skillsForm.valid) {
          
              console.log("Los datos del ingreso de guardaron correctamente");
              this.formDatosIngreso.reset();
        }
        else{
          this.formDatosIngreso.markAllAsTouched();
          Swal.fire('Error', ok, 'error');
          console.log(ok);
        }
      });
      
     

        for(let i=0; i<arrayProductos.length; i++){
          console.log("vuelta" +  i);
          console.log(arrayProductos[i]);
          
          this.detalleIngreso.id_detalleIngreso = 0;
          this.detalleIngreso.deti_cantidad= Number(arrayProductos[i].num1);
          this.detalleIngreso.deti_precioCompra=Number(arrayProductos[i].num2);
          this.detalleIngreso.deti_precioVenta = 0.00;
          this.detalleIngreso.fk_id_producto = Number(arrayProductos[i].producto);
          this.detalleIngreso.fk_id_ingreso = Number(this.numComprobante.toString());
          this.id = Number(this.detalleIngreso.fk_id_producto)
          //Obtener el producto

          console.log(this.producto);

          const productoIndi =  this.getProductoIndividual(this.producto,  this.id);

          const cantidadIngresada = Number(arrayProductos[i].num1);

          productoIndi[0].prod_stock = productoIndi[0].prod_stock + cantidadIngresada;
          

          this.actualizaProducto(this.id, productoIndi[0]);
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
      igv: '',
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
    console.log(this.skillsForm.value);
  }

  private buildForm() {


    this.formDatosIngreso.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      console.log(value);
    });

    this.skillsForm.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      console.log(value);
    });
  }

  
  
  totalFinal = 0;
  subTotal = 0;
  onKeyUp(indice:any){
    console.log(indice)

   
    this.skillsForm.controls.skills.value[indice].subTotal = (this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2);
    this.skillsForm.controls.skills.value[indice].total = (this.skillsForm.controls.skills.value[indice].num1 *  this.skillsForm.controls.skills.value[indice].num2);
    
    this.subTotal = this.skillsForm.controls.skills.value[indice].subTotal;

    console.log(this.skillsForm.value.skills);
    this.info = this.skillsForm.value;

    const linesFormArray = this.skillsForm.get("skills") as FormArray;
    this.info.skills.forEach((a: { skills: any[]; },index: number) => {
       
       linesFormArray.at(index).setValue(a);
       
    });
    
    this.getTotal();
  }

  getTotal(){
    this.totalFinal = 0;
    const linesFormArray = this.skillsForm.get("skills") as FormArray;
    this.info.skills.forEach((a: { skills: any[]; },index: number) => {
       
        this.totalFinal = this.info.skills[index].total + this.totalFinal;
        console.log(this.totalFinal);
        this.ingreso.ing_totalCompra = this.totalFinal.toString();
   });
  }

  // Primer cards 

  get usuario(){
    return this.authService.usuario;
    console.log(this.usuario);
  } 

  isVisibleProveedor = false;

  openModalProveedor(){
    this.idProveedor = "";
    this.isVisibleProveedor = true;
  }

  idProveedor = "";
  modalEditProveedor(id:string){

    console.log("Este es el id _-----" + id);
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
          return ele.TipoPersonas.tipoper_descripcion == 'Proveedor';
        });
        console.log(this.persona);
      },
      err => console.error(err)
    );
  }


}
