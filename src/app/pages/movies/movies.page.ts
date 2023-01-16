import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: any = [];
  currentPage = 1;
  imageBaseUrl = environment.images;
  constructor(private movieService: MovieService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }
  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();


    this.movieService.getTOpRatedMovies().subscribe((res) => {
      loading.dismiss();
      this.movies.push(...res.result);
      console.log(res);

      event?.target.complete();
      if (event) {
        event.target.disabled = res.total_pages === this.currentPage;
      }
    });
  }
  loadMore(event: any) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
