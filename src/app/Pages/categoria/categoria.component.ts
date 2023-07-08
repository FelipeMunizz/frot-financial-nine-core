import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from 'src/app/Models/SelectModel';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {
  constructor(public menuService: MenuService, public formBuilder: FormBuilder) {
  }

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();

  categoriaForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 3;

    this.categoriaForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      sistemaSelect: ['', [Validators.required]],
    })
  }

  dadosForm(){
    return this.categoriaForm.controls
  }

  enviar(){
    debugger
    var dados = this.dadosForm()
  }

}