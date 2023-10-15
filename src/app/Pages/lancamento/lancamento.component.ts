import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/Models/Categoria';
import { Lancamento } from 'src/app/Models/Lancamento';
import { SelectModel } from 'src/app/Models/SelectModel';
import { SistemaFinanceiro } from 'src/app/Models/SistemaFinanceiro';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { LancamentoService } from 'src/app/Services/lancamento.service';
import { MenuService } from 'src/app/Services/menu.service';
import { MessageService } from 'src/app/Services/message.service';
import { SistemaService } from 'src/app/Services/sistema.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.scss']
})
export class LancamentoComponent {
  constructor(public menuService: MenuService, public formBuilder: FormBuilder, public categoriaService: CategoriaService, public sistemaService: SistemaService, public authService: AuthService, public messageService: MessageService, public lancamentoService: LancamentoService) {
  }
  tipoTela: number = 1; //1- Listagem, 2- Cadastro, 3- Edição
  tableLancamentos: Array<Lancamento>;

  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;
  id: string;

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  listCategorias = new Array<SelectModel>();
  categoriaSelect = new SelectModel();
  listTipoLancamento= new Array<SelectModel>();
  tipoLancamentoSelected = new SelectModel();

  lancamentoForm: FormGroup;

  color = "primary";
  checked = false;
  disabled = false;

  ngOnInit() {
    this.menuService.menuSelecionado = 4;   

    this.configpag();
    this.ListaLancamentosUsuario();

    this.lancamentoForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      data: ['', [Validators.required]],
      categoriaSelect: ['', [Validators.required]],
      sistemaSelect: ['', [Validators.required]],      
      tipoLancamentoSelected: ['', [Validators.required]]
    });

    this.ListaLancamento();

    this.ListaSistemaUsuario();
  }

  onSistemaSelectChange() {
    this.categoriaSelect = new SelectModel();
    this.ListaCategoria();
  }

  dadosForm(){
    return this.lancamentoForm.controls
  }  

  enviar(){
    var dados = this.dadosForm();

    let item = new Lancamento();
    item.id = 0;
    item.nome = dados["name"].value;
    item.valor = dados["valor"].value;    
    item.idCategoria = parseInt(this.categoriaSelect.id);
    item.pago = this.checked;
    item.dataVencimento = dados["data"].value;
    item.tipoLancamento = parseInt(this.tipoLancamentoSelected.id);

    this.lancamentoService.AdicionarLancamento(item)    
    .subscribe((response : any) => {
      this.lancamentoForm.reset();
      this.ListaLancamentosUsuario();
      this.messageService.showSuccessMessage("Categoria adicionada com sucesso")
    }),
    (error) => this.messageService.showErrorMessage(error), () => {
    }
  }

  ListaCategoria(){
    this.categoriaService.ListarCategoriasUsuario(this.authService.GetEmailUser(), parseInt(this.sistemaSelect.id))
    .subscribe((response : Array<Categoria>) =>{
      var listCategorias = [];
      response.forEach(x => {
        var item = new SelectModel();
        item.id = x.id.toString();
        item.name = x.nome;

        listCategorias.push(item);
      });

      this.listCategorias = listCategorias;
    } );
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

  handleChangePago(item: any){
    this.checked = item.checked as boolean;
  }

  ListaLancamento(){
    var despesa = new SelectModel;
    despesa.id = '1';
    despesa.name = 'Despesa';

    var receita = new SelectModel;
    receita.id = '2';
    receita.name = 'Receita';
    this.listTipoLancamento = [despesa,receita]
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

  ListaLancamentosUsuario(){
    this.tipoTela = 1;
    this.lancamentoService.ListarLancamentosUsuario(this.authService.GetEmailUser()).subscribe((response: Array<Lancamento>) => {
      this.tableLancamentos = response;
    }, (error) => this.messageService.showErrorMessage(error), () => {})
  }

  cadastro(){
    this.tipoTela = 2;
    this.lancamentoForm.reset();
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