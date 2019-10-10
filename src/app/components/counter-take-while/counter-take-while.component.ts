import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-counter-take-while',
  templateUrl: './counter-take-while.component.html'
})
export class CounterTakeWhileComponent implements OnInit, OnDestroy {

  count: number;
  counter: Observable<number>;

  private alive = true;

  ngOnInit() {
    console.log('[takeWhile] ngOnInit');

    this.counter = new Observable<number>(observer => {
      console.log('[takeWhile] Subscribed');

      let index = -1;
      const interval = setInterval(() => {
        index++;
        console.log(`[takeWhile] next: ${index}`);
        observer.next(index);
      }, 1000);

      // teardown
      return () => {
        console.log('[takeWhile] Teardown');
        clearInterval(interval);
      }
    });

    this.counter
    .pipe(takeWhile(() => this.alive))
    .subscribe(
      (value) => this.count = value,
      (error) => console.error(error),
      () => console.log('[takeWhile] complete')
    );
  }

  ngOnDestroy() {
    console.log('[takeWhile] ngOnDestory');
    this.alive = false;
  }
}