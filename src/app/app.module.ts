import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MypageComponent } from './mypage/mypage.component';
import { HomeComponent } from './home/home.component';
import { ArtListComponent } from './home/art-list/art-list.component';
import { ArtDetailComponent } from './home/art-detail/art-detail.component';
import { ArtItemComponent } from './home/art-list/art-item/art-item.component';
import { DropdownDirective } from './Directives/download.directive';
import { ArtStartComponent } from './home/art-start/art-start.component';
import { ArtEditComponent } from './home/art-edit/art-edit.component'
import { ArtService } from './art.service';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './auth/auth.service';
import { LoadingComponent } from './loading/loading.component';
import { AuthInterceptorService } from './auth/auth.interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MypageComponent,
    HomeComponent,
    ArtListComponent,
    ArtDetailComponent,
    ArtItemComponent,
    DropdownDirective,
    ArtStartComponent,
    ArtEditComponent,
    AuthComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ArtService,AuthService,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
