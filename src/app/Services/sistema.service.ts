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
        return this.httpClient.post<SistemaFinanceiro>(`${this.baseUrl}/adicionarsistemafinanceiro`,
        sistemaFinanceiro)
    }

    ListaSistemaUsuario(email: string){
        return this.httpClient.get(`${this.baseUrl}/listasistemausuario?email=${email}`)
    }

    CadastrarUsuarioSistemaFinanceiro(idSistema:number, email:string){
        return this.httpClient.post(`${this.baseUrl}/cadastrarusuariosistemafinanceiro?idSistema=${idSistema}`, 
        email)
    }
}