import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProjectManagersComponent } from "./project-managers.component";
import { AllProjectManagersComponent } from "./pages/all-project-managers/all-project-managers.components";

const routes: Routes = [
  {
    path: '',
    component: ProjectManagersComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllProjectManagersComponent },
      { path: '**', redirectTo: 'error/404' },
    ],
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectManagersRoutingModule { }