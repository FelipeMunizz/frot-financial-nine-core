import { NgModule } from "@angular/core";
import { LancamentoComponent } from "./lancamento.component";
import { CommonModule } from "@angular/common";
import { NavbarModule } from "src/app/Components/navbar/navbar.module";
import { SidebarModule } from "src/app/Components/sidebar/sidebar.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import{MatSlideToggleModule} from "@angular/material/slide-toggle"
import { lancamentoRoutingModule } from "./lancamento-routing.module";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { NgxPaginationModule } from "ngx-pagination";
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';

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
        MatSlideToggleModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        NgxPaginationModule,
        MatIconModule,
        MatChipsModule
    ]
})

export class LancamentoModule{}