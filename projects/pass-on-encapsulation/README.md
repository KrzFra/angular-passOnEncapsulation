# passOnEncapsulationDirective
Directive for Angular to pass on a parents encapsulation attribute to its children.

## How to use
Install package in your angular project
```bash
npm install -s angular-pass-on-encap
```

Import module into your app.module.ts
```typescript
@NgModule({
  // ...
  imports: [
    PassOnEncapsulationModule
  ],
  // ...
})
export class AppModule { }
```

Use the directive:
```html
<mat-form-field libPassOnEncap></mat-form-field>
```

## Explanation

When `ViewEncapsulation.Emulated` is enabled in Angular (default), it adds an attribute to your HTML elements and CSS classes to keep your css rules inside the component. This is great if you only use your own components, since you can edit their respective styles directly. However, when you use other packages, f.e. Angular Material, you don't have access to the component's children.

## Example: How it works now
In this example, I'm using a mat-form-field component in my-component:
```html
<!--my-component.html-->
<mat-form-field>
  <input matInput placeholder="placeholder" />
</mat-form-field>
```

Then I want to apply a new border to the field label wrapper, created inside mat-form-field:
```css
/* my-component.css */
.mat-form-field-label-wrapper {
    border: 1px solid red;
}
```

However, when the resulting html and CSS is sent to the browser, my rule is ignored:
```html
<mat-form-field class="mat-form-field" _ngcontent-rwb-c0>
  <div class="mat-form-field-wrapper">
    <div class="mat-form-field-flex">
      <div class="mat-form-field-infix">
        <input class="mat-input-element"_ngcontent-rwb-c0/>
        <!-- I want to edit this: -->
        <span class="mat-form-field-label-wrapper">
          <label class="mat-form-field-label">
            <span>placeholder</span>
          </label>
        </span>
      </div>
    </div>
    <div class="mat-form-field-underline">
      <span class="mat-form-field-ripple"></span>
    </div>
    <div class="mat-form-field-subscript-wrapper">
      <div class="mat-form-field-hint-wrapper">
        <div class="mat-form-field-hint-spacer"></div>
      </div>
    </div>
  </div>
</mat-form-field>
```

```css
.mat-form-field-label-wrapper[_ngcontent-rwb-c0] {
    border: 1px solid red;
}
```
Angular uses randomly generated attributes, in this case `_ngcontent-rwb-c0`, to bind the CSS rules to the components HTML elements. But Angular only adds the attribute to the 'root' elements which are positioned directly in my template. In this case my css rule for `.mat-form-field-label-wrapper` will not be applied to the element. I will need to put it in the global `style.css` where no encapsulation tag is added to the CSS class. But this becomes tedious quickly, expecially when I want to display `.mat-form-field-label-wrapper` differently in several components; and it defeats the whole purpose of encapsulation.

## Example: How it works with directive
Using `libPassOnEncap` in the components lets it pass on its encapsulation attribute to its children:

```html
<!--my-component.html-->
<mat-form-field libPassOnEncap>
  <input matInput placeholder="placeholder"/>
</mat-form-field>
```
```html
<mat-form-field class="mat-form-field" _ngcontent-rwb-c0>
  <div class="mat-form-field-wrapper" _ngcontent-rwb-c0>
    <div class="mat-form-field-flex" _ngcontent-rwb-c0>
      <div class="mat-form-field-infix" _ngcontent-rwb-c0>
        <input class="mat-input-element" _ngcontent-rwb-c0/>
        <span class="mat-form-field-label-wrapper" _ngcontent-rwb-c0>
          <label class="mat-form-field-label" _ngcontent-rwb-c0>
            <span _ngcontent-rwb-c0>placeholder</span>
          </label>
        </span>
      </div>
    </div>
    <div class="mat-form-field-underline" _ngcontent-rwb-c0>
      <span class="mat-form-field-ripple" _ngcontent-rwb-c0></span>
    </div>
    <div class="mat-form-field-subscript-wrapper" _ngcontent-rwb-c0>
      <div class="mat-form-field-hint-wrapper" _ngcontent-rwb-c0>
        <div class="mat-form-field-hint-spacer" _ngcontent-rwb-c0></div>
      </div>
    </div>
  </div>
</mat-form-field>
```
Now my CSS rule for `.mat-form-field-label-wrapper` works and it works only for elements inside this component.
