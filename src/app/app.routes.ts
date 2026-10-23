import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Bienvenida } from './bienvenida/bienvenida';
import { Anuncio } from './anuncio/anuncio';
import { Clasificacion } from './clasificacion/clasificacion';
import { Genero } from './genero/genero';
import { Sala } from './sala/sala';
import { Usuario } from './usuario/usuario';
import { Funcion } from './funcion/funcion';
import { Pelicula } from './pelicula/pelicula';


export const routes: Routes = [
    {path:"", component:Login},
    {path:"bienvenida", component:Bienvenida},
    {path:"anuncio", component: Anuncio},
    {path:"clasificacion", component: Clasificacion},
    {path:"genero", component: Genero},
    {path:"sala", component: Sala},
    {path:"usuario", component: Usuario},
    {path:"pelicula", component: Pelicula},
    {path:"funcion", component: Funcion},

]; 