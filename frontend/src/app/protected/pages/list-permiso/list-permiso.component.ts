import { Component, OnInit } from '@angular/core';
import { PermisoService } from '../../services/permiso.service';

@Component({
  selector: 'app-list-permiso',
  templateUrl: './list-permiso.component.html',
  styleUrls: ['./list-permiso.component.css']
})
export class ListPermisoComponent implements OnInit {

  permiso: any = [];
  filterNombre = "";

  constructor(private permisoService: PermisoService) { }

  ngOnInit(): void {
    this.getPermiso();
  }
  getPermiso(){
    this.permisoService.getPermisos().subscribe(
      res => {
        this.permiso = res;
        this.permiso = this.permiso.permiso;
      },
      err => console.log(err)
    );
  }

}
