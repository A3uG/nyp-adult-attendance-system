import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; //Routing
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component'; 

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginFormComponent } from './login-form/login-form.component';

import { UserService } from './user.service';
import { AuthguardGuard } from './authguard.guard';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { EventsRegComponent } from './events-reg/events-reg.component';
import { EventslistComponent } from './eventslist/eventslist.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventUpdateComponent } from './event-update/event-update.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { QRCodeModule } from 'angularx-qrcode';
import { AmScanComponent } from './am-scan/am-scan.component';
import { PmScanComponent } from './pm-scan/pm-scan.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { AdminRegComponent } from './admin-reg/admin-reg.component';
import { AdminlistComponent } from './adminlist/adminlist.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserUploadComponent } from './user-upload/user-upload.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule, //Routing
  ZXingScannerModule,
  QRCodeModule,
  ReactiveFormsModule,
  Ng2SearchPipeModule,

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginFormComponent,
    EventsRegComponent,
    EventslistComponent,
    EventDetailsComponent,
    EventUpdateComponent,
    UserCreationComponent,
    AmScanComponent,
    PmScanComponent,
    UserUpdateComponent,
    AdminRegComponent,
    AdminlistComponent,
    AdminUpdateComponent,
    UserUploadComponent,

  ],
  providers: [UserService, AuthguardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
