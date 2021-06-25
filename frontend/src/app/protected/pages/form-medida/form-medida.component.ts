import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Medida } from '../../interfaces/Medida';
import { UnidadMedidaService } from '../../services/unidad-medida.service';

@Component({
  selector: 'app-form-medida',
  templateUrl: './form-medida.component.html',
  styleUrls: ['./form-medida.component.css']
})
export class FormMedidaComponent implements OnInit {


  @Input() isVisibleMedida: any;
  @Input() idMedida: any;
  @Output() newVisibleMedida : EventEmitter<boolean>  = new EventEmitter<boolean>();

  formMedida!: FormGroup;
  inputValue?: string;
  edit: boolean = false;
  switchValue = false;
  checked = true;
  medida: Medida = {
    id_medida: 0,
    med_unidad: ''
  };
  toppings: FormGroup;

  constructor(fb: FormBuilder, private formBuilder : FormBuilder,private medidaService: UnidadMedidaService, private router: Router, private activatedRoute: ActivatedRoute) { 

    this.buildForm();

    this.toppings = fb.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false
    });
  }

  handleCancelMedida(): void {
    console.log('Button cancel clicked!');
    this.isVisibleMedida = false;
    this.newVisibleMedida.emit(this.isVisibleMedida);
  }


  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.edit = false
    if(this.idMedida != ""){
      this.edit = true;
      this.medidaService.getMedida(this.idMedida)
      .subscribe(
        res => {
          console.log(res);
          this.medida = res;
        },
        err => console.log(err)
      )
    }
    else{
      this.medida.med_unidad = "";
      this.medida.id_medida = 0;
    }
  }

  
  private buildForm() {
    this.formMedida = this.formBuilder.group({
      nombreMedida: ['', [Validators.required]],
      descripcionMedida: ['', []],
    });


    this.formMedida.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      console.log(value);
    });
  }

  saveNewMedida(){
      this.medidaService.saveMedida(this.medida)
      .subscribe(
        ok=>{
          if (ok==true && this.formMedida.valid) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se guardo con Exito',
              showConfirmButton: false,
              timer: 1500
            })
            this.formMedida.reset();
            this.isVisibleMedida = false;
            this.newVisibleMedida.emit(this.isVisibleMedida);
          }
          else{
            this.formMedida.markAllAsTouched();
            Swal.fire('Error', ok, 'error');
            console.log(ok);
          }
        });
    
  }

  updateMedida(){

    this.medidaService.updateMedida(this.idMedida, this.medida)
      .subscribe(
        ok => {
          if (this.formMedida.valid) {
            console.log(this.medida);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se Actualizo con Exito',
              showConfirmButton: false,
              timer: 1500
            })
            this.formMedida.reset();
            this.isVisibleMedida = false;
            this.newVisibleMedida.emit(this.isVisibleMedida);
          }
          else{
            this.formMedida.markAllAsTouched();
            Swal.fire('Error', ok, 'error');
            console.log(ok);
          }
         
        });
    }

    campoEsValido(campo: string){
      return this.formMedida.controls[campo].errors && this.formMedida.controls[campo].touched;
    }

}
