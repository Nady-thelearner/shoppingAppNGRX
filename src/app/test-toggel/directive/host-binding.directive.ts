import {
  Directive,
  OnInit,
  Input,
  HostBinding,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appHostBinding]',
})
export class HostBindingDirective implements OnInit {
  @Input('appHostBinding') defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'red';
  @HostBinding('style.backgroundColor')
  bckColor!: string;

  constructor(private elfRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.bckColor = this.defaultColor;
  }
  @HostListener('mouseenter') mouseover(evnData: Event) {
    this.bckColor = this.highlightColor;
  }
  @HostListener('mouseleave') mouseleave(evnData: Event) {
    this.bckColor = this.defaultColor;
  }
}
