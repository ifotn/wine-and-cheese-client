import { Routes } from '@angular/router';
import { CheeseComponent } from './components/cheese/cheese.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';

export const routes: Routes = [
    { path: 'cheese', component: CheeseComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent},
    { path: '', component: HomeComponent}
];
