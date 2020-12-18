# @drizm/loader

A material design loading indicator for Angular.

## Features
- Listens to Angular's Router navigation events by default
- Listens to all XHR requests by default
- both above features can be easily disabled when importing `LoaderModule`
- Provides the option to add custom loading behavior via `LoaderService`

## Installation
```shell
npm install @drizm/loader
```

## Usage
Import `LoaderModule` into your root module (probably AppModule):
```typescript
import { NgModule } from '@angular/core';
import { LoaderModule } from '@drizm/loader';

@NgModule({
  imports: [
    // ...
    LoaderModule.forRoot()
  ]
})
export class AppModule { }
```

You can also provide custom configuration to the module (the values inserted in this example are the defaults):
```typescript
import { NgModule } from '@angular/core';
import { LoaderModule } from '@drizm/loader';

@NgModule({
  imports: [
    // ...
    LoaderModule.forRoot({

        // Whether to show the loader during Router navigation
        navigationLoader: true,

        // Whether to show the loader for pending XHR requests
        xhrLoader: true,

        // How long should the service wait before showing the loader (in ms)
        wait: 150
    })
  ]
})
export class AppModule { }
```

You also need to add the component selector to your root component template (app.component.html):
```html
<drizm-loader-linear></drizm-loader-linear>
<router-outlet></router-outlet>
```

You can provide custom behavior to the loader by using the `LoaderService`:
```typescript
import { OnInit } from '@angular/core';
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { LoaderService } from '@drizm/loader';

export class AppComponent implements OnInit {
  constructor(private loader: LoaderService) {}

  ngOnInit(): void {
    this.loader.add();
    const obs$ = of(null).pipe(delay(1000));
    
    obs$.subscribe(() => this.loader.subtract());
  }
}
```
