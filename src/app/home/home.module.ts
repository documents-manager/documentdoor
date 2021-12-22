import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEntityMenuComponent } from './components/create-entity-menu/create-entity-menu.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, CreateEntityMenuComponent, SearchComponent],
  imports: [CommonModule]
})
export class HomeModule {}
