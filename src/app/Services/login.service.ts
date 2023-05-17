import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environments } from "src/environments";

@Injectable({
    providedIn: 'root'
})

export class loginService {
    constructor(private httpCliente: HttpClient) {

    }
    private readonly baseUrl = environments["endpoint"];

    login(Email: string, Password: string) {
        return this.httpCliente.post<any>(`${this.baseUrl}/Account/CreateToken`, { Email: Email, Password: Password });
    }
}