import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {SelectPageComponent} from './select-page/select-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'selects',
    component: SelectPageComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
