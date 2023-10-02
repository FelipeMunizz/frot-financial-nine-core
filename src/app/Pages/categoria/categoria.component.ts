import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaSelecaoModalComponent } from 'src/app/Components/sistema-selecao-modal/sistema-selecao-modal.component';
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

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  loading: boolean = false;

  categoriaForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 3;

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

  openSistemaSelecaoModal() {
    const dialogRef = this.dialog.open(SistemaSelecaoModalComponent, {
      width: '400px', 
      data: { sistemas: this.listSistemas }
    });
  
    dialogRef.afterClosed().subscribe((selectedSistema: SelectModel) => {
      if (selectedSistema) {
        localStorage.setItem('sistemaSelected', selectedSistema.id)
      }
    });
  }
  

}