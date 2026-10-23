import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  selector: 'app-sala',
  styleUrl: './sala.css',
  templateUrl: './sala.html',
})
export class Sala implements OnInit {
  formulario:FormGroup;
  private readonly http:HttpClient;

  salas:any=[];

        constructor(private fb:FormBuilder, http:HttpClient,
        private cdr: ChangeDetectorRef){
        this.formulario = this.fb.group(
          {
            nombre:['',Validators.required],
            filas:[null,Validators.required],
            asientosPorFila:[null,Validators.required]
          }
           );
              this.http = http;
        
      }
      ngOnInit(): void {
        this.buscarSalas();
      }

      buscarSalas(){
        this.http.get("http://localhost:8080/sala/buscar").subscribe(
          data => this.mostrarSalas(data)
        )
      }
      
      mostrarSalas(salas:any){
        this.salas = salas;
        this.cdr.detectChanges();
      }

      guardarSalas(){
        if(this.formulario.valid){
          let temp = {...this.formulario.value};
          temp.fechaCreacion = new Date();
          this.http.post("http://localhost:8080/sala/guardar",temp).subscribe(
            data => this.mostrar(data)
          )
        }
      }

      mostrar(data:any){
        if(data?.idSala){
          alert("Usuario creado con el id: "+data.idSala);
          this.buscarSalas();
        }
        else{
          alert("Error al crear usuario, existe un problema en el servidor.")
        }
      }

}
