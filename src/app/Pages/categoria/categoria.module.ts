import { NgModule } from "@angular/core";
import { CategoriaComponent } from "./categoria.component";
import { CommonModule } from "@angular/common";
import { CategoriaRoutingModule } from "./categoria-routing.module";
import { NavbarModule } from "src/app/Components/navbar/navbar.module";
import { SidebarModule } from "src/app/Components/sidebar/sidebar.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    providers: [],
    declarations: [CategoriaComponent],
    imports: 
    [
        CommonModule, 
        CategoriaRoutingModule, 
        NavbarModule, 
        SidebarModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatDialogModule,
        MatButtonModule
    ]
})

export class CategoriaModule{}