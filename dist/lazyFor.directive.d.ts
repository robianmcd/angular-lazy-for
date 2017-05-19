import { ViewContainerRef, TemplateRef, DoCheck, IterableDiffers } from '@angular/core';
export declare class LazyForDirective implements DoCheck {
    private vcr;
    private tpl;
    private iterableDiffers;
    itemHeight: number;
    containerElem: HTMLElement;
    itemTagName: string;
    lazyForOf: any;
    private templateElem;
    private beforeListElem;
    private afterListElem;
    private list;
    private initialized;
    private firstUpdate;
    private differ;
    private lastChangeTriggeredByScroll;
    private viewRefCache;
    constructor(vcr: ViewContainerRef, tpl: TemplateRef<any>, iterableDiffers: IterableDiffers);
    ngOnInit(): void;
    ngDoCheck(): void;
    private update();
    private onFirstUpdate();
    private limitToRange(num, min, max);
}
