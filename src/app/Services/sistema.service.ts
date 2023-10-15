import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environments } from "src/environments";
import { SistemaFinanceiro } from "../Models/SistemaFinanceiro";

@Injectable({
    providedIn: 'root'
})

export class SistemaService{
    constructor(private httpClient : HttpClient){}

    private readonly baseUrl = environments["endpoint"];

    AdicionarSistemaFinanceiro(sistemaFinanceiro: SistemaFinanceiro){
        return this.httpClient.post<SistemaFinanceiro>(`${this.baseUrl}/SistemaFinanceiro/AdicionarSistemaFinanceiro`,
        sistemaFinanceiro)
    }

    ListaSistemaUsuario(email: string){
        return this.httpClient.get(`${this.baseUrl}/SistemaFinanceiro/ListaSistemasUsuario?email=${email}`)
    }

    CadastrarUsuarioSistemaFinanceiro(idSistema:number, email:string){
        return this.httpClient.post(`${this.baseUrl}/CadastrarUsuarioSistemaFinanceiro/${idSistema}?email=${email}`, 
        null)
    }

    ObterSistemaFinanceiro(id: number){
        return this.httpClient.get(`${this.baseUrl}/SistemaFinanceiro/ObterSistemaFinanceiro/${id}`)
    }

    AtualizarSistemaFinanceiro(sistema: SistemaFinanceiro){
        return this.httpClient.put(`${this.baseUrl}/SistemaFinanceiro/AtualizarSistemaFinanceiro`, sistema)
    }
}