import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListPdfsComponent } from './pages/list-pdfs/list-pdfs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list-pdfs', component: ListPdfsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
