import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'profile-view',
    loadChildren: () => import('./profile-view/profile-view.module').then( m => m.ProfileViewPageModule)
  },
  {
    path: 'profile-update',
    loadChildren: () => import('./profile-update/profile-update.module').then( m => m.ProfileUpdatePageModule)
  },
  {
    path: 'ticket-new',
    loadChildren: () => import('./ticket-new/ticket-new.module').then( m => m.TicketNewPageModule)
  },
  {
    path: 'ticket-list',
    loadChildren: () => import('./ticket-list/ticket-list.module').then( m => m.TicketListPageModule)
  },
  {
    path: 'ticket-view',
    loadChildren: () => import('./ticket-view/ticket-view.module').then( m => m.TicketViewPageModule)
  },
  {
    path: 'ticket-update',
    loadChildren: () => import('./ticket-update/ticket-update.module').then( m => m.TicketUpdatePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
// const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
//   },
//   // {
//   //   path: 'tabs',
//   //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
//   // },
//   {
//     path: 'register',
//     loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
//   },
//   // {
//   //   path: 'dashboard',
//   //   loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
//   // },
//   {
//     path: 'ticket-list',
//     loadChildren: () => import('./ticket-list/ticket-list.module').then( m => m.TicketListPageModule)
//   },
//   {
//     path: 'ticket-view',
//     loadChildren: () => import('./ticket-view/ticket-view.module').then( m => m.TicketViewPageModule)
//   },
//   {
//     path: 'ticket-update',
//     loadChildren: () => import('./ticket-update/ticket-update.module').then( m => m.TicketUpdatePageModule)
//   },
//   {
//     path: 'profile-view',
//     loadChildren: () => import('./profile-view/profile-view.module').then( m => m.ProfileViewPageModule)
//   },
//   {
//     path: 'profile-update',
//     loadChildren: () => import('./profile-update/profile-update.module').then( m => m.ProfileUpdatePageModule)
//   }
//  ];
//  @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
//   ],
//   exports: [RouterModule]
//  })

export class AppRoutingModule {}
