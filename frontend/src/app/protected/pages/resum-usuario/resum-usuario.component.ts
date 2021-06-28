import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-resum-usuario',
  templateUrl: './resum-usuario.component.html',
  styleUrls: ['./resum-usuario.component.css']
})
export class ResumUsuarioComponent implements OnInit {

  @Input() isVisbleResumenUsuario: any;
  @Input() idUsuario: any;
  @Output() newVisibleResumenUsuario : EventEmitter<boolean>  = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  handleCancelResumen(): void{
    this.isVisbleResumenUsuario = false;
    this.newVisibleResumenUsuario.emit(this.isVisbleResumenUsuario);

  }

}
