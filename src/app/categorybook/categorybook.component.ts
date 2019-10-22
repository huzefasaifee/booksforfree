import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { Location } from '@angular/common';
import { BookList } from '../BookList';
import { list } from '../mock-bookcategory';

@Component({
  selector: 'app-categorybook',
  templateUrl: './categorybook.component.html',
  styleUrls: ['./categorybook.component.css']
})
export class CategorybookComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private bookService: CategoryService) { this.searchValue = ""; }

  searchValue: string;
  bookCategory: any;
  book: any;
  booksCategory: any[];
  next: string;
  previous: string;
  booksDisplay: any;
  booksSearch: any;
  booksImage: any;
  cancel:string;
  ngOnInit() {
    this.book = ["1", "2", "3", "4"];
    this.booksCategory = list.results;
    this.booksDisplay = list.results;
    console.log('ngOnInit')
    this.booksSearch = list.results;
    this.getCategory();
    this.getBooksCategory();
    this.cancel = 'Cancel';
  }

  getCategory() {
    const bookCategory = this.route.snapshot.paramMap.get('bookCategory');
    this.bookCategory = bookCategory;
  }
  getBooksCategory() {
    this.bookService.getBooksCategory(this.bookCategory).subscribe((result: BookList) => {
      this.booksCategory = result.results;
      this.booksDisplay = this.booksCategory;
      
      console.log('getBooksCategory');
      this.next = result.next;
      this.previous = result.previous;
    });

  }
  time: any = 0;
  search(value) {
    this.searchValue = value;
    if (value != '') {
      clearTimeout(this.time);

      this.time = setTimeout(() => {
        this.getBooksSearch(value);
      }, 1000);

    }
    else {
      this.resetBooksDisplay();
    }
  }

  private resetBooksDisplay() {
    this.booksDisplay = this.booksCategory;
    console.log('resetBooksDisplay')
  }

  getBooksSearch(value) {
    console.log('value ' + value);
    this.bookService.getBooksSearch(value, this.bookCategory).subscribe((result: BookList) => {
      this.booksSearch = result.results;
      this.booksDisplay = [];
      if (this.booksSearch.length > 0) {
        console.log('searc ' + this.booksSearch.length);
        this.booksDisplay = this.booksSearch;

        this.next = result.next;
        this.previous = result.previous;
      }
      console.log('getBooksSearch');

    });

  }

  openBook(b) {
    console.log(b)
    
    var url = "";
    let html = false;
    let pdf = false;
    let txt = false;
    if (b.formats.hasOwnProperty('text/html; charset=utf-8') == true) {
      
      if(b.formats['text/html; charset=utf-8'].search('zip') == -1){
        url = b.formats['text/html; charset=utf-8'];
        html = true;
      }
      
    }
    if (!html) {
      if (b.formats.hasOwnProperty('application/pdf') == true) {
        if(b.formats['application/pdf'].search('zip') == -1){
          url = b.formats['application/pdf'];
          pdf = true;
        }
        
      }

      if (!pdf) {
        if (b.formats.hasOwnProperty('text/plain') == true) {
          if(b.formats['text/plain'].search('zip') == -1){
            url = b.formats['text/plain'];
            txt = true;
          }
          
        }
      }
    }

    if (url == '') {
      alert('No viewable version available');
    }
    else {
      window.open(url);
    }
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page
      console.log('(window.innerHeight '+window.innerHeight);
      console.log('window.scrollY '+ window.scrollY);
      console.log('document.body.offsetHeight '+document.body.offsetHeight);
      console.log("you're at the bottom of the page" + event);
      this.getMoreBooks();
    }

  }

  getMoreBooks() {
    if (this.next != null) {
      this.bookService.getBooks(this.next).subscribe((result: BookList) => {
        console.log('booksCategory before' + this.booksCategory.length);
        result.results.forEach(element => {
          this.booksCategory.push(element);
        });
        console.log('booksCategory after' + this.booksCategory.length);
        this.booksDisplay = this.booksCategory;
        console.log('getMoreBooks');
        this.next = result.next;
        this.previous = result.previous;
      });
    }
  }
  clear() {
    this.searchValue = "";
    this.resetBooksDisplay();
  }
}
