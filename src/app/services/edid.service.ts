import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, tap } from 'rxjs';
import EdidData from '../models/edid-data.model';

@Injectable({
  providedIn: 'root'
})
export class EdidService {

  private readonly EDID_FILE_NAMES: string[] = ["BenQ SC3211", "Dell ZT60", "Haier LE39B50", "LG 50LA621Y", "Mag RD24L", "Normande ND3276", "Panasonic TH-L32B6", "Philips 55PFL6008", "Philips 226V4LSB", "Samsung UA46F6400", "Sharp LC50LE450M", "Samsung UA55F6400", "Sony KDL50W656"];
  private readonly LOCAL_STORAGE_KEY = 'edid-data';

  constructor(private http: HttpClient) {

  }

  public getEdidData(): Observable<EdidData[]> {
    if (localStorage.hasOwnProperty(this.LOCAL_STORAGE_KEY)) {
      let dataArray: EdidData[] = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)!) as EdidData[];
      return of(dataArray);
    } 
    return this.fetchEdidFiles();
  }

  private fetchEdidFiles(): Observable<EdidData[]> {
    let requests = this.EDID_FILE_NAMES.map((file) => this.http.get<EdidData>(`/assets/JSONmonitors/${encodeURIComponent(file)}.json`));
    return forkJoin(requests).pipe(
      map((data: EdidData[]) => data.map(it => ({...it, 
        Id: Math.floor(100000 + Math.random() * 900000),
        Selected: false
      }))),
      tap(this.saveFetchedData.bind(this))
    );
  }

  private saveFetchedData(data: EdidData[]): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
  }
}
