import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, CoreModule, AuthRoutingModule, FormsModule],
})
export class AuthModule {}
