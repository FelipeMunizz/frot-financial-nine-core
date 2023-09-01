import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaFinanceiro } from 'src/app/Models/SistemaFinanceiro';
import { MenuService } from 'src/app/Services/menu.service';
import { SistemaService } from 'src/app/Services/sistema.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent {

  constructor(public menuService: MenuService, public formBuilder: FormBuilder, public sistemaService: SistemaService) {
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
    item.Nome = dados["name"].value;
    item.Id = 0;
    item.Mes = 0;
    item.Ano = 0;
    item.GerarCopiaDespesa = true;
    item.MesCopia = 0;
    item.AnoCopia = 0;
    
    this.sistemaService.AdicionarSistemaFinanceiro(item)
    .subscribe((response : any) => {
      this.sistemaForm.reset();

      this.sistemaService.CadastrarUsuarioSistemaFinanceiro(response.id, localStorage.getItem("emailUsuario"))
      .subscribe((response : any) => {
      }),(error) => console.log(error), () => {
        this.loading = false;
      }
    }),
    (error) => console.log(error), () => {
      this.loading = false;
    }

  }

}