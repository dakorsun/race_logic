import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routesMapped } from './routes';

@NgModule({
  imports: [RouterModule.forRoot(
    routesMapped
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor() {
  }

}
