import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeroesComponent } from './page/heroes/heroes.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-rout';
import { IronmarnComponent } from './page/ironmarn/ironmarn.component';
import { ApiServiceService } from './service/api-service.service';

import { AngularFireModule } from 'angularfire2';
// for AngularFireDatabase
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { ContentComponent } from './page/content/content.component';
import { UserComponent } from './page/user/user.component';
import { UserService } from './service/user.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './page/nav/nav.component';
import { ImageUploadModule } from "angular2-image-upload";
import { Ng2ImgMaxModule } from 'ng2-img-max';

import {ButtonModule,SplitButtonModule,AccordionModule} from 'primeng/primeng';
import { LoginComponent } from './page/login/login.component';
import { ApproverComponent } from './page/approver/approver.component';
import { ApproverService } from './service/approver.service';
import { EditApproverComponent } from './page/edit-approver/edit-approver.component';
import { UploadsService } from './service/uploads.service';
import { SidebarComponent } from './page/sidebar/sidebar.component';
import { ApprovePersonalComponent } from './page/approve-personal/approve-personal.component';
import { PersonalComponent } from './page/personal/personal.component';
import { PersonalService } from './service/personal.service';

import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './page/profile/profile.component';
import { NotifyService } from './service/notify.service';
import { ProfileApproverComponent } from './page/profile-approver/profile-approver.component';
import { LoadingModule } from 'ngx-loading';
import { ApiYoutubePipe } from './pipe/api-youtube.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    IronmarnComponent,
    ContentComponent,
    UserComponent,
    NavComponent,
    LoginComponent,
    ApproverComponent,
    EditApproverComponent,
    SidebarComponent,
    ApprovePersonalComponent,
    PersonalComponent,
    ProfileComponent,
    ProfileApproverComponent,
    ApiYoutubePipe       
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp({
        apiKey: "AIzaSyBM0RzKCpN-wuGueTi5KjSaSFQgR3p1Kug",
        authDomain: "blockchain-a.firebaseapp.com",
        databaseURL: "https://blockchain-a.firebaseio.com",
        projectId: "blockchain-a",
        storageBucket: "blockchain-a.appspot.com",
        messagingSenderId: "209725170616"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ImageUploadModule.forRoot(),
    Ng2ImgMaxModule,
    ToastModule.forRoot(),
    LoadingModule
  ],
  providers: [
    ApiServiceService,
    UserService,
    ApproverService,
    UploadsService,
    PersonalService,
    NotifyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
