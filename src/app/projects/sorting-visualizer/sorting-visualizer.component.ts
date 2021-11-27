import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sorting-visualizer',
  templateUrl: './sorting-visualizer.component.html',
  styleUrls: ['./sorting-visualizer.component.scss']
})
export class SortingVisualizerComponent implements OnInit {

  SORTING_ARRAY: number[] = [];
  ARRAY_SIZE: number = 25;
  VIS_MIN: number = 5;
  VIS_MAX: number = 650;
  ANIMATION_SPEED_MS = 1;
  CYCLE = 0;
  RUN_STATUS = false;
  NEW_STATE = false;
  IS_SORTED = false;

  constructor() {}

  ngOnInit(): void {
    this.reset_array();
  }

  toggleRunning() {
    this.RUN_STATUS = !this.RUN_STATUS
    console.log(this.RUN_STATUS)
  }

  // reset array and state flagss
  async reset_array() {
    this.NEW_STATE = true;
    this.RUN_STATUS = false;
    this.IS_SORTED = false;
    this.CYCLE = this.CYCLE + 1;
    let new_array: number[] = []
    for (let i = 0; i < this.ARRAY_SIZE; ++i) {
      new_array.push(this.get_random_int(this.VIS_MIN, this.VIS_MAX));
    }
    this.SORTING_ARRAY = new_array
    return;

  }

  // reset array and reset css
  async reset_array_click() {
    // console.log(this.IS_SORTED)
    // console.log(this.NEW_STATE)
    if (!this.IS_SORTED && !this.NEW_STATE) return;
    this.reset_array()
    // let arrayBars = document.getElementsByClassName('array-bar');
    // for (let j = 0; j < this.ARRAY_SIZE; ++j){
    //   arrayBars[j].setAttribute("target", "_primary")
    // }
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
    // animations [[index1, index2, isswap], [], [], ...]
    var animations: number[][] = [];
    if (array.length <= 1) { 
      console.log("No Animations")
      return animations;
    }
    animations = this.bubble_sort(array, animations);
    // console.log("RETURNING ANIMATIONS")
    // console.log(animations)
    return animations;
  }

  ///////////

  // get the animations for bubble sort and process them in the front end
  async animateBubbleSort() {
    // if numbers have been modified, return
    if (!this.NEW_STATE) return;
    
    this.NEW_STATE = false;
    this.RUN_STATUS = true;
    let cycle_temp = this.CYCLE;

    console.log(this.SORTING_ARRAY)
    // array shallow copy to allow for checking and updating of state values
    let array_copy = Object.assign([], this.SORTING_ARRAY);
    console.log(array_copy)
    let animations = this.get_bubble_sort_animations(array_copy);
    // console.log(this.SORTING_ARRAY)
    // console.log(array_copy)
    // console.log(animations)

    //animate
    for (let i = 0; i < animations.length; i++) {

      //user paused the animation, loop until played (is there a better way to do this?)
      while (!this.RUN_STATUS) await this.delay(10); 
      //user reset the array, quit animation
      // console.log("CYCLE", this.CYCLE)
      // console.log("TEMP", cycle_temp)

      if (this.CYCLE !== cycle_temp) {
        console.log('BREAKED');
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
        let firstHeight = arrayBars[firstBar].getAttribute("style");
        let secondHeight = arrayBars[secondBar].getAttribute("style");
        arrayBars[firstBar].setAttribute("style", String(secondHeight));
        arrayBars[secondBar].setAttribute("style", String(firstHeight));
        await this.delay(this.ANIMATION_SPEED_MS);
      }

      // unhighlight
      arrayBars[firstBar].setAttribute("target", "_primary");
      arrayBars[secondBar].setAttribute("target", "_primary");
      await this.delay(this.ANIMATION_SPEED_MS);
    }
    this.IS_SORTED = true;
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
