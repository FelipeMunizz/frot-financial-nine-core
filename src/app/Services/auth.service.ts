import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AuthService{
    private usuarioAutenticadoPortal: boolean = false;
    private token : any;
    private user: any;

    constructor(private httpCliente: HttpClient){}

    CheckToken(){
        return Promise.resolve(true);
    }

    UsuarioAutenticado(status: boolean){
        localStorage.setItem('usuarioAutenticadoPortal', JSON.stringify(status));
        this.usuarioAutenticadoPortal = status;
    }

    UsuarioEstaAutenticado(): Promise<boolean>{
        this.usuarioAutenticadoPortal = localStorage.getItem('usuarioAutenticadoPortal') == 'true';
        return Promise.resolve(this.usuarioAutenticadoPortal)
    }

    SetToken(token: string){
        localStorage.setItem('token', token);
        this.token = token;
    }

    GetToken(){
        this.token = localStorage.getItem('token');
        return this.token;
    }

    LimparToken(){
        this.token = null;
        this.user = null;
    }

    LimparDadosUsuarios(){
        this.UsuarioAutenticado(false);
        this.LimparToken();
        localStorage.clear();
        sessionStorage.clear();
    }
}