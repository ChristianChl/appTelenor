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
    console.log("Inicializando cATEGORIA");
    const params = this.activatedRoute.snapshot.params;
    this.categoria.cat_activo = "true";
    console.log("IdCategoria" + this.idCategoria);
    if(this.idCategoria!=""){
      this.categoriaService.getCategoria(this.idCategoria)
      .subscribe(
        res => {
          console.log(res);
          console.log("IdCategoria prueba");
          this.categoria = res;
          this.edit = true;
        },
        err => console.log(err)
      )
    }
    else{
      
      console.log("prueba de oninit");
      this.edit = false;
      
      this.categoria.cat_nombre = "";
      this.categoria.cat_descripcion = "";
      this.categoria.id_categoria = 0;
    }
  }

  handleCancelCategoria(): void {
    console.log('Button cancel clicked!');
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
      console.log(value);
    });
  }

  handleOkCategoria(){

    if (this.formCategoria.valid) {
      console.log("agreando");
      const value = this.formCategoria.value;
      console.log(value);
      console.log(this.categoria);
      this.categoriaService.saveCategoria(this.categoria)
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
          this.formCategoria.reset();
          this.ngOnInit();
          this.isVisibleCategoria = false;
          this.newVisibleCategoria.emit(this.isVisibleCategoria);
        },
        err => console.log(err)
      )
    } 
    else {
      console.log("error");
      this.formCategoria.markAllAsTouched();
    }
  }

  updateCategoria(){
    console.log("Actualizando");
    const params = this.activatedRoute.snapshot.params;
    this.categoriaService.updateCategoria(this.idCategoria, this.categoria)
      .subscribe(
        res => {
          console.log(res);
          console.log(this.categoria);
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
        },
        err => console.log(err)
      )
  }


}
