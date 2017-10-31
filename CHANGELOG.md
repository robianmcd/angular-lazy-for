# Change Log

## 1.1.5 - 2017-10-31
- Fixed issue that would occur if the list started out being empty

## 1.1.4 - 2017-10-20
- Fixed issue with clearing large list of items

## 1.1.3 - 2017-04-24
- Added check to only regenerate DOM elements if items in the list have changed or a scroll event has fired. This greatly improves performance in some cases.
- Added this change log

## 1.1.2 - 2017-04-21
- Fixed bug that occurred when the container element is not a direct parent of the element with `lazyFor` on it

## 1.1.1 - 2017-04-21
- Fixed issue with uninitialized lists

## 1.1.0 - 2017-04-21
- Added local variable named index that can be used to determine the index of the current item. e.g.:
```HTML
 <li *lazyFor="let item of items; let i = index;">
     {{items}} {{i}}
 </li>
 ```

## 1.0.0 - 2017-04-19
- Initial release
- Added all the things