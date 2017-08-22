import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTodoModalPage } from './add-todo-modal';

@NgModule({
  declarations: [
    AddTodoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTodoModalPage),
  ],
})
export class AddTodoModalPageModule {}
