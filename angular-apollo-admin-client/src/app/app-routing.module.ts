import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  // { path: '', component: HomePageComponent},
  { path: 'login', component: LoginPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
