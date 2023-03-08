import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Observable, startWith, Subscription, switchMap } from 'rxjs';
import EdidData from './models/edid-data.model';
import { EdidService } from './services/edid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public searchControl = new FormControl('');
  public cardsData$: Observable<EdidData[]>;

  public filteredCards$: Observable<EdidData[]>;

  private searchControlSubscription!: Subscription;

  constructor(private edidService: EdidService) {
    this.cardsData$ = edidService.getEdidData();
    
    this.filteredCards$ = this.searchControl.valueChanges.pipe(
      debounceTime(200),
      startWith(''),
      switchMap((value) => this.cardsData$.pipe(
        map((it: EdidData[]) => it.filter(data => data.Name.toLowerCase().includes(value?.toLowerCase() || '')))
      ))
    );
  }

  ngOnDestroy(): void {
    this.searchControlSubscription.unsubscribe();
  }

}
