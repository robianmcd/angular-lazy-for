import { NgModule } from '@angular/core';
import { LazyForDirective } from './lazyFor.directive';
export * from './lazyFor.directive';
var LazyForModule = (function () {
    function LazyForModule() {
    }
    return LazyForModule;
}());
export { LazyForModule };
LazyForModule.decorators = [
    { type: NgModule, args: [{
                declarations: [LazyForDirective],
                exports: [LazyForDirective]
            },] },
];
/** @nocollapse */
LazyForModule.ctorParameters = function () { return []; };
