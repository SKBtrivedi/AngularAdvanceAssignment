import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { LoginComponent } from './shared/auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './core/pages/home/home.component';
import { ArticleDetailsComponent } from './core/pages/article-details/article-details.component';
import { AuthorDirectoryComponent } from './core/pages/author-directory/author-directory.component';
import { NewPostComponent } from './core/pages/new-post/new-post.component';
import { MyPostsComponent } from './core/pages/my-posts/my-posts.component';
import { NavbarComponent } from './shared/component/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ArticleDetailsComponent,
    AuthorDirectoryComponent,
    NewPostComponent,
    MyPostsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    FormsModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
