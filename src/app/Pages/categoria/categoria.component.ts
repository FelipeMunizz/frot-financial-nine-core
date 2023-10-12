import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/Models/Categoria';
import { SelectModel } from 'src/app/Models/SelectModel';
import { SistemaFinanceiro } from 'src/app/Models/SistemaFinanceiro';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { MenuService } from 'src/app/Services/menu.service';
import { MessageService } from 'src/app/Services/message.service';
import { SistemaService } from 'src/app/Services/sistema.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  constructor(public menuService: MenuService, public formBuilder: FormBuilder, public sistemaService: SistemaService, public authService: AuthService, public categoriaService: CategoriaService, private messageService: MessageService, public dialog:MatDialog) {
  }

  tipoTela: number = 1; //1- Listagem, 2- Cadastro, 3- Edição
  tableListCategoria: Array<Categoria>;

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;
  id: string;

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  loading: boolean = false;

  categoriaForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 3;

    this.configpag();

    this.ListaCategoriaUsuario();

    this.categoriaForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      sistemaSelect: ['', [Validators.required]],
    })

    this.ListaSistemaUsuario();
  }

  dadosForm(){
    return this.categoriaForm.controls
  }

  enviar(){
    
    this.loading = true;
    var dados = this.dadosForm();

    let item = new Categoria();
    item.nome = dados["name"].value;
    item.id = 0;
    item.idSistema = parseInt(this.sistemaSelect.id)

    this.categoriaService.AdicionarCategoria(item)    
    .subscribe((response : any) => {
      this.categoriaForm.reset();
      this.messageService.showSuccessMessage("Categoria adicionada com sucesso")
    }),
    (error) => this.messageService.showErrorMessage(error), () => {
    }
    this.loading = false;
  }

  ListaCategoriaUsuario(){
    this.loading = true;
    this.tipoTela = 1;
    this.categoriaService.ListarCategoriasUsuario(this.authService.GetEmailUser(), 1).subscribe((response: Array<Categoria>) => {
      this.tableListCategoria = response;
    }, (error) => this.messageService.showErrorMessage(error), () => {})
    this.loading = false;
  }

  ListaSistemaUsuario(){
    this.sistemaService.ListaSistemaUsuario(this.authService.GetEmailUser())
    .subscribe((response : Array<SistemaFinanceiro>) =>{
      var listSistemaFinanceiro = [];
      response.forEach(x => {
        var item = new SelectModel();
        item.id = x.id.toString();
        item.name = x.nome;

        listSistemaFinanceiro.push(item);
      });

      this.listSistemas = listSistemaFinanceiro;
    } )
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

  cadastro(){
    this.tipoTela = 2;
    this.categoriaForm.reset();
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