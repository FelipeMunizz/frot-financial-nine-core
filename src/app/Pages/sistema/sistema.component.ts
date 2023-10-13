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

  tipoTela: number = 1; //1- Listagem, 2- Cadastro, 3- Edição
  tableListSistemas: Array<SistemaFinanceiro>;

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;
  id: string;

  sistemaForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 2;
    this.configpag();
    this.ListaSistemaUsuario();

    this.sistemaForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    })
  }

  dadosForm(){
    return this.sistemaForm.controls
  }

  enviar(){
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
  }

  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina

    };
  }

  gerarIdParaConfigDePaginacao(){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  ListaSistemaUsuario(){
    this.tipoTela = 1;
    this.sistemaService.ListaSistemaUsuario(this.authService.GetEmailUser()).subscribe((response: Array<SistemaFinanceiro>) => {
      this.tableListSistemas = response;
    }, (error) => this.messageService.showErrorMessage(error), () => {})
  }

  cadastro(){
    this.tipoTela = 2;
    this.sistemaForm.reset();
  }

  mudarItemsPorPage(){
    this.page = 1;
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itemsPorPagina;
  }

  mudarPage(event: any){
    this.page = event;
    this.config.currentPage = this.page;
  }
}