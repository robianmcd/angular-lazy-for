# lazyFor

`lazyFor` is an Angular 2+ directive that can be used in place of `ngFor`. The main difference is that `lazyFor` will only render items when they are visible in the parent element. So as a user scrolls, items that are no longer visible will be removed from the DOM and new items will be rendered to the DOM.

## Sample Usage
#### [Plunker Demo](https://embed.plnkr.co/t9OKzEOObBClzI6MX6uo/?show=app.component.ts,preview)

Install with `npm install --save angular-lazy-for`

*app.module.ts*
```TypeScript
import {NgModule} from '@angular/core';
import {LazyForModule} from 'angular-lazy-for';

@NgModule({
  declarations: [/*...*/],
  imports: [
    //...
    LazyForModule
  ],
  providers: [/*...*/],
  bootstrap: [/*...*/]
})
export class AppModule {
}
```

*Template Input*
```html
<ul style="height: 30px; overflow-y: auto">
  <li *lazyFor="let item of [1,2,3,4,5,6]" style="height: 10px;">
    {{item}}
  </li>
</ul>
```

*DOM Output*
```html
<ul>
  <li style="height: 20px"></li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li style="height: 10px"></li>
</ul>
```

## When to use `lazyFor`
* When you know the size of the iterable and you only want to create DOM elements for visible items.
* Fix performance issues with page load time.
* Fix change detection performance issues.

## When *not* to use `lazyFor`
* Not meant to replace `ngFor` in all cases. Only use `lazyFor` if you have performance issues
* Not an infinite scroll. don't use it if you don't know the total size of the list
* Doesn't currently support loading items asynchronously. Although support for this may be added in the future
* This directive does some DOM manipulation so it won't work if your Angular app runs in a web worker or if you use Angular Universal

## Performance
`lazyFor` can improve performance by preventing unnecessary content from being rendered to the DOM. This also leads to fewer bindings which reduces the load on change detection. Using `ngFor` is usually very fast but here is a casae where it has a noticeable performance impact:
#### [Plunker Performance Demo](https://embed.plnkr.co/eRMjnhW1ctU1VwdRhE8x/?show=app.component.ts,preview)

## Optional Parameters

### withHeight
This directive will try to figure out the height of each element and use that number to calculate the amount of spacing above and below the items. If you are having issues with the defualt behaviour you can specify an explicit height in pixels.

```HTML
<div *lazyFor="let item of items, withHeight 30"></div>
```

### inContainer
`lazyFor` needs to know which element is the scrollable container the items will be inside of. By default it will use the parent element but if this is not the right element you can explicitly specify the container. Note: there is a special case for tables. If you put `lazyFor` on an element inside a `<thead>` or `<tbody>` it will use the parent of the <`thead`>/<`tbody`> as the container by default.

```HTML
<div style="overflow: auto" #myContainer>
    <div>
        <div *lazyFor="let item of items, inContainer myContainer"></div>
    </div>
</div>
```

### withTagName
This directive works by creating an empty element above and below the repeated items with a set height. By default these buffer elements will the use the same type of tag that `lazyFor` is on. However you can specify a custom tag name with this parameter if needed.

*Template*
```HTML
<ul>
  <li *lazyFor="let item of items, withTagName 'div'"></li>
<ul>
```

*DOM Output*
```HTML
<ul>
  <div height="..."></div>
  <li></li>
  <li></li>
  <li></li>
  <div height="..."></div>
<ul>
```