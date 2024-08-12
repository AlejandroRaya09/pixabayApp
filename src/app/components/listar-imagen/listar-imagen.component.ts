import { Component, inject, OnInit } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrl: './listar-imagen.component.css',
})
export class ListarImagenComponent{
  termino: string = '';
  suscription: Subscription;
  listImagenes: any[] = []
  loading:boolean = false;
  imagenesPorPagina: number = 30;
  paginaActual: number = 1;
  calcularTotalPaginas:number = 0;

  private _imagenServices = inject(ImagenService);

  constructor() {
    this.suscription = this._imagenServices
      .getTermninoBusqueda()
      .subscribe((data) => {
        this.termino = data;
        this.paginaActual = 1
        this.loading = true;
        this.obtenerImagenes();
      });
  }


  obtenerImagenes() {
    this._imagenServices.getImagenes(this.termino, this.imagenesPorPagina, this.paginaActual).subscribe({
      next:(data)=>{
        this.loading = false;
        if(data.hits.length === 0){
          this._imagenServices.setError('Upss... No hay imagenes que mostrar :C')
          return
        }
        this.calcularTotalPaginas = Math.ceil(data.totalHits / this.imagenesPorPagina);
        this.listImagenes = data.hits

      },
      error:(error)=>{
        this.listImagenes = []
        this._imagenServices.setError('Opss... Ocurrio un error Inesperado :/')
        this.loading = false;
      }
    })
  }

  paginaAnterior(){
    this.paginaActual = this.paginaActual - 1;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes()
  }

  paginaPosterior(){
    this.paginaActual = this.paginaActual + 1;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes()
  }

  paginaAnteriorClass(){
    if(this.paginaActual == 1){
      return false
    } else {
      return true
    }
  }

  paginaPosteriorClass(){
    if(this.paginaActual == this.calcularTotalPaginas){
      return false
    } else {
      return true
    }
  }

}
