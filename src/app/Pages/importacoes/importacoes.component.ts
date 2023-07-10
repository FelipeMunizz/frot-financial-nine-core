import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from 'src/app/Models/SelectModel';
import { MenuService } from 'src/app/Services/menu.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './importacoes.component.html',
  styleUrls: ['./importacoes.component.scss']
})
export class ImportacoesComponent {
  constructor(public menuService: MenuService, public formBuilder: FormBuilder) {
  }
  @ViewChild('fileInput') fileInput: any;

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  handleFileInputChange(event: any): void {
    debugger
    const file = event.target.files[0];
    // Faça o que for necessário com o arquivo selecionado pelo usuário
    console.log(file);
  }

}