let w;
let h;
let arr;
let scl = 11;

let index;

let starto = false;
let history;
let left;
let right;

function starting() {
  const limit = arr.length > history.length ? arr.length : history.length;
  if (starto && index >= limit) {
    setup();
    starto = !starto;
  }
  if (!starto) {
  switch (document.getElementById('selectSort').value) {
    case 'SelectionSort':
      sortingFunc = selectionSort;
      break;
    case 'BubbleSort':
      sortingFunc = bubbleSort;
      break;
    case 'MergeSort':
      mergeSort();
      arr = history[index];
      sortingFunc = showHistory;
      break;
    case 'QuickSort':
      quickSort();
      arr = history[index];
      sortingFunc = showHistory;
      break;
    default:
      console.log('Weird stuff');
  }
}
  starto = !starto;
}


function setup() {
  index = 0;
  history = [];
  w = windowWidth - (windowWidth / 10);
  h = windowHeight - (windowHeight / 10);
  arr = Array.from({length: Math.floor(w / scl)}, () => Math.floor(Math.random() * Math.floor(h) ));

  left = 0;
  right = arr.length - 1;
  // arr.sort((a, b) => { return (a < b ? -1 : 1);});

  
  createCanvas(w, h);
  background(color(70, 70, 240));

  // frameRate(120);

  showGrid();
}
let minIndex = function() {
  let min = index;
  for (let i = index + 1; i < arr.length; i++) {
    if (arr[min] > arr[i]){
      min = i;
    }
  }
  return min;
}

let sortingFunc = function() {
}

function selectionSort() {
  if (index < arr.length) {
    const min = minIndex(index);
    let tmp = arr[min];
    arr[min] = arr[index];
    arr[index] = tmp;
    index++;
  }
}

function bubbleSort() {
  for (let j = 0; j < arr.length - index - 1; j++) {
    if (arr[j] > arr[j+1]) { 
      // swap arr[j+1] and arr[i] 
      let tmp = arr[j]; 
      arr[j] = arr[j+1]; 
      arr[j+1] = tmp; 
    }
  }
  index++;
}

function merge(l, m, r) {
  let n1 = m - l + 1;
  let n2 = r - m;


  let L = new Array(n1);
  let R = new Array(n2);

  for (let i=0; i < n1; i++) {
    L[i] = arr[l + i];
  }
  for (let j=0; j < n2; j++) {
    R[j] = arr[m + 1 + j];
  }
  let i = 0;
  let j = 0;

  let k = l;

  while (i < n1 && j < n2) { 
    if (L[i] <= R[j]) 
    { 
      arr[k] = L[i];
      history.push([...arr]);
      i++;
    } else { 
      arr[k] = R[j];
      history.push([...arr]);
      j++; 
    } 
    k++; 
  }
  while (i < n1) { 
    arr[k] = L[i]; 
    i++; 
    k++; 
  } 
  while (j < n2) { 
    arr[k] = R[j]; 
    j++; 
    k++; 
  }
}

function mergeSort(l = 0, r = arr.length - 1) {
  if (l < r) {
    let m = Math.floor((l + r) / 2);
    right = m;
    mergeSort(l, m);
    left = m + 1;
    right = r;
    mergeSort(m + 1, r);
    merge(l, m, r);
  }
}

function swap(i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function partition(low, high) {
  let pivot = arr[high];
  let i = (low - 1);
  
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(i, j);
      history.push([...arr]);
    }
  }
  swap(i + 1, high);
  history.push([...arr]);
  return i + 1;
}

function quickSort(low = 0, high = arr.length - 1) {
  if (low < high) {
    let pi = partition(low, high);
    quickSort(low, pi - 1);
    quickSort(pi + 1, high);
  }
}

function showGrid() {
  background(color(70, 70, 240));
    for (let i = 0; i < arr.length; i++) {
      stroke(color(0, 102, 255));
      rect(i * scl, h - arr[i], scl, arr[i]);
      // line(i * scl, h, i * scl, h - arr[i]);
    }
}

function showHistory() {
  if (index < history.length) {
    arr = history[index];
    index++;
  }
}

function draw() {
  showGrid();
  if (starto) {
    sortingFunc();
  }
}