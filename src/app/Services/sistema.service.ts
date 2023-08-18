import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environments } from "src/environments";

@Injectable({
    providedIn: 'root'
})

export class SistemaService{
    constructor(private httpClient : HttpClient){}

    private readonly baseUrl = environments["endpoint"]
}