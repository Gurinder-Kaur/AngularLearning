import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ArtDetailComponent } from './home/art-detail/art-detail.component';
import { ArtEditComponent } from './home/art-edit/art-edit.component';
import { ArtStartComponent } from './home/art-start/art-start.component';
import { ArtResolverService } from './home/art.resolver.service';
import { HomeComponent } from './home/home.component';
import { MypageComponent } from './mypage/mypage.component';

const routes: Routes = [
  {path: '', redirectTo:'/arts', pathMatch: 'full'},
  {path: 'arts', 
  component: HomeComponent,
  canActivate: [AuthGuard],
  children:[
      {path: '', component: ArtStartComponent},
      {path: 'new', component:ArtEditComponent},
      {path: ':id', component:ArtDetailComponent, resolve:[ArtResolverService]},
      {path: ':id/edit', component:ArtEditComponent, resolve:[ArtResolverService]}
  ]},
  {path: 'mypage', component: MypageComponent},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
