import { Component, inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from '../../services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnDestroy{
  texto:string = ''
  mostrar:boolean = false;
  suscription: Subscription;


  private _imagenServices = inject(ImagenService);


  constructor(){
    this.suscription = this._imagenServices.getError().subscribe(data =>{
      this.mostrarMensaje();
      this.texto = data;
    })
  }

  mostrarMensaje(){
    this.mostrar = true
    setTimeout(() => {
      this.mostrar = false
    }, 2000);
  }


  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }



}
