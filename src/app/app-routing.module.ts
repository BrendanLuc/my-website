import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ResumeComponent } from './resume/resume.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProjectsComponent } from './projects/projects.component'
import { PassionsComponent } from './passions/passions.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'

      },
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'about',
        component: AboutMeComponent
      },
      {
        path: 'resume',
        component: ResumeComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },      {
        path: 'passions',
        component: PassionsComponent
      }
    ]
  },
  {
    path : '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
