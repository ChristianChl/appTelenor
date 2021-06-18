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

    console.log("nuevo");
    if (this.formMedida.valid) {
      const value = this.formMedida.value;
      console.log(value);
        this.medidaService.saveMedida(this.medida)
      .subscribe(
        res=>{
          console.log(res);
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
        },
        err => console.log(err)
      )
    } 
    else {
      console.log("error");
      this.formMedida.markAllAsTouched();
    }
  }

  updateMedida(){
    const params = this.activatedRoute.snapshot.params;
    console.log(this.idMedida);
    this.medidaService.updateMedida(this.idMedida, this.medida)
      .subscribe(
        res => {
          console.log(res);
          console.log(this.medida);
          console.log(res);
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
        },
        err => console.log(err)
        )
    }

}
