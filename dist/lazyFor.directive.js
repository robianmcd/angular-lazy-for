import { Input, Directive, ViewContainerRef, TemplateRef, IterableDiffers } from '@angular/core';
var LazyForDirective = (function () {
    function LazyForDirective(vcr, tpl, iterableDiffers) {
        this.vcr = vcr;
        this.tpl = tpl;
        this.iterableDiffers = iterableDiffers;
        this.list = [];
        this.initialized = false;
        this.firstUpdate = true;
        this.lastChangeTriggeredByScroll = false;
    }
    Object.defineProperty(LazyForDirective.prototype, "lazyForOf", {
        set: function (list) {
            this.list = list;
            if (list) {
                this.differ = this.iterableDiffers.find(list).create();
                if (this.initialized) {
                    this.update();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    LazyForDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.templateElem = this.vcr.element.nativeElement;
        if (this.containerElem === undefined) {
            this.containerElem = this.templateElem.parentElement;
        }
        //Adding an event listener will trigger ngDoCheck whenever the event fires so we don't actually need to call
        //update here.
        this.containerElem.addEventListener('scroll', function (e) {
            _this.lastChangeTriggeredByScroll = true;
        });
        this.initialized = true;
    };
    LazyForDirective.prototype.ngDoCheck = function () {
        if (this.differ && Array.isArray(this.list)) {
            if (this.lastChangeTriggeredByScroll) {
                this.update();
                this.lastChangeTriggeredByScroll = false;
            }
            else {
                var changes = this.differ.diff(this.list);
                if (changes !== null) {
                    this.update();
                }
            }
        }
    };
    //Preconditions:
    //  this.list is an array
    LazyForDirective.prototype.update = function () {
        //Can't run the first update unless there is an element in the list
        if (this.list.length === 0) {
            this.vcr.clear();
            return;
        }
        if (this.firstUpdate) {
            this.onFirstUpdate();
        }
        var listHeight = this.containerElem.clientHeight;
        var scrollTop = this.containerElem.scrollTop;
        //The height of anything inside the container but above the lazyFor content;
        var fixedHeaderHeight = (this.beforeListElem.getBoundingClientRect().top - this.beforeListElem.scrollTop) -
            (this.containerElem.getBoundingClientRect().top - this.containerElem.scrollTop);
        //This needs to run after the scrollTop is retrieved.
        this.vcr.clear();
        var listStartI = Math.floor((scrollTop - fixedHeaderHeight) / this.itemHeight);
        listStartI = this.limitToRange(listStartI, 0, this.list.length);
        var listEndI = Math.ceil((scrollTop - fixedHeaderHeight + listHeight) / this.itemHeight);
        listEndI = this.limitToRange(listEndI, -1, this.list.length - 1);
        for (var i = listStartI; i <= listEndI; i++) {
            this.vcr.createEmbeddedView(this.tpl, {
                $implicit: this.list[i],
                index: i
            });
        }
        this.beforeListElem.style.height = listStartI * this.itemHeight + "px";
        this.afterListElem.style.height = (this.list.length - listEndI - 1) * this.itemHeight + "px";
    };
    LazyForDirective.prototype.onFirstUpdate = function () {
        var sampleItemElem;
        if (this.itemHeight === undefined || this.itemTagName === undefined) {
            this.vcr.createEmbeddedView(this.tpl, {
                $implicit: this.list[0],
                index: 0
            });
            sampleItemElem = this.templateElem.nextSibling;
        }
        if (this.itemHeight === undefined) {
            this.itemHeight = sampleItemElem.clientHeight;
        }
        if (this.itemTagName === undefined) {
            this.itemTagName = sampleItemElem.tagName;
        }
        this.beforeListElem = document.createElement(this.itemTagName);
        this.templateElem.parentElement.insertBefore(this.beforeListElem, this.templateElem);
        this.afterListElem = document.createElement(this.itemTagName);
        //This inserts after the templateElem. see http://stackoverflow.com/a/4793630/373655 for details
        this.templateElem.parentElement.insertBefore(this.afterListElem, this.templateElem.nextSibling);
        if (this.itemTagName.toLowerCase() === 'li') {
            this.beforeListElem.style.listStyleType = 'none';
            this.afterListElem.style.listStyleType = 'none';
        }
        this.firstUpdate = false;
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
    { type: IterableDiffers, },
]; };
LazyForDirective.propDecorators = {
    'itemHeight': [{ type: Input, args: ['lazyForWithHeight',] },],
    'containerElem': [{ type: Input, args: ['lazyForInContainer',] },],
    'itemTagName': [{ type: Input, args: ['lazyForWithTagName',] },],
    'lazyForOf': [{ type: Input },],
};
