## This is a WIP

# @drizm/buttons

A buttons library for Angular.

## Features

- A styled, fully functional button component
- Easy to override styles

## Installation
```shell
npm install @drizm/buttons
```

## Usage

Import `Buttons` into your module:
```typescript
import { NgModule } from '@angular/core';
import { ButtonsModule } from '@drizm/buttons';

@NgModule({
  imports: [
    // ...
    ButtonsModule
  ]
})
export class AppModule { }
```

Use the component in your template:

```html
<dzm-button type="button" primary>
  Confirm
</dzm-button>
```
