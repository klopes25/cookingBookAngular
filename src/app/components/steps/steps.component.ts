import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnChanges {
  @Input() items: Array<any>;
  @Input() edition = false;
  @Input() query = '';
  @Input() recipeID: number;
  @Input() video: boolean;
  isVideoOpen = false;
  itemsToSave: Array<any> = [];
  srcVideo = `../assets/video/${this.recipeID}.mp4`;
  @Output() stepsUpdated = new EventEmitter<any>();
  @ViewChild('newStep', {static: false}) private newStep: ElementRef<HTMLInputElement>;
  @ViewChild('videoPlayer', {static: false}) private videoPlayer: ElementRef<HTMLMediaElement>;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges){
    if (changes && changes.recipeID) {
      this.srcVideo = `../assets/video/${changes.recipeID.currentValue}.mp4`;
    }
    this.itemsToSave = (changes && changes.items) ? this.items.map((i) => i) : this.itemsToSave;
    this.query = (changes && changes.query) ? changes.query.currentValue : this.query;

    this.cdRef.detectChanges();
  }

  addStep(){
    if (this.newStep.nativeElement.value !== ''){
      const newStep = {
        text: this.newStep.nativeElement.value,
        index: this.items.length
      };
      this.itemsToSave.push(newStep);
      // clear input
      this.newStep.nativeElement.value = '';
    }
   }

  closeVideo = () => {
    this.isVideoOpen = false;
    this.videoPlayer.nativeElement.pause();
  }

  deleteStep(id: number){
    this.itemsToSave.splice(id, 1); // remove the ith element of items
  }

  majStep(data){
    this.itemsToSave[data.index] = {text: data.text, index: Number(data.index + 1)};
  }

  moveStep(data){ // { index: this.index, value: 1 or -1}
    if (data.value < 0){ // up
      if (data.index === 0) {
        return;
      }
      const switch1 = this.itemsToSave[data.index];
      const switch2 = this.itemsToSave[data.index - 1];
      this.itemsToSave[data.index] = switch2;
      this.itemsToSave[data.index - 1] = switch1;
    } else { // down
      if (data.index === (this.itemsToSave.length - 1)) {
        return;
      }
      const switch1 = this.itemsToSave[data.index];
      const switch2 = this.itemsToSave[data.index + 1];
      this.itemsToSave[data.index] = switch2;
      this.itemsToSave[data.index + 1] = switch1;
    }
  }

  openVideo = () => {
    this.isVideoOpen = true;
    this.videoPlayer.nativeElement.play();
  }

  updateSteps = () => { this.stepsUpdated.emit(this.itemsToSave); };
}
