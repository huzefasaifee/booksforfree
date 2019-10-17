import { Component, OnInit, Input } from '@angular/core';
//import {Book} from '../Book/Book';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-bookcategory',
  templateUrl: './bookcategory.component.html',
  styleUrls: ['./bookcategory.component.css']
})
export class BookcategoryComponent implements OnInit {
  @Input()
  list: Category[];
  title = 'Gutenberg Project';
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategory();
  }
  getCategory() {
    this.categoryService.getCategory().subscribe((values) => this.list = values);
  }

}
