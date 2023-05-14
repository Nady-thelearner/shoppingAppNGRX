import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appAppAdvDirective]',
})
export class AppAdvDirectiveDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // this.renderer.setStyle(this.elRef.nativeElement, 'backgroundColor', 'blue');
  }
  @HostListener('mouseenter') mouseover(evnData: Event) {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'backgroundColor',
      'orangered'
    );
  }

  @HostListener('mouseleave') mouseleave(evnData: Event) {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'backgroundColor',
      'transparent'
    );
  }
}
