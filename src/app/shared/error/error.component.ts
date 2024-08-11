import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  texto:string = ''
  mostrar:boolean = false;
  suscription: Subscription;


  private _imagenServices = inject(ImagenService);


  constructor(){
    this.suscription = this._imagenServices.getError().subscribe(data =>{
      this.texto = data;
      this.mostrar = true
    })
  }
}
