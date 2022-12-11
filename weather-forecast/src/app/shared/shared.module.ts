import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChooseDatePipe } from './pipes/choose-date.pipe';

@NgModule({
  declarations: [
    ChooseDatePipe
  ],
  imports: [CommonModule,FormsModule],
  exports: [ FormsModule,ChooseDatePipe],
})
export class SharedModule {}
