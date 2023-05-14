import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector : '[appBasicHighlight]'
})
export class basicHighLightDirective implements OnInit{
    constructor(private elementRef : ElementRef){

    }
    ngOnInit(): void {
        this.elementRef.nativeElement.style.backgroundColor ='limegreen';
    }
}