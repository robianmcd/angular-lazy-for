import { Input, Directive, ViewContainerRef, TemplateRef } from '@angular/core';
var LazyForDirective = (function () {
    function LazyForDirective(vcr, tpl) {
        this.vcr = vcr;
        this.tpl = tpl;
        this.list = [];
        this.initialized = false;
        this.firstUpdate = true;
    }
    Object.defineProperty(LazyForDirective.prototype, "lazyForOf", {
        set: function (list) {
            this.list = list;
            if (list && this.initialized) {
                this.update();
            }
        },
        enumerable: true,
        configurable: true
    });
    LazyForDirective.prototype.ngOnInit = function () {
        console.log('setting template elem');
        this.templateElem = this.vcr.element.nativeElement;
        if (this.containerElem === undefined) {
            this.containerElem = this.templateElem.parentElement;
            if (this.containerElem.tagName === 'THEAD' || this.containerElem.tagName === 'TBODY') {
                this.containerElem = this.containerElem.parentElement;
            }
        }
        this.containerElem.addEventListener('scroll', function (e) {
            //this.update();
        });
        this.initialized = true;
    };
    LazyForDirective.prototype.ngDoCheck = function () {
        this.update();
    };
    LazyForDirective.prototype.update = function () {
        if (this.firstUpdate) {
            var sampleItemElem = void 0;
            if (this.itemHeight === undefined || this.itemTagName === undefined) {
                this.vcr.createEmbeddedView(this.tpl, {
                    $implicit: this.list[0]
                });
                sampleItemElem = this.templateElem.nextSibling;
            }
            if (this.itemHeight === undefined) {
                this.itemHeight = sampleItemElem.clientHeight;
            }
            console.log(this.itemTagName);
            if (this.itemTagName === undefined) {
                this.itemTagName = sampleItemElem.tagName;
            }
            this.beforeListElem = document.createElement(this.itemTagName);
            this.containerElem.insertBefore(this.beforeListElem, this.templateElem);
            this.afterListElem = document.createElement(this.itemTagName);
            //This inserts after the templateElem. see http://stackoverflow.com/a/4793630/373655 for details
            this.containerElem.insertBefore(this.afterListElem, this.templateElem.nextSibling);
            if (this.itemTagName.toLowerCase() === 'li') {
                this.beforeListElem.style.listStyleType = 'none';
                this.afterListElem.style.listStyleType = 'none';
            }
            this.firstUpdate = false;
        }
        var listHeight = this.containerElem.clientHeight;
        var scrollTop = this.containerElem.scrollTop;
        //The height of anything inside the container but above the lazyFor content;
        var fixedHeaderHeight = this.beforeListElem.offsetTop - this.containerElem.offsetTop;
        //This needs to run after the scrollTop is retrieved.
        this.vcr.clear();
        var listStartI = Math.floor((scrollTop - fixedHeaderHeight) / this.itemHeight);
        listStartI = this.limitToRange(listStartI, 0, this.list.length);
        var listEndI = Math.ceil((scrollTop - fixedHeaderHeight + listHeight) / this.itemHeight);
        listEndI = this.limitToRange(listEndI, -1, this.list.length - 1);
        for (var i = listStartI; i <= listEndI; i++) {
            this.vcr.createEmbeddedView(this.tpl, {
                $implicit: this.list[i]
            });
        }
        this.beforeListElem.style.height = listStartI * this.itemHeight + "px";
        this.afterListElem.style.height = (this.list.length - listEndI - 1) * this.itemHeight + "px";
    };
    LazyForDirective.prototype.limitToRange = function (num, min, max) {
        return Math.max(Math.min(num, max), min);
    };
    return LazyForDirective;
}());
export { LazyForDirective };
LazyForDirective.decorators = [
    { type: Directive, args: [{
                selector: '[lazyFor]'
            },] },
];
/** @nocollapse */
LazyForDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
    { type: TemplateRef, },
]; };
LazyForDirective.propDecorators = {
    'itemHeight': [{ type: Input, args: ['lazyForWithHeight',] },],
    'containerElem': [{ type: Input, args: ['lazyForInContainer',] },],
    'itemTagName': [{ type: Input, args: ['lazyForWithTagName',] },],
    'lazyForOf': [{ type: Input },],
};
