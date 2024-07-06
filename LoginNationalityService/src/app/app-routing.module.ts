import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainSiteComponent } from './components/main-site/main-site.component';

const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "main", component: MainSiteComponent},
  {path: "login", component: LoginComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
