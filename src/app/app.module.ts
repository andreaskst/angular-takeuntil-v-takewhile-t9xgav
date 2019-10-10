import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { CounterTakeUntilComponent } from './components/counter-take-until/counter-take-until.component';
import { CounterTakeWhileComponent } from './components/counter-take-while/counter-take-while.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, CounterTakeUntilComponent, CounterTakeWhileComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
