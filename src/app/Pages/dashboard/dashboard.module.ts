import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { DasboardRoutingModule } from "./dashboard-routing.module";
import { NavbarModule } from "src/app/Components/navbar/navbar.module";
import { SidebarModule } from "src/app/Components/sidebar/sidebar.module";

@NgModule({
    providers: [],
    declarations: [DashboardComponent],
    imports: 
    [
        CommonModule, 
        DasboardRoutingModule, 
        NavbarModule, 
        SidebarModule
    ]
})

export class DashboardModule{}