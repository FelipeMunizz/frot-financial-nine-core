import { NgModule } from "@angular/core";
import { CategoriaComponent } from "./categoria.component";
import { CommonModule } from "@angular/common";
import { CategoriaRoutingModule } from "./categoria-routing.module";
import { NavbarModule } from "src/app/Components/navbar/navbar.module";
import { SidebarModule } from "src/app/Components/sidebar/sidebar.module";

@NgModule({
    providers: [],
    declarations: [CategoriaComponent],
    imports: 
    [
        CommonModule, 
        CategoriaRoutingModule, 
        NavbarModule, 
        SidebarModule
    ]
})

export class CategoriaModule{}