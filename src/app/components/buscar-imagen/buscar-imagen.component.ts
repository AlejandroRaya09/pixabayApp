import { Component, inject } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrl: './buscar-imagen.component.css'
})
export class BuscarImagenComponent {

  nombreImagen: string = '';
  private _imagenServices = inject(ImagenService);


  buscarImagenes(){
    if(this.nombreImagen == ''){
      this._imagenServices.setError('Agrega una busqueda correcta')
      return;
    }

     this._imagenServices.enviarTerminoBusqueda(this.nombreImagen);
  }
}
