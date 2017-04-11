import { ViewContainerRef, TemplateRef, DoCheck } from '@angular/core';
export declare class LazyForDirective implements DoCheck {
    private vcr;
    private tpl;
    itemHeight: number;
    containerElem: HTMLElement;
    itemTagName: string;
    templateElem: HTMLElement;
    beforeListElem: HTMLElement;
    afterListElem: HTMLElement;
    list: any[];
    initialized: boolean;
    firstUpdate: boolean;
    constructor(vcr: ViewContainerRef, tpl: TemplateRef<any>);
    lazyForOf: any;
    ngOnInit(): void;
    ngDoCheck(): void;
    update(): void;
    private limitToRange(num, min, max);
}
