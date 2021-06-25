import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Persona } from '../../interfaces/Persona';
import { PersonaService } from '../../services/persona.service';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { TipoPersonaService } from '../../services/tipo-persona.service';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {

  @Input() isVisibleCliente: any;
  @Input() idCliente: any;
  @Output() newVisibleCliente : EventEmitter<boolean>  = new EventEmitter<boolean>();
  
  formProducto = new FormGroup({
    tipoDocCliente: new FormControl(),
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

  cliente: Persona = {
    id_Persona: 0,
    per_razonSocial: "",
    per_numeroDocumento: "",
    per_direccion: "",
    per_celular: "",
    per_telefonoFijo: "",
    per_email: "",
    per_activo:"",
    fk_id_tipoDocumento: "",
    fk_id_tipoPersona:  ""
  };

  constructor(
    private tipoPersonaService : TipoPersonaService,
    private tipoDocumentoService : TipoDocumentoService,
    private personaService : PersonaService,
    private formBuilder : FormBuilder
  ) { 
    this.buildForm();
  }

  formCliente = new FormGroup({
    tipoDocCliente: new FormControl(),
    numDocCliente : new FormControl(),
    razonSocialCliente : new FormControl(),
    direccionCliente : new FormControl(),
    celularCliente : new FormControl(),
    activoCliente : new FormControl(),
    telefonoFijoCliente : new FormControl(),
    correoCliente : new FormControl()
  });

  private buildForm() {
    this.formCliente = this.formBuilder.group({
      tipoDocCliente: ['' , [Validators.required]],
      numDocCliente: ['' , [Validators.required]],
      razonSocialCliente: ['' , [Validators.required]],
      direccionCliente: ['' , [Validators.required]],
      celularCliente: ['' , [Validators.required]],
      activoCliente: ['', []],
      telefonoFijoCliente : ['', []],
      correoCliente : ['', [Validators.required, Validators.email]]
      
    });

    this.formCliente.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      console.log(value);
    });
  }

  ngOnInit(): void {

    this.edit = false;
    this.cliente.per_activo = "true";
    if(this.idCliente != ""){
      console.log("edit es true");

      this.personaService.getPersona(this.idCliente)
      .subscribe(
        res => {
          console.log(res);
          this.cliente = res;
          this.edit = true;
        },
        err => console.log(err)
      )
    }
    else{
    
      
      this.cliente.id_Persona = 0;
      this.cliente.per_razonSocial = "";
      this.cliente.per_numeroDocumento = "";
      this.cliente.per_direccion = "";
      this.cliente.per_telefonoFijo = "";
      this.cliente.per_email = "";
      this.cliente.per_celular = "";
      this.cliente.fk_id_tipoDocumento = "",
      
      
      this.cliente.per_activo = "true";
      
      
    }
      

    this.getTipoPersona();
    this.getTipoDocumento();
  }

  validarCampo(campo : string){
    return this.formCliente.controls[campo].errors && this.formCliente.controls[campo].touched 
          ; 
  }

  saveNewCliente(){
    console.log("Entro a guardar");
    this.cliente.fk_id_tipoPersona  = this.idTipoPersona;
    this.cliente.id_Persona = 0;
    this.personaService.savePersona(this.cliente)
    .subscribe(ok => {
      if(ok == true && this.formCliente.valid){
        console.log(ok)
          console.log("Entro a guardar");
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se guardo con Exito',
            showConfirmButton: false,
            timer: 1500
          });
          this.formCliente.reset();
          this.ngOnInit();
          this.isVisibleCliente = false;
          this.newVisibleCliente.emit(this.isVisibleCliente);
      
      }
      else{
        this.formCliente.markAllAsTouched();
        Swal.fire('Error', ok, 'error');
        console.log(ok);
      }
    });
  }

  updateCliente(){
    console.log("Entro a editar");
    this.personaService.updatePersona(this.idCliente, this.cliente)
      .subscribe(
        ok => {
          if(ok == true && this.formCliente.valid){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se Edito   con Exito',
              showConfirmButton: false,
              timer: 1500
            });
            this.formCliente.reset();
            this.ngOnInit();
            this.isVisibleCliente = false;
            this.newVisibleCliente.emit(this.isVisibleCliente);
          }
          else{
            this.formCliente.markAllAsTouched();
            Swal.fire('Error', ok, 'error');
            console.log(ok);
          }
          
        })
  }

  handleCancelCliente(){
    this.isVisibleCliente = false;
    this.newVisibleCliente.emit(this.isVisibleCliente);
    this.formCliente.reset();
    
  }

  tipoPersona:any = [];
  idTipoPersona:any = "";
  getTipoPersona(){
    this.tipoPersonaService.getTipoPersonas().subscribe(
      res=>{
        this.tipoPersona = res;
        console.log(this.tipoPersona);
        this.tipoPersona = this.tipoPersona.tipoPersona;
        
        console.log(this.tipoPersona);
        console.log("....");
        this.tipoPersona = this.tipoPersona.filter(function(ele: any){

          return ele.tipoper_descripcion == 'Cliente';

        });

        console.log(this.tipoPersona);
        this.idTipoPersona = this.tipoPersona[0].id_tipoPersona;
        console.log(this.idTipoPersona);
        
      }
    )
  }

  tipoDocumento:any = [];
  idTipoDocumento:any = "";
  getTipoDocumento(){
    this.tipoDocumentoService.getDocumentos().subscribe(
      res=>{
        this.tipoDocumento = res;
        console.log(this.tipoDocumento);
        
        this.tipoDocumento = this.tipoDocumento.tiposDocumentos;
      }
    )
  }
}
