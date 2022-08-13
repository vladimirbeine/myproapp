import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'movies',
        loadChildren: () => import('../../pages/movies/movies.module').then( m => m.MoviesPageModule)
      },
      {
        path: 'blog',
        loadChildren: () => import('../../pages/blog/blog.module').then( m => m.BlogPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../../pages/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'lenmbo',
        loadChildren: () => import('../../pages/lenmbo/lenmbo.module').then( m => m.LenmboPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
