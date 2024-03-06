import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ConferenciaComponent } from './components/conferencia/conferencia.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'conferencia', component: ConferenciaComponent },
];
