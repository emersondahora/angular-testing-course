import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("Async Testing Examples", () =>{

  it('Asynchronous test example with Jasmine done()', (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      test = true;
      console.log('running assertions');
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it('Asynchronous test example - setTimeOut', fakeAsync(() => {
    let test = false;
    setTimeout(() => {
      test = true;
    }, 1000);
    //tick(1000);
    flush();

    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - plain Promise', fakeAsync(() => {
    let test = false;

    console.log("Creating promise");

    Promise.resolve().then(() => {
      console.log('Test = true')
      test = true;
    })
    flushMicrotasks();
    console.log('Expects')
    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - Observables', fakeAsync(() => {
    let test = false;

    console.log("Creating Observable");

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true
    })
    tick(1000);
    expect(test).toBeTruthy();
  }));
})
