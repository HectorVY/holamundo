import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  selector: 'app-pelicula',
  styleUrl: './pelicula.css',
  templateUrl: './pelicula.html',
})
export class Pelicula implements OnInit {
   formulario:FormGroup;
  private readonly http:HttpClient;

  peliculas:any=[];

        constructor(private fb:FormBuilder, http:HttpClient,
        private cdr: ChangeDetectorRef){
        this.formulario = this.fb.group(
          {
            titulo:['',Validators.required],
            sinopsis:['',Validators.required],
            duracionMinutos:[null,Validators.required]
          }
           );
              this.http = http;
        
      }
      ngOnInit(): void {
        this.buscarPeliculas();
      }

      buscarPeliculas(){
        this.http.get("http://localhost:8080/pelicula/buscar").subscribe(
          data => this.mostrarPeliculas(data)
        )
      }
      
      mostrarPeliculas(peliculas:any){
        this.peliculas = peliculas;
        this.cdr.detectChanges();
      }

      guardarPeliculas(){
        if(this.formulario.valid){
          let temp = {...this.formulario.value};
          temp.fechaCreacion = new Date();
          this.http.post("http://localhost:8080/pelicula/guardar",temp).subscribe(
            data => this.mostrar(data)
          )
        }
      }

      mostrar(data:any){
        if(data?.idPelicula){
          alert("Usuario creado con el id: "+data.idPelicula);
          this.buscarPeliculas();
        }
        else{
          alert("Error al crear usuario, existe un problema en el servidor.")
        }
      }
      eliminarPelicula(idPelicula: number) {
        this.http.delete("http://localhost:8080/pelicula/eliminar/" + idPelicula).subscribe(
          () => this.buscarPeliculas()
      );
    }

}






