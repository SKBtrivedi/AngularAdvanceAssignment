import { Component } from '@angular/core';
import { Article } from '../../models/article';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  articles: Article[] = [];
  featuredArticles: Article[] = [];
  filteredArticles: Article[] = [];
  displayedArticles: Article[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  articlesPerPage: number = 6;
  totalPages: number = 0;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) { }

  ngOnInit() {
    this.fetchArticles();
  }

  fetchArticles() {
    this.articles = this.articleService.getArticles();
    this.featuredArticles = this.articles.filter(article => article.category === 'editor');
    this.filteredArticles = [...this.articles];
    this.totalPages = Math.ceil(this.filteredArticles.length / this.articlesPerPage);
    this.updateDisplayedArticles();
  }

  filterArticles() {
    this.filteredArticles = this.articles.filter(
      (article) =>
        article.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        article.author.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredArticles.length / this.articlesPerPage);
    this.updateDisplayedArticles();
  }

  updateDisplayedArticles() {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    this.displayedArticles = this.filteredArticles.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updateDisplayedArticles();
  }

  sortBy(category: string) {
    if (category === 'all') {
      this.filteredArticles = [...this.articles];
    } else {
      this.filteredArticles = this.articles.filter((article) => article.category === category);
    }

    // Reset pagination and update displayed articles
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredArticles.length / this.articlesPerPage);
    this.updateDisplayedArticles();
  }

}
