import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { readonly } from '@angular/forms/signals';

@Component({
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {}

  formulario:FormGroup;
  private readonly HttpClient;

  constructor(private fb:FormBuilder, HttpClient){
    this.formulario = this.fb.group(
      {
        correo:['',[Validators.required, Validators.correo]],
        
      }

    )
  }