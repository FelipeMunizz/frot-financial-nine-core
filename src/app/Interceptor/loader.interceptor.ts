import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorSubject, Observable, catchError, finalize, map, throwError } from "rxjs";
import { AuthService } from "../Services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class HTTPStatus{
    private requestInFlight$: BehaviorSubject<boolean>;
    constructor(){
        this.requestInFlight$ = new BehaviorSubject<boolean>(false);
    }

    SetHttpStatus(inFlight: boolean){
        this.requestInFlight$.next(inFlight);
    }

    GetHttpStatus(): Observable<boolean>{
        return this.requestInFlight$.asObservable();
    }
}

@Injectable()
export class LoaderInterceptor implements HttpInterceptor{
    private _requests = 0;

    constructor(
        private spinner: NgxSpinnerService,
        private status: HTTPStatus,
        private authService: AuthService,
        private router: Router
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        ++this._requests;
        let headers;
        
        if(req.url.includes('api.ipify.org')){
            headers: new HttpHeaders({
                contentType: "false",
                processData: "false"
            })
        }else if(req.body instanceof FormData){
            headers: new HttpHeaders({
                contentType: "false",
                processData: "false",
                Authorization: "Bearer " + this.authService.GetToken()  
            })
        }else{
            headers = new HttpHeaders()
            .append("accept", "application/json")
            .append("Content-Type", "application/json")
            .append("Authorization", "Bearer " + this.authService.GetToken())
        }

        let request = req.clone({headers});
        this.status.SetHttpStatus(true);
        this.spinner.show();

        return next.handle(request).pipe(
            map((event) => {
                return event;
            }),
            catchError((error: Response) => {
                if(error.status === 401){
                    this.router.navigate(["/NaoAutorizado"])
                }
                return throwError(error)
            }),
            finalize(() => {
                this._requests;
                this.status.SetHttpStatus(this._requests > 0);
                this.status.GetHttpStatus().subscribe((status: boolean) => {
                    if(!status)
                    this.spinner.hide();
                });
            })
        );
    }  
    
}