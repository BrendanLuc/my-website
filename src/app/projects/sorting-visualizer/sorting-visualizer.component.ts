import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorting-visualizer',
  templateUrl: './sorting-visualizer.component.html',
  styleUrls: ['./sorting-visualizer.component.scss']
})
export class SortingVisualizerComponent implements OnInit {

  SORTING_ARRAY: number[] = [];
  ARRAY_SIZE: number = 100;
  VIS_MIN: number = 5;
  VIS_MAX: number = 650;

  PRIMARY_COLOR = '#6cc3d5';
  SECONDARY_COLOR = '#fd7e14';
  SWAP_COLOR = '#56cc9d';
  RUN_STATUS = false;

  constructor() { }

  ngOnInit(): void {
    console.log("ngONIT")
    this.reset_array();
  }

  reset_array() {
    console.log("reset array")
    this.SORTING_ARRAY = []
    for (let i = 0; i < this.ARRAY_SIZE; ++i) {
      this.SORTING_ARRAY.push(this.get_random_int(this.VIS_MIN, this.VIS_MAX));
    }
    console.log(this.SORTING_ARRAY)
  }

  get_random_int(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
    // maximum is exclusive and the minimum is inclusive
  }

  animateBubbleSort() {
    console.log("Bubble Sort")
  }
  
  animateInsertionSort() {
    console.log("Insertion Sort")
  }  
  
  animateMergeSort() {
    console.log("Merge Sort")
  }  
  
  animateSelectionSort() {
    console.log("Selection Sort")
  }

  toggleRunning() {
    console.log("Toggle State")
    this.RUN_STATUS = !this.RUN_STATUS
    console.log(this.RUN_STATUS)

  }


}
