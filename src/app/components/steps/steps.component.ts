import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnChanges {
  @Input() items: Array<any>;
  @Input() edition: boolean;
  @Input() query: string;
  @Input() recipeID: number;
  @Input() video: boolean;
  isVideoOpen: boolean = false;
  itemsTransformed: Array<any> = [];
  itemsToSave: Array<any> = [];
  srcVideo = `../assets/video/${this.recipeID}.mp4`;
  @Output() stepsUpdated = new EventEmitter<any>();
  @ViewChild('newStep', {static: false}) private newStep: ElementRef<HTMLInputElement>;
  @ViewChild('videoPlayer', {static: false}) private videoPlayer: ElementRef<HTMLMediaElement>;

  constructor(private cdRef:ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges){
    if(changes && changes['recipeID']) this.srcVideo = `../assets/video/${changes['recipeID'].currentValue}.mp4`;
    this.itemsToSave = (changes && changes['items']) ? this.items.map((i) => i) : this.itemsToSave;
    this.query = (changes && changes['query']) ? changes['query'].currentValue : this.query;
    this.transformItems();

    this.cdRef.detectChanges();
  }

  addStep(){
    if(this.newStep.nativeElement.value !== ""){
      let newStep = {
        text: this.newStep.nativeElement.value,
        index: this.items.length
      }
      this.itemsToSave.push(newStep);
      this.transformItems();
      // clear input
      this.newStep.nativeElement.value = "";
    }
   }

  closeVideo = () => {
    this.isVideoOpen = false;
    this.videoPlayer.nativeElement.pause();
  }

  deleteStep(id: number){
    this.itemsToSave.splice(id, 1); // remove the ith element of items
    this.transformItems();
  }

  moveStep(data){ // { index: this.index, value: 1 or -1}
    if(data.value < 0){ // up
      if(data.index === 0) return;
      const switch1 = this.itemsToSave[data.index];
      const switch2 = this.itemsToSave[data.index - 1];
      this.itemsToSave[data.index] = switch2;
      this.itemsToSave[data.index - 1] = switch1;
    } else { // down
      if(data.index=== (this.itemsToSave.length - 1)) return;
      const switch1 = this.itemsToSave[data.index];
      const switch2 = this.itemsToSave[data.index + 1];
      this.itemsToSave[data.index] = switch2;
      this.itemsToSave[data.index + 1] = switch1;
    }
    this.transformItems();
  }

  openVideo = () => {
    this.isVideoOpen = true;
    this.videoPlayer.nativeElement.play();
  };

  transformItems(){
    this.itemsTransformed = this.itemsToSave.map((i) => {
      if(this.query.length > 2) {
        let stepTransformed = {...i};
        stepTransformed.text = i.text.replace(new RegExp(`(${this.query})`, 'gi'), '<mark>$1</mark>');
        return stepTransformed;
      }
      return i;
    });
  }

  updateSteps = () => { this.stepsUpdated.emit(this.itemsToSave) };
}
