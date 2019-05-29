import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DataInformationService } from 'src/app/services/data-information/data-information.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public jumboStyle: any;
  //news$: Observable<any>;
  public newsID: string;
  public news: NewsType;
  paramSuscription: Subscription;
  newsSuscription: Subscription;
  constructor(private _route: ActivatedRoute, private _dataInformationService: DataInformationService) {

  }

  ngOnInit() {
    this.loadNews();

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.paramSuscription.unsubscribe();
    this.newsSuscription.unsubscribe();
  }
  loadNews() {
    this.paramSuscription = this._route.paramMap.subscribe((params) => {
      this.newsID = params.get('newId');
      this.newsSuscription = this._dataInformationService.getNewsById(this.newsID).subscribe((elements) => {
        this.news = elements[0];
        this.setStyle();
      })
    })
  }
  setStyle() {

    this.jumboStyle = {
      'background-image': 'url(' + this.news.image + ')',
      'background-size': 'cover',
      'height': '233px'
    }
  }
}
