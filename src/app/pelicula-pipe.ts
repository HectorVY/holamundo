import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pelicula',
  standalone : true
})
export class PeliculaPipe implements PipeTransform {
  transform(value: number, peliculas: any[]): string {
          for(let pelicula of peliculas){
      if(pelicula.idPelicula==value){
        return pelicula.titulo;
      }
    }
    return 'No hay información';
  }
}
