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
  // PRIMARY_COLOR = 'blue';
  // SECONDARY_COLOR = 'green';
  // SWAP_COLOR = 'orange';
  RUN_STATUS = false;
  NEW_STATE = false;
  ANIMATION_SPEED_MS = 250
  // cycle
  // newstate


  constructor() {}

  ngOnInit(): void {
    console.log("ngONIT")
    this.reset_array();
  }

  // may need a reset on click as well for opacity

  reset_array() {
    console.log("reset array")
    this.NEW_STATE = true;
    this.RUN_STATUS = false;
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

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  swap(x: number, array: number[]) {
    let temp = array[x];
    array[x] = array[x+1];
    array[x+1] = temp;
  }

  bubble_sort(array: number[], animations:number[][]) {
    let arrayLength = array.length;
    for (let i = 0; i < arrayLength - 1; i++) {
        for (let j = 0; j < arrayLength - i - 1; j++) {
            if (array[j] > array[j+1]) {
                this.swap(j, array);
                animations.push([j, j+1, 1]);
            }
            else animations.push([j, j+1, 0]);
        }
    }
    // console.log("SORTED");
    // console.log("1")
    // console.log(array)
    // console.log("2")
    // console.log(animations)
    return animations;
  }

  get_bubble_sort_animations(array: number[]) {
    console.log("GET BUBBLE SORT ANIMATIONS")
    var animations: number[][] = [];
    if (array.length <= 1) { 
      console.log("RETURN -1")
      return animations;
    }
    animations = this.bubble_sort(array, animations);
    console.log("RETURNING ANIMATIONS")
    console.log(animations)
    return animations;
  }


  async animateBubbleSort() {
    console.log("Bubble Sort")
    // if numbers have been modified, return
    if (!this.NEW_STATE) {
      return;
    }

    this.NEW_STATE = false;
    this.RUN_STATUS = true;

    // sorted array shallow copy to allow for checking and updating of state values
    let array_copy = Object.assign([], this.SORTING_ARRAY);
    console.log(array_copy)
    let animations = this.get_bubble_sort_animations(array_copy);
    console.log(array_copy)
    console.log(this.SORTING_ARRAY)

    //animate
    for (let i = 0; i < animations.length; i++) {
      //user paused the animation, loop until played (is there a better way to do this?)
      while (!this.RUN_STATUS) {
        this.delay(10); 
      }

      let arrayBars = document.getElementsByClassName('array-bar');
      // get indexes and styles of array values
      let firstBar = animations[i][0]
      let secondBar = animations[i][1]
      let isSwap = animations[i][2]
    
      // highlight values being compared
      // SECONDAY_COLOR shows comparison, SWAP_COLOR shows swap
      arrayBars[firstBar].setAttribute("target", "_secondary")
      arrayBars[secondBar].setAttribute("target", "_secondary")
      await this.delay(this.ANIMATION_SPEED_MS);

      // show swap if there is one
      if (isSwap==1) {
          arrayBars[firstBar].setAttribute("target", "_swap")
          arrayBars[secondBar].setAttribute("target", "_swap")
          const firstHeight = arrayBars[firstBar].getAttribute("style");
          const secondHeight = arrayBars[secondBar].getAttribute("style");
          arrayBars[firstBar].setAttribute("style", String(secondHeight))
          arrayBars[secondBar].setAttribute("style", String(firstHeight))
          await this.delay(this.ANIMATION_SPEED_MS);
      }
      
      // unhighlight
      arrayBars[firstBar].setAttribute("target", "_primary")
      arrayBars[secondBar].setAttribute("target", "_primary")
      await this.delay(this.ANIMATION_SPEED_MS);
  }
  // await this.setStateAsync({running: false});
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
