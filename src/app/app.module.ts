import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgImageSliderModule } from 'ng-image-slider';
import { ImgslideComponent } from './imgslide/imgslide.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { LogincardComponent } from './logincard/logincard.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { UserbuttonComponent } from './userbutton/userbutton.component';
import { LoggedInToolbarComponent } from './logged-in-toolbar/logged-in-toolbar.component';
import { NotLoggedInToolbarComponent } from './not-logged-in-toolbar/not-logged-in-toolbar.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { LoggedPhoneInToolbarComponent } from './logged-phone-in-toolbar/logged-phone-in-toolbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DatapageComponent } from './datapage/datapage.component';
import {MatSelectModule} from '@angular/material/select';
import { DataprofComponent } from './dataprof/dataprof.component';
import { SideNavService } from './side-nav.service';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FilterPipe } from './filter.pipe';
import { DatamoduleComponent } from './datamodule/datamodule.component';
import { ProfaddformComponent } from './profaddform/profaddform.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import { StartformComponent } from './startform/startform.component';
import { BuildpageComponent } from './buildpage/buildpage.component';
import {MatGridListModule} from '@angular/material/grid-list';

import { HttpClientModule } from '@angular/common/http';
import { DatafiliereComponent } from './datafiliere/datafiliere.component';
import { AddfiliereComponent } from './addfiliere/addfiliere.component';
import { AddprofComponent } from './addprof/addprof.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    ToolbarComponent,
    ImgslideComponent,
    LogincardComponent,
    UserbuttonComponent,
    LoggedInToolbarComponent,
    NotLoggedInToolbarComponent,
    LoggedPhoneInToolbarComponent,
    PageNotFoundComponent,
    DatapageComponent,
    DataprofComponent,
    FilterPipe,
    DatamoduleComponent,
    ProfaddformComponent,
    StartformComponent,
    BuildpageComponent,
    DatafiliereComponent,
    AddfiliereComponent,
    AddprofComponent,
  ],
  entryComponents: [LogincardComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    NgImageSliderModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatGridListModule,
    ReactiveFormsModule
  ],
  providers: [
    SideNavService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
