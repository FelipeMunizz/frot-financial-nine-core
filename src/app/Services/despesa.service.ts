import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environments } from "src/environments";
import { Despesa } from "../Models/Despesa";

@Injectable({
    providedIn: 'root'
})

export class DespesaService{
    constructor(private httpClient : HttpClient){}

    private readonly baseUrl = environments["endpoint"];

    AdicionarDespesa(despesa: Despesa){
        return this.httpClient.post<Despesa>(`${this.baseUrl}/AdicionarCategoria`,
        despesa)
    }

    ListarDespesasUsuario(email: string){
        return this.httpClient.get(`${this.baseUrl}/ListarDespesasUsuario?email=${email}`)
    }
}