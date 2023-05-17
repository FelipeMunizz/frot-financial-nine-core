import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { DasboardRoutingModule } from "./dashboard-routing.module";

@NgModule({
    providers: [],
    declarations: [DashboardComponent],
    imports: [CommonModule, DasboardRoutingModule]
})

export class DashboardModule{}