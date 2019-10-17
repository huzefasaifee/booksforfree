import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookcategoryComponent } from './bookcategory/bookcategory.component';
import { CategorybookComponent } from './categorybook/categorybook.component';


const routes: Routes = [{path:'', redirectTo: '/home', pathMatch: 'full'},
{path:'books/:bookCategory', component:CategorybookComponent},
{path:'home', component:BookcategoryComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
