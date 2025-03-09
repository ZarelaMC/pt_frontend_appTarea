import { Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';

import { TareaComponent } from './components/tarea/tarea.component';



export const routes: Routes = [
  
    { path: '', component: IndexComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ];
  
