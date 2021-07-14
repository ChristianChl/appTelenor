import { Component, OnInit, ViewEncapsulation  } from '@angular/core';

interface Option {
  label: string;
  value: string;
  age: number;
}

@Component({
  selector: 'app-prueba-autocompletado',
  templateUrl: './prueba-autocompletado.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./prueba-autocompletado.component.css']
})
export class PruebaAutocompletadoComponent{

  inputValue?: string;
  filteredOptions: string[] = [];
  options = ['Burns Bay Road', 'Downing Street', 'Wall Street','primero','segundo','tercero'];
  constructor() {
    this.filteredOptions = this.options;
  }
  onChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

}
