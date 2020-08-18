import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  constructor(
    private http: HttpClient
  ) { }

  fetch(categoriesId: string): Observable<Position[]>
  {
      return this.http.get<Position[]>(`/api/position/${categoriesId}`)
  }

  create(position: Position): Observable<Position> 
  {
    return this.http.post<Position>('/api/position/', position)
  }

  update(position: Position): Observable<Position> {
    return this.http.patch<Position>(`/api/position/${position._id}`, position)
  }
}


