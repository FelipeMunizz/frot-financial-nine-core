import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaFinanceiro } from 'src/app/Models/SistemaFinanceiro';
import { AuthService } from 'src/app/Services/auth.service';
import { MenuService } from 'src/app/Services/menu.service';
import { MessageService } from 'src/app/Services/message.service';
import { SistemaService } from 'src/app/Services/sistema.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent {

  constructor(public menuService: MenuService, public formBuilder: FormBuilder, public sistemaService: SistemaService, private messageService: MessageService, public authService: AuthService) {
  }

  sistemaForm: FormGroup;
  loading: boolean = false;

  ngOnInit() {
    this.menuService.menuSelecionado = 2;

    this.sistemaForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    })
  }

  dadosForm(){
    return this.sistemaForm.controls
  }

  enviar(){
    this.loading = true;
    var dados = this.dadosForm();

    let item = new SistemaFinanceiro();
    item.nome = dados["name"].value;
    item.id = 0;
    item.mes = 0;
    item.ano = 0;
    item.gerarCopiaDespesa = true;
    item.mesCopia = 0;
    item.anoCopia = 0;
    
    this.sistemaService.AdicionarSistemaFinanceiro(item)    
    .subscribe((response : any) => {
      this.sistemaForm.reset();
      this.sistemaService.CadastrarUsuarioSistemaFinanceiro(response.id, this.authService.GetEmailUser())
      .subscribe((response : any) => {
        this.messageService.showSuccessMessage('Sistema cadastrado com sucesso')
      }),(error) => this.messageService.showErrorMessage(error), () => {
      }
    }),
    (error) => this.messageService.showErrorMessage(error), () => {
    }
    this.loading = false;
  }

}