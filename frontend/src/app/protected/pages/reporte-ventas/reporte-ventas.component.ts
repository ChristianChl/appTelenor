import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {
  fechaDesde:any ="";
  fechaHasta:any ="";
  ventas:any = [];
  constructor(private ventasService:VentasService) { }

  ngOnInit(): void {
    console.log(this.fechaDesde);
    this.getVentas();
  }

  getVentas(){
    this.ventasService.getVentas().subscribe(
      res => {
        this.ventas = res;
        this.ventas = this.ventas.venta;
        let numMes:any ="";
        for(let i=0; i<this.ventas.length; i++){
            const now = new Date(this.ventas[i].createdAt);
            var months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            if(now.getMonth() < 10){
               numMes = "0"+ now.getMonth()
            }


            let formatted = now.getFullYear()  + '-' + numMes   + '-' + now.getDate();
            

            this.ventas[i].createdAt = formatted;
        }
      },
      err => console.error(err)
    );
  }
  
  buscar(){
    console.log(this.ventas)
    console.log(this.fechaDesde)
    let parts = this.fechaDesde.split("-")
    console.log(parts)
    this.fechaDesde = parts[0] +"-"+parts[1]+"-"+parts[2];
    console.log(this.fechaDesde)
    parts = this.fechaHasta.split("-")
    this.fechaHasta = parts[0] +"-"+parts[1]+"-"+parts[2];
    console.log(this.fechaHasta)

    let busca = this.ventas.filter((n: { createdAt: Date; }) => n.createdAt > this.fechaDesde && n.createdAt < this.fechaHasta)
    console.log(busca)
  }

}
