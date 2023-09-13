import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/Models/Categoria';
import { Despesa } from 'src/app/Models/Despesa';
import { SelectModel } from 'src/app/Models/SelectModel';
import { SistemaFinanceiro } from 'src/app/Models/SistemaFinanceiro';
import { AuthService } from 'src/app/Services/auth.service';
import { CategoriaService } from 'src/app/Services/categoria.service';
import { DespesaService } from 'src/app/Services/despesa.service';
import { MenuService } from 'src/app/Services/menu.service';
import { MessageService } from 'src/app/Services/message.service';
import { SistemaService } from 'src/app/Services/sistema.service';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss']
})
export class DespesaComponent {
  constructor(public menuService: MenuService, public formBuilder: FormBuilder, public categoriaService: CategoriaService, public sistemaService: SistemaService, public authService: AuthService, public messageService: MessageService, public despesaService: DespesaService) {
  }

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  listCategorias = new Array<SelectModel>();
  categoriaSelect = new SelectModel();

  despesaForm: FormGroup;
  loading: boolean = false;

  color = "primary";
  checked = false;
  disabled = false;

  ngOnInit() {
    this.menuService.menuSelecionado = 4;

    this.despesaForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      data: ['', [Validators.required]],
      categoriaSelect: ['', [Validators.required]],
      sistemaSelect: ['', [Validators.required]],      
    });

    this.ListaSistemaUsuario();
  }

  onSistemaSelectChange() {
    this.categoriaSelect = new SelectModel();
    this.ListaCategoria();
  }

  dadosForm(){
    return this.despesaForm.controls
  }  

  enviar(){
    debugger
    this.loading = true
    var dados = this.dadosForm();

    let item = new Despesa();
    item.id = 0;
    item.nome = dados["name"].value;
    item.valor = dados["valor"].value;    
    item.idCategoria = parseInt(this.categoriaSelect.id);
    item.pago = this.checked;
    item.dataVencimento = dados["data"].value;

    this.despesaService.AdicionarDespesa(item)    
    .subscribe((response : any) => {
      this.despesaForm.reset();
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

}