import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectModel } from 'src/app/Models/SelectModel';

@Component({
  selector: 'app-sistema-selecao-modal',
  templateUrl: './sistema-selecao-modal.component.html',
  styleUrls: ['./sistema-selecao-modal.component.scss']
})
export class SistemaSelecaoModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SistemaSelecaoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sistemas: SelectModel[] }
  ) {}

  selectedSistema: SelectModel | null = null;

  onSistemaSelected() {    
    this.dialogRef.close(this.selectedSistema);
  }
}