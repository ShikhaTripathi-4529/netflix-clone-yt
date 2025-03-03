import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
    { path: 'browse', loadComponent:()=> import('./pages/browse/browse.component').then(m => m.BrowseComponent)},
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)},
    { path: '**', redirectTo: 'login' } // Wildcard route
];