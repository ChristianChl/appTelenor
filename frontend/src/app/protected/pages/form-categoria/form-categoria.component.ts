import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Categoria } from '../../interfaces/Categoria';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrls: ['./form-categoria.component.css']
})
export class FormCategoriaComponent implements OnInit {

  @Input() isVisibleCategoria: any;
  @Input() idCategoria: any;
  @Output() newVisibleCategoria : EventEmitter<boolean>  = new EventEmitter<boolean>();
  
  formCategoria = new FormGroup({
    firstName: new FormControl(),
    descripcionCategoria: new FormControl(),
    activoCategoria : new FormControl() 
  });

  inputValue?: string;
  edit: boolean = false;
  switchValue = false;
  checked = true;

  categoria: Categoria = {
    id_categoria: 0,
    cat_nombre: '',
    cat_descripcion: '',
    cat_activo: ''
  };
  toppings: FormGroup;

  constructor(fb: FormBuilder, private formBuilder : FormBuilder,private categoriaService: CategoriasService, private router: Router, private activatedRoute: ActivatedRoute) { 

    this.buildForm();

    this.toppings = fb.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false
    });
  }

 


  ngOnInit(): void {
    this.edit = false;
    const params = this.activatedRoute.snapshot.params;
    this.categoria.cat_activo = "true";
    if(this.idCategoria!=""){
      this.categoriaService.getCategoria(this.idCategoria)
      .subscribe(
        res => {
          this.categoria = res;
          this.edit = true;
        },
        err => console.log(err)
      )
    }
    else{
      
      
      this.edit = false;
      
      this.categoria.cat_nombre = "";
      this.categoria.cat_descripcion = "";
      this.categoria.id_categoria = 0;
    }
  }

  handleCancelCategoria(): void {
    
    this.isVisibleCategoria = false;
    this.newVisibleCategoria.emit(this.isVisibleCategoria);
  }

  
  
  
  private buildForm() {
    this.formCategoria = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      activoCategoria: ['', []],
      descripcionCategoria: ['', []],
    });


    this.formCategoria.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value => {
    });
  }

  handleOkCategoria(){
      this.categoriaService.saveCategoria(this.categoria)
      .subscribe(
        ok=>{
          if (ok == true && this.formCategoria.valid) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se guardo con Exito',
              showConfirmButton: false,
              timer: 1500
            })
            this.formCategoria.reset();
            this.ngOnInit();
            this.isVisibleCategoria = false;
            this.newVisibleCategoria.emit(this.isVisibleCategoria);
          }
          else{
            this.formCategoria.markAllAsTouched();
            Swal.fire('Error', ok, 'error');
          }
        });
  }

  updateCategoria(){

    this.categoriaService.updateCategoria(this.idCategoria, this.categoria)
      .subscribe(
        ok => {
          
          if (this.formCategoria.valid) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Se guardo con Exito',
              showConfirmButton: false,
              timer: 1500
            });
            this.formCategoria.reset();
            this.ngOnInit();
            this.isVisibleCategoria = false;
            this.newVisibleCategoria.emit(this.isVisibleCategoria);
          }
          else{
            this.formCategoria.markAllAsTouched();
            Swal.fire('Error', ok, 'error');
           
          }
          
        });
  }

  campoEsValido(campo: string){
    return this.formCategoria.controls[campo].errors && this.formCategoria.controls[campo].touched;
  }


}
