import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CotizacionService } from '../../services/cotizacion.service';
import { TipoDocumentoService } from '../../services/tipo-documento.service';
import { jsPDF } from 'jspdf'
import 'jspdf-autotable';
import { DetalleCotizacionService } from '../../services/detalle-cotizacion.service';
@Component({
  selector: 'app-list-cotizacion',
  templateUrl: './list-cotizacion.component.html',
  styleUrls: ['./list-cotizacion.component.css']
})
export class ListCotizacionComponent implements OnInit {

  cotizacion:any = [];
  documento:any = [];
  filterNombre = "";
  filterDescripcion = "";
  filterEstado = "";

  select: any = [
    {text:"Activos", value:"true"},
    {text:"Inactivos", value:"false"},
    {text:"Resetear", value:""}
  ];


  constructor(private cotizacionService:CotizacionService,
    private tipoDocumentoService:TipoDocumentoService,
    private detalleCotizacionService:DetalleCotizacionService) { }

  ngOnInit(): void {
      
      this.getCotizaciones();
      this.getDetalleCotizacion();
  }
  detalleCotizacion:any = [];
  getDetalleCotizacion(){

    this.detalleCotizacionService.getDetalleCotizacions().subscribe(
      res =>{
            
        this.detalleCotizacion = res;
        this.detalleCotizacion = this.detalleCotizacion.detalleCotizacion;
      },
      err => console.log(err)
    )
  }

  

  idCotizacion = "";
  isVisibleCotizacion = false;
  showModalCotizacion(){
    console.log(this.isVisibleCotizacion);
    this.isVisibleCotizacion = true;  
    this.idCotizacion = "";
    
  }

  nuevoDatoCotizacion(){
    console.log("prueba regresando");
    this.ngOnInit();
    this.isVisibleCotizacion = false;
  }

  showModalEditarCotizacion(id:string){
    this.isVisibleCotizacion = true;  
    console.log("Editar Categoria");
    this.idCotizacion = id;
  }
  numCotiz:any = 0;
  siguienteCoti = 0;
  numeroCorrecto:any = 'no';
  filterCoti:any = [];
  getCotizaciones(){
    this.cotizacionService.getCotizacions().subscribe(
      res => {
        this.cotizacion = res;
        this.cotizacion = this.cotizacion.cotizacion;

        for(let i=0; i<this.cotizacion.length; i++){
          const now = new Date(this.cotizacion[i].createdAt);
          var months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
          let formatted = now.getDate() + '/' + months[now.getMonth()]  + '/' + now.getFullYear();
          

          this.cotizacion[i].createdAt = formatted;
          
      }
          this.numeroCorrecto = 'no';

          this.siguienteCoti = this.cotizacion.length+1;
          let numCoti = this.siguienteCoti;
          while(this.numeroCorrecto == 'no'){

            this.filterCoti = this.cotizacion.filter(function(ele: any){
              return ele.id_cotizacion == numCoti;
            });

            if(this.filterCoti.length == 0){
              this.numeroCorrecto = 'si';
            } 
            else{
              this.filterCoti = 'no';
              numCoti = numCoti + 1;
            }
          }

          this.siguienteCoti = numCoti;
          console.log("siguiente cotizacion");
          console.log(this.siguienteCoti = numCoti)
        //this.numCotiz = this.cotizacion.length

        console.log(this.cotizacion);
      },
      err => console.error(err)
    );
  }

  deleteCotizacion(id: string){
    this.cotizacionService.deleteCotizacion(id).subscribe(
      res=> {
        console.log(res)
        this.getCotizaciones();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se Elimino la Cotización con Exito!',
          showConfirmButton: false,
          timer: 1500
        });
      },
      err => console.log(err)
    );
  }


  arrayP : any = [];
  arrayPdf : any = [];
  filterCotizacion:any = [];
  header = [[ 'Item', 'Modelo', 'Descripcion/Serie','Cantidad','P.Unit','V.venta']]
  igv : string = "";
  total : string ="";
  signoMoneda:string = "";
  generatePdf(numeroComprobante:string){
        var pdf = new jsPDF();
        this.arrayPdf =[]
        this.arrayP=[]

        const nuevoNumero = Number(numeroComprobante);

        this.filterCotizacion = this.cotizacion.filter(function(ele: any){
          return ele.id_cotizacion == nuevoNumero;
        });

        if(this.filterCotizacion[0].Monedas.id_moneda == 2){
          this.signoMoneda = "$."
        }
        else{
          this.signoMoneda ="S/."
        }

        this.getProductos(numeroComprobante);
        
        pdf.rect(120, 10, 80, 15, 'F');
        pdf.rect(120, 40, 80, 15, 'F')

        pdf.setTextColor('#FFFFFF');
        pdf.setFont('', 'bold')
        pdf.text('COTIZACION', 145, 19);
        
        
        pdf.setTextColor('#FFFFFF');
        pdf.setFont('', 'bold')
        pdf.text('N° '+ '0000'+this.filterCotizacion[0].id_cotizacion, 147, 49);
        
        pdf.setTextColor('#030303');
        
        //Datos de la Empresa
        pdf.addImage("https://tse2.mm.bing.net/th?id=OIP.cYWQK9OSoxIMGgIkBwl9GgHaHa&pid=Api&P=0&w=300&h=300", "jpg", 
        30, 10, 50, 50);
          //Direccion 
          pdf.setFontSize(11);
          pdf.setFont('', 'bold')
          pdf.text('Jiron Orbegoso #860 Int "2A" 13001 Trujillo-Perú', 10, 65);
          

          pdf.addImage("https://lh3.googleusercontent.com/Ol7K4Z4d1rGTsfiyMlurQi90oJay5kbfHRXi8p5-qRz4XRrJTu1d8_h6cB9jHk5D_9U=s180","png",
          10, 66, 5, 5);
          pdf.setFont('', 'bold')
          pdf.text('917006760', 16, 70);

          pdf.addImage("https://tse2.mm.bing.net/th?id=OIP.nNQv7GMmjm5JkpSlB1TwigHaHa&pid=Api&P=0&w=300&h=300","jpg",
          10, 72, 6, 6);
          pdf.setFont('', 'bold')
          pdf.text('telenorSac@gmail.com', 16, 76);
       
        
        pdf.roundedRect(10, 80, 190, 30, 1, 1, 'S');
        pdf.setFontSize(11);

        pdf.setFont('', 'bold')
        pdf.text("Sr/Sra(s): ", 12, 87);
        pdf.setFont('', 'normal')
        pdf.text(this.filterCotizacion[0].Personas.per_razonSocial, 35, 87);


        pdf.setFont('', 'bold');
        pdf.text("RUC: ", 12, 95);
        pdf.setFont('', 'normal')
        pdf.text(this.filterCotizacion[0].Personas.per_numeroDocumento, 35, 95);

        pdf.setFont('', 'bold');
        pdf.text("Direccion:", 12, 103);
        pdf.setFont('', 'normal')
        pdf.text(this.filterCotizacion[0].Personas.per_direccion, 35, 103);

        pdf.setFont('', 'bold');
        pdf.text("F.Emision:", 150, 87);
        pdf.setFont('', 'normal')
        pdf.text(this.filterCotizacion[0].createdAt, 170, 87);

        pdf.setFont('', 'bold');
        pdf.text("Moneda:", 150, 95);
        pdf.setFont('', 'normal')
        pdf.text(this.filterCotizacion[0].Monedas.mon_nombre, 170, 95);
        //const margiTopiGV =   this.tamañoFilas + 20 + 115+3;
        const margiTopTotal =   this.tamañoFilas + 20 + 115+3;

        this.total = (this.filterCotizacion[0].coti_total).toString();
        

        
        pdf.text('IMPORTE TOTAL:', 145, margiTopTotal);
        pdf.text(this.signoMoneda+' '+this.total, 182, margiTopTotal);


        (pdf as any).autoTable({
          columnStyles: { Cantidad: { halign: 'center' } },
          
          margin:{top:115, right:10, left:10},
          head: this.header,
          body: this.arrayPdf,
          theme: 'striped',
          didDrawCell: () => {
              
          }
          });


        

        pdf.save(`${this.filterCotizacion[0].id_cotizacion}-${this.filterCotizacion[0].createdAt}.pdf` );
  

  }


  filterDetalle:any = [];
  tamañoFilas : any = 0;
  getProductos(numeroComprobante:string){
    
    this.arrayPdf = [];
    const nuevoNumero = Number(numeroComprobante);
    this.filterDetalle = this.detalleCotizacion.filter(function(ele: any){
      return ele.fk_id_cotizacion == nuevoNumero;
    });

    for(let i=0; i<this.filterDetalle.length;i++){


      this.arrayPdf.push([(i+1).toString(),
        this.filterDetalle[i].Productos.prod_modelo,
        this.filterDetalle[i].Productos.prod_descripcion,
        this.filterDetalle[i].decoti_cantidad,
        this.signoMoneda +" "+ this.filterDetalle[i].decoti_precioVenta,
        this.signoMoneda +" "+ this.filterDetalle[i].decoti_total]);
      
      
    }
    this.tamañoFilas =  this.arrayPdf.length*8;

  }

}
