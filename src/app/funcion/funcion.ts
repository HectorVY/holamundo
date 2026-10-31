import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PeliculaPipe } from '../pelicula-pipe';
import { SalaPipe } from '../sala-pipe';
@Component({
  imports: [ReactiveFormsModule,FormsModule,CommonModule, PeliculaPipe, SalaPipe],
  selector: 'app-funcion',
  styleUrl: './funcion.css',
  templateUrl: './funcion.html',
})
export class Funcion implements OnInit {
  formulario:FormGroup;
  private readonly http:HttpClient;

  funciones:any=[];
  salas:any=[];
  peliculas:any=[];

        constructor(private fb:FormBuilder, http:HttpClient,
        private cdr: ChangeDetectorRef){
        this.formulario = this.fb.group(
          {
            fecha:[null,Validators.required],
            hora:[null,Validators.required],
            precioEntrada:[null,Validators.required],
            idSala:[null,Validators.required],
            idPelicula:[null,Validators.required]
          }
           );
              this.http = http;
        
      }
      ngOnInit(): void {
        this.buscarFuncion();
        this.buscarSala();
        this.buscarPelicula();
      }

      buscarSala() {
        this.http.get("http://localhost:8080/sala/buscar").subscribe(data => {
        this.salas = data;
        this.cdr.detectChanges();
      });
    }

      buscarPelicula() {
        this.http.get("http://localhost:8080/pelicula/buscar").subscribe(data => {
          this.peliculas = data;
          this.cdr.detectChanges();
        });
      }

      buscarFuncion(){
        this.http.get("http://localhost:8080/funcion/buscar").subscribe(
          data => this.mostrarFuncion(data)
        )
      }
      
      mostrarFuncion(funciones:any){
        this.funciones = funciones;
        this.cdr.detectChanges();
      }

      guardarFuncion(){
        if(this.formulario.valid){
          let temp = {...this.formulario.value};
          temp.fechaCreacion = new Date();
          if (temp.hora && temp.hora.split(':').length === 2) { temp.hora += ":00"; }
          this.http.post("http://localhost:8080/funcion/guardar",temp).subscribe(
            data => this.mostrar(data)
          )
        }
      }

      mostrar(data:any){
        if(data?.idFuncion){
          alert("Usuario creado con el id: "+data.idFuncion);
          this.buscarFuncion();
        }
        else{
          alert("Error al crear usuario, existe un problema en el servidor.")
        }
      }
      eliminarFuncion(idFuncion: number) {
        this.http.delete("http://localhost:8080/funcion/eliminar/" + idFuncion).subscribe(
          () => this.buscarFuncion()
      );
    }

}
