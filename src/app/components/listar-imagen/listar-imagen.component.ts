import { Component, inject } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrl: './listar-imagen.component.css',
})
export class ListarImagenComponent {
  termino: string = '';
  suscription: Subscription;

  private _imagenServices = inject(ImagenService);

  constructor() {
    this.suscription = this._imagenServices
      .getTermninoBusqueda()
      .subscribe((data) => {
        this.termino = data;
      });
      console.log(this.termino)
      this.obtenerImagenes()
  }

  

  obtenerImagenes() {
    this._imagenServices.getImagenes(this.termino).subscribe((data) => {
      console.log(data)
      if(data.hits.length === 0){
        this._imagenServices.setError('Upss... No hay imagenes que mostrar :C')
        return
      }
    }, error =>{
      this._imagenServices.setError('Opss... Ocurrio un error Inesperado :/')
    }) 
  }
}
