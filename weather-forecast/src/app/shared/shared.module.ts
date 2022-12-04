import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './pipes/translate.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TranslatePipe],
  imports: [CommonModule,FormsModule],
  exports: [TranslatePipe, FormsModule],
})
export class SharedModule {}
