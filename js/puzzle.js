// https://stackoverflow.com/questions/30877617/uncaught-referenceerror-is-not-defined-onclick-when-using-character-strings

function shuffle(given) {
  var randomized = new Array;
  var x = 0;
  var e = 0;
  while (randomized.length < given.length) {
    var rand = Math.floor((Math.random() * given.length) + 0);
    var y = 0;
    while (y <= randomized.length) {
      i = 0;
      var result = false;
      while (i <= randomized.length) {
        if (randomized[i] == given[rand]) {
          //Return true
          result = true;
        }
        i++;
      }
      if (result == false) {
        // Match not found so assign value to randomized array
        randomized[e] = given[rand];
        e++;
      }
      y++;
    }
    x++;
  }
  // Unset variables
  var x, e, i, y, result;
  return randomized;
}

const GetMatrix = (number) => {
  var Y = number > 12 ? 4 : number > 8 ? 3 : number > 4 ? 2 : 1
  var X = [1, 5, 9, 13].includes(number) ? 1 : [2, 6, 10, 14].includes(number) ? 2 : [3, 7, 11, 15].includes(number) ? 3 : 4;
  return { X, Y }
}

var images = "images/slices/doge/"; //The folder where the slices at
var image = "doge";
var ext = ".jpg";

var Clipboard = null;
var XClipBoard = null;
var MoveCount = 0;

const handleClick = (item) => {
  var [value, position] = item.children;
  value = value.innerHTML;
  position = position.innerHTML;


  console.log()

  if (Clipboard == null) {
    // Copy latest value onto clipboard 
    item.setAttribute('class', "item selectedCell")
    Clipboard = value;
    XClipBoard = item;
  }
  else {
    // Paste value from clipboard  
    item.children[0].innerHTML = Clipboard;
    item.children[2].setAttribute('src', `${images}/${image}_${Clipboard}.jpg`)
    item.setAttribute('class', `item`)
    Clipboard = null;
    // Move the current value to the previous cell 
    XClipBoard.children[0].innerHTML = value;
    XClipBoard.children[2].setAttribute('src', `${images}/${image}_${value}.jpg`)
    XClipBoard.setAttribute('class', `item`)
    MoveCount++;
  }
}


const Item = ({ ...props }) => {
  let { value, position } = props;
  return `<div class="item" id=${position} onclick="handleClick(this)" >
  <h1>${value}</h1>
  <label>${position}</label>
  <img src="${images}/${image}_${value}.jpg" />
</div>
`
}

const Splash = () => {
  return `<div class="splashContainer" id="splash">
    <div class="gameover">
      <button id="exitSplash" src="images/icons/exit.svg" class="exit" onclick="ExitSplash()">
        X
      </button>
      <span>🎉 🎉</span>
      <h2>You Won!!</h2>
      <!-- 🎮 -->
      <button onclick="Start()">Play Again </button>
    </div>
  </div>`
}


const Order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
// const ShuffledOrder = Alphabet.split(',')

const Start = () => {
  if (document.getElementById('splash')) {
    ExitSplash();
  }
  MoveCount = 0;
  Clipboard = null;
  XClipBoard = null;
  // 
  const ShuffledOrder = shuffle(Order)
  // 
  console.log(ShuffledOrder)
  document.getElementById("itemsContainer").innerHTML = "";
  ShuffledOrder.map((letter, index) =>
    document.getElementById("itemsContainer").innerHTML += (Item({
      value: letter, position: index + 1
    }))
  )
}

document.getElementById('itemsContainer').addEventListener('click', () => {
  var pass = false;
  var shouldBreak = false;
  !shouldBreak ? Order.map(
    (letter, index) => {
      if (parseInt(document.getElementById('itemsContainer').children[index].children[0].innerHTML) !== letter) {
        shouldBreak = true;
      }
      else {
        pass = true
      }
    }) : console.log("BREAK")
  if (pass && !shouldBreak) {
  }

  var Won = false;

  MoveCount > 2 ? Won = pass && !shouldBreak : null;

  if (Won) {
    MoveCount = 0;
    Clipboard = null;
    XClipBoard = null;
    document.getElementById('main').innerHTML += Splash();
  }
  else {
    console.log("Keep Going")
  }


  console.log(`Move Count: ${MoveCount}`)
})

const ExitSplash = () => {
  document.getElementById('splash').remove()
}