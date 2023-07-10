import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ImportacoesComponent } from "./importacoes.component";

const routes: Routes = [{
    path: '',
    component: ImportacoesComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ImportacoesRoutingModule{}