import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Marca } from '../../interfaces/Marca';
import { MarcaService } from '../../services/marca.service';

@Component({
  selector: 'app-form-marca',
  templateUrl: './form-marca.component.html',
  styleUrls: ['./form-marca.component.css']
})
export class FormMarcaComponent implements OnInit {

  @Input() isVisibleMarca: any;
  @Input() idMarca: any;
  @Output() newVisibleMarca : EventEmitter<boolean>  = new EventEmitter<boolean>(); 
  

  formMarca = new FormGroup({
    nombreMarca: new FormControl(),
    descripcionMarca: new FormControl(),
    pepperoni : new FormControl() 
  });

  inputValue?: string;
  edit: boolean = false;
  switchValue = false;
  checked = true;
  marca: Marca = {
    id_marca: 0,
    mar_nombre: '',
    mar_descripcion: '',
    mar_activo: ''
  };
  toppings: FormGroup;

  constructor(fb: FormBuilder, private formBuilder : FormBuilder,private marcaService: MarcaService, private router: Router, private activatedRoute: ActivatedRoute) { 

    this.buildForm();

    this.toppings = fb.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false
    });
  }

  
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.marca.mar_activo = "true";
    if(this.idMarca != ""){
      
      this.marcaService.getMarca(this.idMarca)
      .subscribe(
        res => {
          this.marca = res;
          this.edit = true;
        },
        err => console.log(err)
      )
    }
    else
    {
        this.edit = false;
        
        this.marca.mar_nombre = "";
        this.marca.mar_descripcion = "";
        this.marca.id_marca = 0;
      
    }
  }

  handleCancelMarca(): void {
    this.isVisibleMarca = false;
    this.newVisibleMarca.emit(this.isVisibleMarca);
  }

  

  
  private buildForm() {
    this.formMarca = this.formBuilder.group({
      nombreMarca: ['', [Validators.required]],
      descripcionMarca: ['', []],
      pepperoni: ['', []],
    });


    this.formMarca.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
    });
  }

  saveNewMarca(){
    
      const value = this.formMarca.value;
        this.marcaService.saveMarca(this.marca)
      .subscribe(
        ok=>{
          if (ok== true && this.formMarca.valid) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se guardo con Exito',
              showConfirmButton: false,
              timer: 1500
            })
            this.formMarca.reset();
            this.isVisibleMarca = false;
            this.newVisibleMarca.emit(this.isVisibleMarca);
          }
          else{
            this.formMarca.markAllAsTouched();
            Swal.fire('Error', ok, 'error');
          }
        });
    
  }

  updateMarca(){

    this.marcaService.updateMarca(this.idMarca, this.marca)
      .subscribe(
        ok => {
          if (ok== true && this.formMarca.valid) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se Actualizo con Exito',
              showConfirmButton: false,
              timer: 1500
            })
            this.formMarca.reset();
            this.ngOnInit();
            this.isVisibleMarca = false;
            this.newVisibleMarca.emit(this.isVisibleMarca);
          }
          else{
            this.formMarca.markAllAsTouched();
            Swal.fire('Error', ok, 'error');
          }
          
        });
  }

  campoEsValido(campo: string){
    return this.formMarca.controls[campo].errors && this.formMarca.controls[campo].touched;
  }

}
