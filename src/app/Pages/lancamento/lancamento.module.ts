import { NgModule } from "@angular/core";
import { LancamentoComponent } from "./lancamento.component";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "src/app/Components/navbar/navbar.module";
import { SidebarModule } from "src/app/Components/sidebar/sidebar.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import{MatSlideToggleModule} from "@angular/material/slide-toggle"
import { lancamentoRoutingModule } from "./lancamento-routing.module";

@NgModule({
    providers: [],
    declarations: [LancamentoComponent],
    imports: 
    [
        CommonModule, 
        lancamentoRoutingModule, 
        NavbarModule, 
        SidebarModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        MatSlideToggleModule
    ]
})

export class LancamentoModule{}