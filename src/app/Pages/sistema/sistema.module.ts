import { NgModule } from "@angular/core";
import { SistemaComponent } from "./sistema.component";
import { CommonModule } from "@angular/common";
import { SistemaRoutingModule } from "./sistema-routing.module";
import { NavbarModule } from "src/app/Components/navbar/navbar.module";
import { SidebarModule } from "src/app/Components/sidebar/sidebar.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgxPaginationModule } from "ngx-pagination";
import {MatIconModule} from '@angular/material/icon';
import { NgSelectModule } from "@ng-select/ng-select";

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
        MatSortModule,
        NgxPaginationModule,
        FormsModule,
        NgSelectModule,
        MatIconModule
    ]
})

export class SistemaModule{}