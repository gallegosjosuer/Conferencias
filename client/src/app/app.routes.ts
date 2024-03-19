import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { ConferenceCrudComponent } from './components/conference-crud/conference-crud.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'conference', component: ConferenceComponent },
    { path: 'conference-crud', component: ConferenceCrudComponent },
];
