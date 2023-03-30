import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesResponse } from '../models/shared.type';

const API_URL = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCategories() : Observable<CategoriesResponse>{
    const endpoint = "/categories/list";
    const result = this.http.get<CategoriesResponse>(`${API_URL}${endpoint}`)
    return result;
  }
}
