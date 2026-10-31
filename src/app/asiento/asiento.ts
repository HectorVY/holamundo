import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-asiento',
  styleUrl: './asiento.css',
  templateUrl: './asiento.html',
})
export class Asiento implements OnInit {
    formulario:FormGroup;
  private readonly http:HttpClient;

  asientos:any=[];

        constructor(private fb:FormBuilder, http:HttpClient,
        private cdr: ChangeDetectorRef){
        this.formulario = this.fb.group(
          {
            fila:[null,Validators.required],
            numero:[null,Validators.required]
          }
           );
              this.http = http;
        
      }
      ngOnInit(): void {
        this.buscarAsiento();
      }

      buscarAsiento(){
        this.http.get("http://localhost:8080/asiento/buscar").subscribe(
          data => this.mostrarAsiento(data)
        )
      }
      
      mostrarAsiento(asientos:any){
        this.asientos = asientos;
        this.cdr.detectChanges();
      }

      guardarAsiento(){
        if(this.formulario.valid){
          let temp = {...this.formulario.value};
          temp.fechaCreacion = new Date();
          this.http.post("http://localhost:8080/asiento/guardar",temp).subscribe(
            data => this.mostrar(data)
          )
        }
      }

      mostrar(data:any){
        if(data?.idAsiento){
          alert("Usuario creado con el id: "+data.idAsiento);
          this.buscarAsiento();
        }
        else{
          alert("Error al crear usuario, existe un problema en el servidor.")
        }
      }
      eliminarAsieno(idAsiento: number) {
        this.http.delete("http://localhost:8080/sala/eliminar/" + idAsiento).subscribe(
          () => this.buscarAsiento()
      );
    }


}
