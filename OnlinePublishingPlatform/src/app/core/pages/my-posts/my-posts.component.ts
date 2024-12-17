import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ArticleDetail } from 'src/app/core/models/article-detail';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss'],
})
export class MyPostsComponent implements OnInit {
  drafts: ArticleDetail[] = [];
  publishedArticles: ArticleDetail[] = [];
  displayedArticles: ArticleDetail[] = [];
  filterOption: string = 'all';

  constructor(private sanitizer: DomSanitizer, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadDrafts();
    this.fetchPublishedArticles();
    this.filterArticles();
  }

  // Load drafts from localStorage
  loadDrafts(): void {
    const storedDrafts = localStorage.getItem('articles');
    this.drafts = storedDrafts ? JSON.parse(storedDrafts) : [];
    this.drafts.forEach((draft) => {
      if (typeof draft.content === 'string') {
        draft.content = this.sanitizeHtml(draft.content);
      }
    });
  }

  // Fetch published articles from ArticleService
  fetchPublishedArticles(): void {
    this.publishedArticles = this.articleService.getArticles();
  }

  // Sanitize content for safe rendering
  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  // Filter articles based on filterOption
  filterArticles(): void {
    if (this.filterOption === 'drafts') {
      this.displayedArticles = [...this.drafts];
    } else if (this.filterOption === 'published') {
      this.displayedArticles = [...this.publishedArticles];
    } else {
      this.displayedArticles = [...this.drafts, ...this.publishedArticles];
    }
  }

  // Delete a draft
  deleteDraft(index: number): void {
    this.drafts.splice(index, 1);
    this.saveDrafts();
    this.filterArticles();
  }

  // Save drafts back to localStorage
  saveDrafts(): void {
    localStorage.setItem('articles', JSON.stringify(this.drafts));
  }

  // Publish a draft
  publishDraft(index: number): void {
    const draftToPublish = this.drafts[index];
    draftToPublish.draft = false; // Mark as published
    draftToPublish.publishDate = new Date(); // Set publish date

    // Add to ArticleService and remove from drafts
    this.articleService.addArticle(draftToPublish);
    this.drafts.splice(index, 1);

    // Save updated drafts and refresh articles
    this.saveDrafts();
    this.fetchPublishedArticles();
    this.filterArticles();

    alert('Draft successfully published!');
  }
}
