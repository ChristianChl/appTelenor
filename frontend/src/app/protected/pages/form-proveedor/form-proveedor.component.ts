import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Persona } from '../../interfaces/Persona';
import { PersonaService } from '../../services/persona.service';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { TipoPersonaService } from '../../services/tipo-persona.service';

@Component({
  selector: 'app-form-proveedor',
  templateUrl: './form-proveedor.component.html',
  styleUrls: ['./form-proveedor.component.css']
})
export class FormProveedorComponent implements OnInit {

  @Input() isVisibleProveedor: any;
  @Input() idProveedor: any;
  @Output() newVisibleProveedor : EventEmitter<boolean>  = new EventEmitter<boolean>();

  edit: boolean = false;

  proveedor: Persona = {
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

  formProveedor = new FormGroup({
    tipoDocProveedor: new FormControl(),
    numDocProveedor : new FormControl(),
    razonSocialProveedor : new FormControl(),
    direccionProveedor : new FormControl(),
    celularProveedor : new FormControl(),
    activoProveedor : new FormControl(),
    telefonoFijoProveedor : new FormControl(),
    correoProveedor : new FormControl()
  });

  private buildForm() {
    this.formProveedor = this.formBuilder.group({
      tipoDocProveedor: ['' , [Validators.required]],
      numDocProveedor: ['' , [Validators.required]],
      razonSocialProveedor: ['' , [Validators.required]],
      direccionProveedor: ['' , [Validators.required]],
      celularProveedor: ['' , [Validators.required]],
      activoProveedor: ['', []],
      telefonoFijoProveedor : ['', []],
      correoProveedor : ['', [Validators.required, Validators.email]]
      
    });

    this.formProveedor.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
    });
  }

  ngOnInit(): void {

    this.edit = false;
    this.proveedor.per_activo = "true";
    if(this.idProveedor != ""){

      this.personaService.getPersona(this.idProveedor)
      .subscribe(
        res => {
          this.proveedor = res;
          this.edit = true;
        },
        err => console.log(err)
      )
    }
    else{
    
      
      this.proveedor.id_Persona = 0;
      this.proveedor.per_razonSocial = "";
      this.proveedor.per_numeroDocumento = "";
      this.proveedor.per_direccion = "";
      this.proveedor.per_telefonoFijo = "";
      this.proveedor.per_email = "";
      this.proveedor.per_celular = "";
      this.proveedor.fk_id_tipoDocumento = "",
      
      
      this.proveedor.per_activo = "true";
      
      
    }
      

    this.getTipoPersona();
    this.getTipoDocumento();
  }

  validarCampo(campo : string){
    return this.formProveedor.controls[campo].errors && this.formProveedor.controls[campo].touched 
          ; 
  }

  saveNewProveedor(){

      this.proveedor.id_Persona = 0;
      this.proveedor.fk_id_tipoPersona = this.idTipoPersona;
      const value = this.formProveedor.value;
      
      this.personaService.savePersona(this.proveedor)
      .subscribe(ok => {
        if(ok == true && this.formProveedor.valid){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se guardo con Exito',
              showConfirmButton: false,
              timer: 1500
            });
            this.formProveedor.reset();
            this.ngOnInit();
            this.isVisibleProveedor = false;
            this.newVisibleProveedor.emit(this.isVisibleProveedor);
        
        }
        else{
          this.formProveedor.markAllAsTouched();
          Swal.fire('Error', ok, 'error');
        }

          });
    

  }

  updateProveedor(){
    this.personaService.updatePersona(this.idProveedor, this.proveedor)
      .subscribe(
        ok => {
          if(ok == true && this.formProveedor.valid){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se Edito   con Exito',
              showConfirmButton: false,
              timer: 1500
            });
            this.formProveedor.reset();
            this.ngOnInit();
            this.isVisibleProveedor = false;
            this.newVisibleProveedor.emit(this.isVisibleProveedor);
          }
          else{
            this.formProveedor.markAllAsTouched();
            Swal.fire('Error', ok, 'error');
          }
        },
        err => console.log(err)
      )
  }

  handleCancelProveedor(){
    this.isVisibleProveedor = false;
    this.newVisibleProveedor.emit(this.isVisibleProveedor);
    this.formProveedor.reset();
    
  }

  tipoPersona:any = [];
  idTipoPersona:any = "";
  getTipoPersona(){
    this.tipoPersonaService.getTipoPersonas().subscribe(
      res=>{
        this.tipoPersona = res;
        this.tipoPersona = this.tipoPersona.tipoPersona;
        this.tipoPersona = this.tipoPersona.filter(function(ele: any){

          return ele.tipoper_descripcion == 'Proveedor';

        });

        this.idTipoPersona = this.tipoPersona[0].id_tipoPersona;
        
      }
    )
  }

  tipoDocumento:any = [];
  idTipoDocumento:any = "";
  getTipoDocumento(){
    this.tipoDocumentoService.getDocumentos().subscribe(
      res=>{
        this.tipoDocumento = res;
        
        this.tipoDocumento = this.tipoDocumento.tiposDocumentos;
      }
    )
  }

}
