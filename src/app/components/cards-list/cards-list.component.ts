import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import EdidData from 'src/app/models/edid-data.model';
import SelectionsChangeEvent from 'src/app/models/selection-change.model';
import { EdidService } from 'src/app/services/edid.service';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss']
})
export class CardsListComponent {

  private selectedCardIds: number[] = [];

  @Input('cardsData')
  cardsData$!: Observable<EdidData[]>;

  constructor(private edidService: EdidService) {}

  onCardClick(event: SelectionsChangeEvent): void {
    if (!event.Enabled) {
      if (!event.CtrlKey) {
        this.selectedCardIds = [];
      }
      return;
    }

    if (event.CtrlKey) {

      if (this.isSelected(event.Id)) {
        this.selectedCardIds = this.selectedCardIds.filter(it => it === event.Id);
      } else {
        this.selectedCardIds.push(event.Id);
      }

      return;
    }

    this.selectedCardIds = this.isSelected(event.Id) ? [] : [event.Id];
  }

  isSelected(id: number): boolean {
    return this.selectedCardIds.includes(id);
  }
}
