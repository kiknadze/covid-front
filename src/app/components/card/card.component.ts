import { Component, Input, ViewEncapsulation, OnInit, ContentChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { PercentOrPxPipe } from 'src/app/pipes';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-body',
  template: '<ng-content></ng-content>',
  standalone: true,
})
export class CardBodyComponent { }

@Component({
  selector: 'app-card',
  templateUrl: './card.componenet.html',
  styleUrls: [ './card.componenet.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, MatDividerModule, PercentOrPxPipe, MatProgressSpinnerModule, CardBodyComponent]
})
export class CardComponent implements OnInit {
  @ContentChild(CardBodyComponent, { static: true }) public mathBodyFacet!: CardBodyComponent;
  @Input() title: string = '';
  @Input() bodyStyle: any;
  @Input() height: number | string = '100%';
  @Input() width: number | string = '100%';
  @Input() titleStyle: any;
  @Input() loadingStyle: any;
  @Input() loading: boolean = false;

  ngOnInit() {
  }

}
