import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ArticleDetail } from '../../models/article-detail';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {

  title: string = '';
  description: string = '';
  content: string = '';
  author: string = '';
  authorBio: string = '';
  category: string = 'popular';
  tags: string[] = [];
  newTag: string = '';
  scheduledDate: Date | null = null;
  videoUrl: string | null = null;
  popularTags: string[] = ['Angular', 'JavaScript', 'CSS', 'Web Development', 'UI/UX'];
  thumbnail: string | null = null;
  articles: any[] = []; // Store articles
  showPreview: boolean = false;

  public Editor: any = ClassicEditor;

  constructor(private articleService: ArticleService, private router: Router) {}

  // CKEditor configuration
  editorConfig: any = {
    toolbar: [
      'bold', 'italic', 'underline', 'strike', '|',
      'bulletedList', 'numberedList', '|',
      'link', 'imageUpload', 'blockQuote', '|',
      'undo', 'redo'
    ]
  };

  // Add a tag to the list
  addTag(): void {
    if (this.newTag.trim() && !this.tags.includes(this.newTag.trim())) {
      this.tags.push(this.newTag.trim());
      this.newTag = '';
    }
  }

  addTagFromPopular(tag: string): void {
    if (!this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }
  
  // Remove a tag from the list
  removeTag(tag: string): void {
    this.tags = this.tags.filter((t) => t !== tag);
  }

  onThumbnailChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.thumbnail = e.target.result; // Save the image as a Base64 string
      };
      reader.readAsDataURL(file);
    }
  }

  onVideoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.videoUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  previewArticle(): void {
    if (!this.title.trim() && !this.content.trim()) {
      alert('Please provide content to preview the article.');
      return;
    }
    this.showPreview = true; // Show the preview when the button is clicked
  }

  saveDraft(): void {
    if (!this.thumbnail) {
      alert('Please upload a thumbnail image!');
      return;
    }
  
    const newArticle = {
      title: this.title,
      content: this.content,
      tags: this.tags,
      thumbnail: this.thumbnail,
      authorName: this.author,
      scheduledDate: this.scheduledDate,
      draft: true,
      id: Date.now(), // Unique ID
      description: this.description,
      author: this.author,
      authorBio:this.authorBio,
      publishDate: new Date(),
      category: 'latest', // Default category
    };
    this.articles.push(newArticle);
    localStorage.setItem('articles', JSON.stringify(this.articles));
    alert('Draft saved successfully!');
  }
 
  publishArticle(): void {
    if (!this.title.trim() || !this.content.trim() || !this.thumbnail?.trim()) {
      alert('Title, content, and thumbnail are required to publish!');
      return;
    }

    const newArticle: ArticleDetail = {
      id: Date.now(), // Unique ID
      title: this.title,
      description: this.description,
      content: this.content,
      thumbnail: this.thumbnail,
      author: this.author,
      authorBio:this.authorBio,
      publishDate: new Date(),
      category: 'latest', // Default category
    };

    this.articleService.addArticle(newArticle);
    alert('Article published successfully!');
    this.router.navigate(['/']); // Navigate back to the Home page
  }

  clearForm(): void {
    this.title = '';
    this.description = '';
    this.content = '';
    this.author = '';
    this.authorBio = '';
    this.category = 'popular';
    this.tags = [];
    this.newTag = '';
    this.scheduledDate = null;
    this.thumbnail = null;
    this.videoUrl = null;
    this.showPreview = false;
  }

  
}
