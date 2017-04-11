import {NgModule} from '@angular/core';
import {LazyForDirective} from './lazyFor.directive';
export * from './lazyFor.directive';

@NgModule({
    declarations: [LazyForDirective],
    exports: [LazyForDirective]
})
export class LazyForModule {}