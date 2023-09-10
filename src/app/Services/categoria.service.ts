import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environments } from "src/environments";
import { Categoria } from "../Models/Categoria";

@Injectable({
    providedIn: 'root'
})

export class CategoriaService{
    constructor(private httpClient : HttpClient){}

    private readonly baseUrl = environments["endpoint"];

    AdicionarCategoria(categoria: Categoria){
        debugger
        return this.httpClient.post<Categoria>(`${this.baseUrl}/Categoria/AdicionarCategoria`,
        categoria)
    }

    ListarCategoriasUsuario(email: string){
        return this.httpClient.get(`${this.baseUrl}/Categoria/ListarCategoriasUsuario?email=${email}`)
    }
}