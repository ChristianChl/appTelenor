import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { TipoProducto } from '../../interfaces/TipoProducto';
import { TipoProductoService } from '../../services/tipo-producto.service';

@Component({
  selector: 'app-form-tipo-producto',
  templateUrl: './form-tipo-producto.component.html',
  styleUrls: ['./form-tipo-producto.component.css']
})
export class FormTipoProductoComponent implements OnInit {

  @Input() isVisibleTipoProducto: any;
  @Input() idTipoProducto: any;
  @Output() newVisibleTipoProducto : EventEmitter<boolean>  = new EventEmitter<boolean>();

  formTipoProducto!: FormGroup;
  inputValue?: string;
  edit: boolean = false;
  switchValue = false;
  checked = true;
  tipoProducto: TipoProducto = {
    id_tipo: 0,
    tip_nombre: ''
  };
  toppings: FormGroup;

  constructor(fb: FormBuilder, private formBuilder : FormBuilder,private tipoProductoService: TipoProductoService, private router: Router, private activatedRoute: ActivatedRoute) { 

    this.buildForm();

    this.toppings = fb.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false
    });
  }

  handleCancelTipoProducto(): void {
    console.log('Button cancel clicked!');
    this.isVisibleTipoProducto = false;
    this.newVisibleTipoProducto.emit(this.isVisibleTipoProducto);
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;

    if(this.idTipoProducto != ""){
      
      this.tipoProductoService.getTipoProducto(this.idTipoProducto)
      .subscribe(
        res => {
          console.log(res);
          this.tipoProducto = res;
          this.edit = true;
        },
        err => console.log(err)
      )
    }
    else{
      this.edit = false;
      this.tipoProducto.tip_nombre = "";
      this.tipoProducto.id_tipo = 0;
    }
  }

  
  private buildForm() {
    this.formTipoProducto = this.formBuilder.group({
      nombreTipo: ['', [Validators.required]]
    });


    this.formTipoProducto.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
      console.log(value);
    });
  }

  saveNewTipoProducto(){

    console.log("nuevo");
    if (this.formTipoProducto.valid) {
      const value = this.formTipoProducto.value;
      console.log(value);
        this.tipoProductoService.saveTipoProducto(this.tipoProducto)
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
          this.formTipoProducto.reset();
          this.isVisibleTipoProducto= false;
          this.newVisibleTipoProducto.emit(this.isVisibleTipoProducto);

        },
        err => console.log(err)
      )
    } 
    else {
      console.log("error");
      this.formTipoProducto.markAllAsTouched();
    }
  }

  updateTipoProducto(){
    const params = this.activatedRoute.snapshot.params;
    this.tipoProductoService.updatedTipoProducto(this.idTipoProducto, this.tipoProducto)
      .subscribe(
        res => {
          console.log(res);
          console.log(this.tipoProducto);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se guardo con Exito',
            showConfirmButton: false,
            timer: 1500
          })
          this.formTipoProducto.reset();
          this.isVisibleTipoProducto= false;
          this.newVisibleTipoProducto.emit(this.isVisibleTipoProducto);
        },
        err => console.log(err)
      )
  }
}
