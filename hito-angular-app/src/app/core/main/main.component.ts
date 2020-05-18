import {AfterViewInit, Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {

  private readonly BODY_COLOR = '#121215';

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.updateBodyColor();
  }

  private updateBodyColor() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.BODY_COLOR;
  }

}
