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

Note: You need to specify a button style in order for it to display correctly, like in the example above.
 Check documentation below for more styles.

## Documentation

| Property | Type | Description |
|---------|---------|------------|
|type|"button" or "submit"|The button html element type. Optional.|
|content|string|A string containing the button's content. Optional. Alternatively, insert the content straight into the component selector via `<dzm-button>Content</dzm-button>`.|
|disabled|boolean|Whether the button should be displayed as disabled. False by default.|
|primary|""|Button style. Write <dzm-button primary></dzm-button> to enable it. Optional.|
|secondary|""|Button style. Write <dzm-button secondary></dzm-button> to enable it. Optional.|
|danger|""|Button style. Write <dzm-button danger></dzm-button> to enable it. Optional.|
|outline|""|Button design. Write <dzm-button outline></dzm-button> to enable it. Optional.|
