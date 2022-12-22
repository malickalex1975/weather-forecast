import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule, TranslateModule, RouterModule, LetModule, MaterialModule
  ],
  exports:[HeaderComponent,FooterComponent]
})
export class CoreModule { }
