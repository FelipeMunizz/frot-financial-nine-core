import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) { }

  showSuccessMessage(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 10000;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'end';
    config.panelClass = 'success-snackbar';

    this.snackBar.open(message, 'Fechar', config);
  }

  showErrorMessage(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 10000;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'end';
    config.panelClass = 'error-snackbar';

    this.snackBar.open(message, 'Fechar', config);
  }
}