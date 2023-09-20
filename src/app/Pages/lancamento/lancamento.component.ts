import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumTipoLancamento } from 'src/app/Enums/enumTipoLancamento';
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

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  listCategorias = new Array<SelectModel>();
  categoriaSelect = new SelectModel();
  listTipoLancamento= new Array<SelectModel>();
  tipoLancamentoSelected = new SelectModel();

  lancamentoForm: FormGroup;
  loading: boolean = false;

  color = "primary";
  checked = false;
  disabled = false;

  ngOnInit() {
    this.menuService.menuSelecionado = 4;   

    this.lancamentoForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      data: ['', [Validators.required]],
      categoriaSelect: ['', [Validators.required]],
      sistemaSelect: ['', [Validators.required]],      
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
    debugger;
    this.loading = true;
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
      this.messageService.showSuccessMessage("Categoria adicionada com sucesso")
    }),
    (error) => this.messageService.showErrorMessage(error), () => {
    }

    this.loading = false;
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
    this.listTipoLancamento = Object.keys(EnumTipoLancamento)
      .filter(value => !isNaN(Number(value)))
      .map(key => ({
        id: EnumTipoLancamento[key],
        name: EnumTipoLancamento[key]
      }));
  }

}