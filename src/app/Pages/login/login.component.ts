import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginService } from './../../Services/login.service';
import { AuthService } from 'src/app/Services/auth.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    public formBuilder: FormBuilder, 
    private router: Router, 
    private loginService: loginService,
    public authService: AuthService,
    public messageService: MessageService) {}

  loginForm: FormGroup;
  loading: boolean = false;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]]
      }
    )

    const senha  = document.getElementById('senha');
    senha.addEventListener('keydown', (event) => {
      if(event.key === 'Enter'){
        debugger
        event.preventDefault();
        this.loginUser();
      }      
    })
  }

  get dadosForm() {
    localStorage.setItem('emailUsuario', this.loginForm.controls['email'].value);
    return this, this.loginForm.controls
  }

  loginUser() {
    this.loading = true;
    this.loginService.login(this.dadosForm["email"].value, this.dadosForm["senha"].value).subscribe(
      token=>{
        this.authService.SetToken(token);
        this.authService.UsuarioAutenticado(true);    
        this.loading = false;    
        this.router.navigate(['/dashboard'])
      },
      error=>{
        this.loading = false;
       this.messageService.showErrorMessage("Erro ao efetuar o login")
      }
    )
  }
}
