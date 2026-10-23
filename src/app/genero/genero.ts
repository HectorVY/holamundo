import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  selector: 'app-genero',
  styleUrl: './genero.css',
  templateUrl: './genero.html',
})
export class Genero implements OnInit {
   formulario:FormGroup;
    private readonly http:HttpClient;

    generos:any = [];


      constructor(private fb:FormBuilder, http:HttpClient,
        private cdr: ChangeDetectorRef){
        this.formulario = this.fb.group(
          {
            nombre:['',Validators.required]
          }

        );
        this.http = http;
        
      }

      ngOnInit(): void {
        this.buscarGenero();
      }

      buscarGenero(){
        this.http.get("http://localhost:8080/genero/buscar").subscribe(
          data => this.mostrarGenero(data)
        )
      }

      mostrarGenero(generos:any){
        this.generos = generos;
        this.cdr.detectChanges;
      }

      guardarGenero(){
        if(this.formulario.valid){
          let temp = {...this.formulario.value};
          temp.fechaCreacion = new Date();
          this.http.post("http://localhost:8080/genero/guardar",temp).subscribe(
            data => this.mostrar(data)
          )
        }
      }

      mostrar(data:any){
        if(data?.idGenero){
          alert("Usuario creado con el id: "+data.idGenero);
          this.buscarGenero();
        }
        else{
          alert("Error al crear usuario, existe un problema en el servidor.")
        }
      }
}

