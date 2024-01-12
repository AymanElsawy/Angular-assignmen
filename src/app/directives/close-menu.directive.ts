import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appCloseMenu]',
  standalone: true
})
export class CloseMenuDirective {


  private el = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const sidebar = this.el.nativeElement;
    if (!sidebar.contains(event.target)) {
      if (sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
      } 
    }
  }

}
