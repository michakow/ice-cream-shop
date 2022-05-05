import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { LoginPanelComponent } from './login-panel/login-panel.component';
import { environment } from 'src/environments/environment';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AppState } from './store/app.state';
import { userReducer } from './store/user';
import { HttpClientModule } from '@angular/common/http';
import { authReducer } from './store/auth';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { HeaderComponent } from './header/header.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ClientListComponent } from './client-list/client-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPanelComponent,
    HomeComponent,
    AdminComponent,
    ClientComponent,
    HeaderComponent,
    ClientListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot<AppState>({
      user: userReducer,
      auth: authReducer,
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
