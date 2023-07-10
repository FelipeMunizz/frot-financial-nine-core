import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "src/app/Components/navbar/navbar.module";
import { SidebarModule } from "src/app/Components/sidebar/sidebar.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { ImportacoesComponent } from "./importacoes.component";
import { ImportacoesRoutingModule } from "./importacoes-routing.module";

@NgModule({
    providers: [],
    declarations: [ImportacoesComponent],
    imports: 
    [
        CommonModule, 
        ImportacoesRoutingModule, 
        NavbarModule, 
        SidebarModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule
    ]
})

export class ImportacoesModule{}