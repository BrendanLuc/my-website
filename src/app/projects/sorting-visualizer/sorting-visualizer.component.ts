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
  ANIMATION_SPEED_MS = 1;
  CYCLE = 0;
  RUN_STATUS = false;
  NEW_STATE = false;

  constructor() {}

  ngOnInit(): void {
    this.reset_array();
  }

  toggleRunning() {
    console.log("Toggle State")
    this.RUN_STATUS = !this.RUN_STATUS
    console.log(this.RUN_STATUS)
  }

  // reset array and state flagss
  async reset_array() {
    this.NEW_STATE = true;
    this.CYCLE = this.CYCLE + 1;
    this.RUN_STATUS = true;
    this.SORTING_ARRAY = []
    for (let i = 0; i < this.ARRAY_SIZE; ++i) {
      this.SORTING_ARRAY.push(this.get_random_int(this.VIS_MIN, this.VIS_MAX));
    }
    this.RUN_STATUS = false;
  }

  // reset array and reset css
  async reset_array_click() {
    this.reset_array()
    let arrayBars = document.getElementsByClassName('array-bar');
    for (let j = 0; j < this.ARRAY_SIZE; ++j){
      arrayBars[j].setAttribute("target", "_primary")
    }
    // console.log(this.SORTING_ARRAY)
  }

  // function to get random integer
  get_random_int(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
    // maximum is exclusive and the minimum is inclusive
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  ///////////

  // swap function DONE
  swap(x: number, array: number[]) {
    let temp = array[x];
    array[x] = array[x+1];
    array[x+1] = temp;
  }

  // bubble sort function, that returns an array of animations DONE
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
    return animations;
  }

  // get bubble sort animations array
  get_bubble_sort_animations(array: number[]) {
    // console.log("GET BUBBLE SORT ANIMATIONS")
    var animations: number[][] = [];
    if (array.length <= 1) { 
      console.log("RETURN -1")
      return animations;
    }
    animations = this.bubble_sort(array, animations);
    // console.log("RETURNING ANIMATIONS")
    // console.log(animations)
    return animations;
  }

  ///////

  // get the animations for bubble sort and process them in the front end
  async animateBubbleSort() {
    // if numbers have been modified, return
    if (!this.NEW_STATE) return;
    
    this.NEW_STATE = false;
    this.RUN_STATUS = true;
    let cycle_temp = this.CYCLE;

    // array shallow copy to allow for checking and updating of state values
    let array_copy = Object.assign([], this.SORTING_ARRAY);
    let animations = this.get_bubble_sort_animations(array_copy);
    console.log(this.SORTING_ARRAY)
    console.log(array_copy)
    console.log(animations)

    //animate
    for (let i = 0; i < animations.length; i++) {

      //user paused the animation, loop until played (is there a better way to do this?)
      while (!this.RUN_STATUS) await this.delay(10); 
      //user reset the array, quit animation
      if (this.CYCLE !== cycle_temp) {
        console.log('BREAKED')
        return;
      }

      // get array bar class
      let arrayBars = document.getElementsByClassName('array-bar');
      // get the comparison bars and swap from animations list
      let firstBar = animations[i][0]
      let secondBar = animations[i][1]
      let isSwap = animations[i][2]
    
      // highlight values being compared
      // SECONDAY_COLOR shows comparison, SWAP_COLOR shows swap
      arrayBars[firstBar].setAttribute("target", "_secondary");
      arrayBars[secondBar].setAttribute("target", "_secondary");
      await this.delay(this.ANIMATION_SPEED_MS);

      // show swap if there is one
      if (isSwap==1) {
        arrayBars[firstBar].setAttribute("target", "_swap");
        arrayBars[secondBar].setAttribute("target", "_swap");
        const firstHeight = arrayBars[firstBar].getAttribute("style");
        const secondHeight = arrayBars[secondBar].getAttribute("style");
        arrayBars[firstBar].setAttribute("style", String(secondHeight));
        arrayBars[secondBar].setAttribute("style", String(firstHeight));
        await this.delay(this.ANIMATION_SPEED_MS);
      }

      // unhighlight
      arrayBars[firstBar].setAttribute("target", "_primary");
      arrayBars[secondBar].setAttribute("target", "_primary");
      await this.delay(this.ANIMATION_SPEED_MS);
    }

    return;
  }
  
  async animateInsertionSort() {
    // if numbers have been modified, return
    if (!this.NEW_STATE) return;
  }  
  
  async animateMergeSort() {
    // if numbers have been modified, return
    if (!this.NEW_STATE) return;
  }  
  
  async animateSelectionSort() {
    // if numbers have been modified, return
    if (!this.NEW_STATE) return;  
  }


}
