<aside class="notice">
This is a work in progress and is not ready to be used yet.
</aside>

# What is lazyFor

`lazyFor` is an Angular 2+ directive that uses the same syntax as ngFor but only renders items that are visible.

## UseCases
* When you know the size of the iterable and but you only want to create DOM elements for visible items.
* Fix performance issues with page load time.
* Fix change detection performance issues.

## UseCases it doesn't work for
* not meant to replace ngFor. Only use it if you have performance issues
* Not an infinite scroll. dont use it if you don't know the total size of the list
* Doesn't currently support loading items asyncronously. if there is enough demand it may in the future

## Diagram
TODO

## Examples

Input
```html
<ul>
  <li *lazyFor="item of [1,2,3,4,5,6]">
    {{item}}
  </li>
</ul>
```

Output
```html
<ul>
  <li style="height: 20px"></li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li style="height: 10px"></li>
</ul>
```
This example assumes that the `<ul>` has a height of `30px` and that each `<li>` has a hight of `10px`

## Example with parameters
```html
<ul style="height: 200px; overflow: auto;" #listElem>
  <li *lazyFor="let item of items, withHeight 30, inContainer listElem, withTagName 'div'" style="height: 30px">
    item - {{item.num}}
    <img height="28px" [src]="'data:image/jpeg;base64,' + item.base64Img">
  </li>
</ul>
```