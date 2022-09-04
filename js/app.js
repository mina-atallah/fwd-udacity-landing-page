

//  Start global variables

const menu = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

// making array of li named anchors so we can be able to access to it later
const links = [];

// a menu icon  when clicked on it shows navigation links
const menuIcon = document.getElementById('menu__icon').addEventListener('click', () => {

  // a class added to menu to control the links postion on other devices
  menu.classList.toggle('activee');


});

// End Global variables

let Start = performance.now();

// build Navi function
function buildNav() {

  // build nav dynamically (depending on numbers of sections)
  for (const section of sections) {

    // creating li element
    const li = document.createElement('li');

    // creating anchor element
    const a = document.createElement('a');

    //append anchor to list element
    li.appendChild(a);

    // giving list element class with section's ID so it can be used later
    li.classList.add(`${section.id}`);

    //giving anchor href with section id so we can scroll into it
    a.classList.add(`${section.id}`);

    a.href = `#${section.id}`;

    // assigning a class name was given to list element
    a.className = 'menu__link';

    a.classList.add(`${section.id}`);

    // anchor element text using .textContent or .innterHTml
    a.innerHTML = section.getAttribute('data-nav');

    // // changing li style curser to poionter so the user knows it's clickable
    // li.style.cssText = "cursor: pointer";

    // appendy list element to menu
    menu.appendChild(li);

    // pushing anchors element to an array so it can be looped later
    links.push(a);

  }
};
// calling the function
buildNav();

let end = performance.now();

console.log(end - Start + "millisecons");

links[0].classList.add('active');

links.forEach(link => {


  // using onclick event to scroll to section
  link.addEventListener('click', (e) => {

    //preventing the default behavior if code is activated
    e.preventDefault();

    // looping over sections;
    for (let section of sections) {

      // setting condition to scroll to the wanted section
      if (e.target.classList[1] === section.getAttribute('id'))

        // scrolling to section behavior using scrollIntroView
        section.scrollIntoView({ behavior: 'smooth' });

    }

  });

  //another approch
  // document.querySelector(e.target.getAttribute('href')).scrollIntoView({
  //   behavior: 'smooth'
  // });

});



/*
-- toggle active class while in viewport while scrolling
*/
window.addEventListener('scroll', (e) => {




  // setting a sectionID variables in function global scope so it can be accessed
  let sectionID = "";

  // looping over evry section
  sections.forEach(section => {

    section.classList.remove('your-active-class');


    // using getBoundingClinetRect section size
    let sectionSize = section.getBoundingClientRect().top;

    // setting condition if the wanted section when scrolling is after it's reached based on it's own height and distance from the top
    if (sectionSize <= section.offsetHeight - sectionSize - 140 && sectionSize >= screenTop - 170) {

      // current section id
      sectionID = section.id;

      // add class (activee) to the section to destinguish it in the developers tool
      section.classList.add('your-active-class');

    } else {
      // delete the active class
      section.classList.remove('your-active-class');

    }




    // looping over every anchors;
    links.forEach((link) => {

      // remove the active class so that we toggle it by section viewport
      link.classList.remove('active');

      // setting condition if the anchor(li) classList contians class = section's ID, then active class is added to this anchor
      if (link.classList.contains(sectionID)) {

        // adding the active class
        link.classList.add('active');

      }
    });

  });



});