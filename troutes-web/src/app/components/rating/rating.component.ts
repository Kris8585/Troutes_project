import { Component, OnInit, Input, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  private _iScore: number;
  //cantidadMarcas: number = 5;
  ratingCount:number=5;
  @Input() iReadOnly: boolean = false;
  @Input() iScore: number;
  @Output() oScoreEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    const score: SimpleChange = changes.iScore;
    this._iScore = score.currentValue;
  }
  scoreEmitter() {
    // console.log(this._iPuntaje)
    this.oScoreEmitter.emit(this._iScore);
  }
}
