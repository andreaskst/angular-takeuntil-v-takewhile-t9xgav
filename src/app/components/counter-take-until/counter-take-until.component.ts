import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-counter-take-until',
  templateUrl: './counter-take-until.component.html'
})
export class CounterTakeUntilComponent implements OnInit, OnDestroy {

  count: number;
  counter: Observable<number>;

  private unsubscribe: Subject<void> = new Subject();

  ngOnInit() {
    console.log('[takeUntil] ngOnInit');

    this.counter = new Observable<number>(observer => {
      console.log('[takeUntil] Subscribed');

      let index = -1;
      const interval = setInterval(() => {
        index++;
        console.log(`[takeUntil] next: ${index}`);
        observer.next(index);
      }, 1000);

      // teardown
      return () => {
        console.log('[takeUntil] Teardown');
        clearInterval(interval);
      }
    });

    this.counter
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (value) => this.count = value,
      (error) => console.error(error),
      () => console.log('[takeUntil] complete')
    );
  }

  ngOnDestroy() {
    console.log('ngOnDestory');
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}