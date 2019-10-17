import { Injectable } from '@angular/core';
import { Category } from './category';
import { category } from './mock-bookcategory';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private booksUrl = 'http://skunkworks.ignitesol.com:8000/books';

  constructor(private http: HttpClient) { }

  getCategory(): Observable<Category[]> {
    return of(category);
  }

  getBooksCategory(topic) {
    console.log(topic);
    let param = this.getParameter('topic', topic);
    let url = this.booksUrl + param;
    return this.http.get(url);
  }

  getBooksSearch(value, topic) {
    let codevalue = encodeURI(value);
    let param = this.getParameter('search', codevalue);
    let url = this.booksUrl + param + '&topic=' + topic;
    return this.http.get(url);
  }

  getBooks(type) {
    console.log(type);
    return this.http.get(type);
  }
  getParameter(param, value) {
    let mime_type = 'image/jpeg';
    let parameter = '?' + param + '=' + value + '&mime_type=' + mime_type;
    return parameter;

  }
}
