import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environments } from "src/environments";
import { Lancamento } from "../Models/Lancamento";

@Injectable({
    providedIn: 'root'
})

export class LancamentoService{
    constructor(private httpClient : HttpClient){}

    private readonly baseUrl = environments["endpoint"];

    AdicionarLancamento(lancamento: Lancamento){
        return this.httpClient.post<Lancamento>(`${this.baseUrl}/Lancamentos/AdicionarLancamento`,
        lancamento)
    }

    ListarLancamentosUsuario(email: string){
        return this.httpClient.get(`${this.baseUrl}/Lancamentos/ListarLancamentosUsuario?email=${email}`)
    }
}