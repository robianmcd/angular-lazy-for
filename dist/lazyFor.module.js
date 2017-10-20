import { NgModule } from '@angular/core';
import { LazyForDirective } from './lazyFor.directive';
var LazyForModule = /** @class */ (function () {
    function LazyForModule() {
    }
    LazyForModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [LazyForDirective],
                    exports: [LazyForDirective]
                },] },
    ];
    /** @nocollapse */
    LazyForModule.ctorParameters = function () { return []; };
    return LazyForModule;
}());
export { LazyForModule };
export { LazyForDirective };
