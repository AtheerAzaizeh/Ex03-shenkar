let Colors = ['purple', 'green', 'orange', 'blue'];
var wrapper = document.getElementById('wrapper');
var count = 0;
var s = true;

var ButtonAdd = document.getElementById('ButPlus');
var ButtonSub = document.getElementById('ButMinus');
var ButtonSwitch = document.getElementById('ButSwitch');

function EnterName() {
  var input = document.createElement('input');
  var button = document.createElement('button');
  var Header = document.querySelector('header');
  var div = document.createElement('div');

  input.placeholder = 'Enter Your Name';
  input.type = 'text';
  input.style.height = '35px';
  input.style.padding = '7px';

  button.style.height = '35px';
  button.style.margin = '7px';
  button.style.padding = '7px';
  button.textContent = 'Submit';
  button.style.cursor = 'pointer';

  div.style.position = 'absolute';
  div.style.marginRight = '50%';

  div.appendChild(input);
  div.appendChild(button);
  Header.appendChild(div);

  button.addEventListener('click', click);

  function click() {
    var username = input.value;

    if (username) {
      localStorage.setItem('username', username);
      button.disabled = 'false';
      input.disabled = 'false';
      console.log('Username from localStorage:', username);
    } else {
      alert('Please Enter Name');
    }
  }
  input.addEventListener('keypress', EnterPress);

  function EnterPress(event) {
    const enterkey = event.key;

    if (enterkey === 'Enter') {
      click();
    } else {
      return null;
    }
  }
}

window.onload = () => {
  ButtonAdd.addEventListener('click', addRectangle);
  ButtonSub.addEventListener('click', subtractRectangle);
  ButtonSwitch.addEventListener('click', switchRectanglesSongs);

  ButtonAdd.addEventListener('mouseover', mouseover);
  ButtonAdd.addEventListener('click', mouseover);
  ButtonAdd.addEventListener('mouseout', mouseout);

  ButtonSub.addEventListener('mouseover', mouseover);
  ButtonSub.addEventListener('click', mouseover);
  ButtonSub.addEventListener('mouseout', mouseout);

  ButtonSwitch.addEventListener('mouseover', mouseover);
  ButtonSwitch.addEventListener('mouseout', mouseout);

  localStorage.removeItem('username');

  function mouseover(event) {
    var button = event.target;

    if (button === ButtonAdd || button === ButtonSub) {
      let NextColor = chooseRectangleColor();
      button.style.backgroundColor =
        button === ButtonAdd ? NextColor[0] : NextColor[1];
      button.style.transition = 'all 0.2s';
      button.style.padding = '18px';
    } else if (button === ButtonSwitch) {
      button.style.backgroundColor = 'lime';
      button.style.transition = 'all 0.2s';
      button.style.padding = '18px';
    }
  }

  function mouseout(event) {
    var button = event.target;

    if (button == ButtonAdd || button == ButtonSub) {
      button.style.backgroundColor = 'aliceblue';
      button.style.padding = '15px';
    } else if (button == ButtonSwitch) {
      button.style.backgroundColor = 'aliceblue';
      button.style.padding = '15px';
    }
  }

  EnterName();
};

function initRectangles() {
  var div = document.createElement('div');
  div.className = 'rectangle';
  div.style.textAlign = 'center';
  div.style.margin = '20px 0px 20px 20px';
  div.style.width = '150px';
  div.style.height = '150px';
  console.log('Create Rectangle', div);
  var Name = localStorage.getItem('username');

  if (Name) {
    var NameWithoutSpace = Name.replace(/\s+/g, '');
    var NameArray = NameWithoutSpace.split('');

    while (count >= NameArray.length) {
      count = 0;
    }

    div.innerHTML = NameArray[count];
    div.style.display = 'none';
    count++;
  } else {
    var myName = 'Atheer Azaizeh';
    var myNameWithoutSpace = myName.replace(/\s+/g, '');
    var MyName = myNameWithoutSpace.split('');

    while (count >= MyName.length) {
      count = 0;
    }

    div.innerHTML = MyName[count];
    div.style.display = 'none';
    count++;
  }

  wrapper.appendChild(div);
}

function initSongs() {
  fetch('data/music.json')
    .then((response) => response.json())
    .then((data) => {
      populateSongsInList(data);
    })
    .catch((error) => {
      console.error('Error fetching the JSON file:', error);
    });
}

function chooseRectangleColor() {
  var divs = document.querySelectorAll('.rectangle');
  if (divs.length >= 0) {
    var color = Colors[divs.length % Colors.length];
    divs[divs.length - 1].style.backgroundColor = color;
    return [Colors[(divs.length + 1) % Colors.length], color];
  } else {
    console.warn("No elements with class 'rectangle' found.");
    return null;
  }
}

function addRectangle() {
  initRectangles();
  chooseRectangleColor();
  var div = document.querySelector('.rectangle:last-child');
  div.style.display = 'inline-block';
}

function subtractRectangle() {
  var divs = document.querySelectorAll('.rectangle');
  if (divs.length > 0) {
    var LastDiv = divs[divs.length - 1];
    console.log('Delete Rectangle', LastDiv);
    LastDiv.parentNode.removeChild(LastDiv);
    count--;
    if (count < 0) {
      count = 0;
    }
  } else {
    alert('No Rectangels To Delete!');
  }
}

function switchRectanglesSongs() {
  if (s) {
    ButtonSwitch.innerHTML = 'Switch To Rectangles';
    ButtonAdd.style.pointerEvents = 'none';
    ButtonSub.style.pointerEvents = 'none';
    initSongs();
    console.log('Json File', true);
    console.log('Rectangles Page', false);
  } else {
    ButtonSwitch.innerHTML = 'Switch To Songs';
    ButtonAdd.style.pointerEvents = 'all';
    ButtonSub.style.pointerEvents = 'all';

    var allElements = wrapper.querySelectorAll('*');

    console.log('Json File', false);
    console.log('Rectangles Page', true);

    allElements.forEach(function (element) {
      if (element.classList.contains('rectangle')) {
        element.style.display = 'inline-block';
      } else {
        element.style.display = 'none';
      }
    });
  }

  s = !s;
}

function populateSongsInList(data) {
  var elements = document.querySelectorAll('.rectangle');

  elements.forEach(function (element) {
    element.style.display = 'none';
  });

  var title = document.createElement('h1');
  console.log('Create h1 = ', title);
  title.style.color = 'white';
  title.style.textAlign = 'center';
  title.style.marginBottom = '13px';

  title.textContent = data.title;
  wrapper.appendChild(title);

  var ul = document.createElement('ul');

  data.songs.forEach(function (song) {
    var li = document.createElement('li');
    console.log('Create li', li);
    li.textContent = `${song.id} - ${song.artist} - ${song.title}`;
    ul.appendChild(li);
  });
  console.log('Create ul', ul);

  wrapper.appendChild(ul);

  ul.style.listStyleType = 'none';
  ul.style.color = 'white';
}
