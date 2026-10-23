import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  selector: 'app-clasificacion',
  styleUrl: './clasificacion.css',
  templateUrl: './clasificacion.html',
})
export class Clasificacion {
  formulario:FormGroup;
  private readonly http:HttpClient;

  clasificaciones:any=[];

        constructor(private fb:FormBuilder, http:HttpClient,
        private cdr: ChangeDetectorRef){
        this.formulario = this.fb.group(
          {
            nombre:['',Validators.required],

          }
           );
              this.http = http;
        
      }
      ngOnInit(): void {
        this.buscarClasificacion();
      }

      buscarClasificacion(){
        this.http.get("http://localhost:8080/clasificacion/buscar").subscribe(
          data => this.mostrarClasificacion(data)
        )
      }
      
      mostrarClasificacion(clasificaciones:any){
        this.clasificaciones = clasificaciones;
        this.cdr.detectChanges();
      }

      guardarClasificacion(){
        if(this.formulario.valid){
          let temp = {...this.formulario.value};
          temp.fechaCreacion = new Date();
          this.http.post("http://localhost:8080/clasificacion/guardar",temp).subscribe(
            data => this.mostrar(data)
          )
        }
      }

      mostrar(data:any){
        if(data?.idClasificacion){
          alert("Usuario creado con el id: "+data.idClasificacion);
          this.buscarClasificacion();
        }
        else{
          alert("Error al crear usuario, existe un problema en el servidor.")
        }
      }

}
