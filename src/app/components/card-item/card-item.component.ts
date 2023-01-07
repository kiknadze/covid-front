import { Component, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ThousandSeparatorPipe } from 'src/app/pipes';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, MatIconModule, ThousandSeparatorPipe]
})
export class CardItemComponent implements OnInit {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() data: any;
  @Input() infoTemplate: TemplateRef<any> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
