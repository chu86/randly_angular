import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './components/start/start.component';
import { StartRoutingModule } from './start-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AngularSvgIconPreloaderModule } from 'angular-svg-icon-preloader';

@NgModule({
  declarations: [
    StartComponent
  ],
  imports: [
    CommonModule,
    StartRoutingModule,
    AngularSvgIconModule.forRoot(), // angular-svg-icon library module
    AngularSvgIconPreloaderModule.forRoot({
      configUrl: './assets/icons.json',
    }),
  ]
})
export class StartModule { }
