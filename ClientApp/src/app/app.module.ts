import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule,MatButtonModule,MatIconModule } from '@angular/material/'
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent} from './nav-menu/cart/cart.component';

import { ProcessHttpmsgService } from './services/process-httpmsg.service';
import { DishService } from './services/dish.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from './services/cart.service';
import { UserService } from './services/user.service';
import { AddressService } from './services/address.service';

import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { baseURL } from './shared/baseUrl';
import { AdminComponent } from './admin/admin.component';
import { OrderComponent } from './admin/order/order.component';
import { DishComponent } from './admin/dish/dish.component'


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MenuComponent,
    CartComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    CheckoutComponent,
    AdminComponent,
    OrderComponent,
    DishComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'menu', component: MenuComponent },
      { path: 'registration', component: RegistrationComponent},
      { path: 'login', component: LoginComponent},
      { path: 'checkout', component: CheckoutComponent},
      { path: 'admin',component:AdminComponent,children:[
        {
          path: 'order',
          component: OrderComponent
       },
       {
          path: 'dish',
          component: DishComponent
       }
      ]}
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    DishService,
    ProcessHttpmsgService,
    CartService,
    UserService,
    AddressService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    },
    { provide: 'BaseURL', useValue: baseURL}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CartComponent
 ]
})
export class AppModule { }
