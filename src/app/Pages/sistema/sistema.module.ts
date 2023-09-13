import { NgModule } from "@angular/core";
import { SistemaComponent } from "./sistema.component";
import { CommonModule } from "@angular/common";
import { SistemaRoutingModule } from "./sistema-routing.module";
import { NavbarModule } from "src/app/Components/navbar/navbar.module";
import { SidebarModule } from "src/app/Components/sidebar/sidebar.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
    providers: [],
    declarations: [SistemaComponent],
    imports: 
    [
        CommonModule, 
        SistemaRoutingModule, 
        NavbarModule, 
        SidebarModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ]
})

export class SistemaModule{}