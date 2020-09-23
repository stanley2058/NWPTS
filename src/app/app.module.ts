import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// <-- Material Import -->
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule, MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

// <-- Firebase Import -->
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// <-- Component Import -->
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ClassroomComponent } from './classroom/classroom.component';


const firebaseConfig = {
  apiKey: "AIzaSyDzs9YIaf3Ncmgi0vhkePqCxFAOwplyec4",
  authDomain: "nwpts-afddc.firebaseapp.com",
  databaseURL: "https://nwpts-afddc.firebaseio.com",
  projectId: "nwpts-afddc",
  storageBucket: "nwpts-afddc.appspot.com",
  messagingSenderId: "1078296659946",
  appId: "1:1078296659946:web:4ae0887380c8d4fadb9493",
  measurementId: "G-CP5ZW5WNX6"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    ClassroomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTabsModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "zh-Hant" },
    MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
