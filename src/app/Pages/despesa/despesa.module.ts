import { NgModule } from "@angular/core";
import { DespesaComponent } from "./despesa.component";
import { CommonModule } from "@angular/common";
import { DespesaRoutingModule } from "./despesa-routing.module";
import { NavbarModule } from "src/app/Components/navbar/navbar.module";
import { SidebarModule } from "src/app/Components/sidebar/sidebar.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
    providers: [],
    declarations: [DespesaComponent],
    imports: 
    [
        CommonModule, 
        DespesaRoutingModule, 
        NavbarModule, 
        SidebarModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule
    ]
})

export class DespesaModule{}