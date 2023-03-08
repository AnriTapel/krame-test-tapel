import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import EdidData from 'src/app/models/edid-data.model';
import SelectionsChangeEvent from 'src/app/models/selection-change.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input('cardData')
  cardData!: EdidData;

  @Input('selected')
  selected!: boolean;

  @HostListener('click', ['$event'])
  onCardClick(event: MouseEvent) {
    this.cardClickEvent.emit({Id: this.cardData.Id, CtrlKey: event.ctrlKey, Enabled: Boolean(this.cardData.status)});
  }

  @Output() cardClickEvent = new EventEmitter<SelectionsChangeEvent>();

  public isSelected: boolean = false;

  private toggleSelection(): void {
    this.isSelected = !this.isSelected;
  }
}
