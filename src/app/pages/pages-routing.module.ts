import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      //component: ECommerceComponent,
    },
    {
      path: 'security',
      loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    },
    {
      path: 'permissions',
      loadChildren: () => import('./permissions/permissions.module').then(m => m.PermissionsModule),
    },
    {
      path: 'libraries',
      loadChildren: () => import('./libraries/libraries.module').then(m => m.LibrariesModule),
    },
    {
      path: 'categories',
      loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
    },
    {
      path: 'archives',
      loadChildren: () => import('./archives/archives.module').then(m => m.ArchivesModule),
    },
    {
      path: 'printers',
      loadChildren: () => import('./printers/printers.module').then(m => m.PrintersModule),
    },
    {
      path: 'reservations',
      loadChildren: () => import('./reservations/reservations.module').then(m => m.ReservationsModule),
    },
    {
      path: 'profiles',
      loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule),
    },
    {
      path: 'tasks',
      loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
