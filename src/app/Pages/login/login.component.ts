import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginService } from './../../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public formBuilder: FormBuilder, private router: Router, private loginService: loginService) {

  }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]]
      }
    )
  }

  get dadosForm() {
    return this, this.loginForm.controls
  }

  loginUser() {
    this.loginService.login(this.dadosForm["email"].value, this.dadosForm["senha"].value).subscribe(
      token=>{
        localStorage.setItem('token', token);
        this.router.navigate(['/dashboard'])
      },
      error=>{
        console.error(error)
      }
    )
  }
}
