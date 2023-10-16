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

    ListarCategoriasUsuario(email: string, idSistema: number){
        return this.httpClient.get(`${this.baseUrl}/Categoria/ListarCategoriasUsuario?email=${email}&idSistema=${idSistema}`)
    }

    ObterCategoria(id: number){
        return this.httpClient.get(`${this.baseUrl}/Categoria/ObterCategoria/${id}`)
    }

    AtualizarCategoria(item: Categoria){
        return this.httpClient.put<Categoria>(`${this.baseUrl}/Categoria/AtualizarCategoria`,
        item)
    }
}