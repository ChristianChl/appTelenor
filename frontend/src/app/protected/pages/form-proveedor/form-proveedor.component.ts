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
    id_persona: 0,
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
      activoProveedor: ['', [Validators.required]],
      telefonoFijoProveedor : ['', [Validators.required]],
      correoProveedor : ['', [Validators.required]]
      
    });

    this.formProveedor.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      console.log(value);
    });
  }

  ngOnInit(): void {

    this.edit = false;
    this.proveedor.per_activo = "true";
    if(this.idProveedor != ""){
      console.log("edit es true");

      this.personaService.getPersona(this.idProveedor)
      .subscribe(
        res => {
          console.log(res);
          this.proveedor = res;
          this.edit = true;
        },
        err => console.log(err)
      )
    }
    else{
      console.log("prueba de oninit");
      this.edit = false;
      
    }
      

    this.getTipoPersona();
    this.getTipoDocumento();
  }

  saveNewProveedor(){

    if(this.formProveedor.valid){
      console.log(this.idTipoPersona);
      this.proveedor.fk_id_tipoPersona = this.idTipoPersona;

      console.log("el id en guardar despues: " + this.proveedor.id_persona);
      const value = this.formProveedor.value;
      console.log("El value: ");
      console.log(value);
      console.log("El producto: ");
      console.log(this.proveedor);
      
      console.log("el id en guardar despues: " + this.proveedor.id_persona);
      this.personaService.savePersona(this.proveedor)
      .subscribe(ok => {
          console.log(ok)
            console.log("Entro a guardar");
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
        },
        err => console.log(err)
      )
    }
    else {
      console.log("error");
      this.formProveedor.markAllAsTouched();
    }

  }

  updateProveedor(){

  }

  handleCancelProveedor(){
    this.isVisibleProveedor = false;
    this.newVisibleProveedor.emit(this.isVisibleProveedor);
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
        this.tipoPersona = this.tipoPersona.filter(function(ele: any){

          return ele.tipoper_descripcion == 'Proveedor';

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
