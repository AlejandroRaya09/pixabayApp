import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private error$ = new Subject<string>();
  private terminoBusqueda$ = new Subject<string>();

  private http = inject(HttpClient)

  setError(mensaje:string){
    this.error$.next(mensaje)
  }
  getError():Observable<string>{
    return this.error$.asObservable();
  }


  enviarTerminoBusqueda(termino:string){
    this.terminoBusqueda$.next(termino);
  }
  getTermninoBusqueda():Observable<string>{
    return this.terminoBusqueda$.asObservable();
  }
  
  getImagenes(terminoImagen: string, imagenesPagina:number, paginaActual:number ):Observable<any>{
    const KEY = '45381725-9e83c91a825b8b3d4657fb90b'
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${terminoImagen}&per_page=${imagenesPagina}&page=${paginaActual}`
    return this.http.get(URL)
  }

}
