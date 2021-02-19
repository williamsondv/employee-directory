let employees;
let html = " ";
const gridContainer = document.getElementById('main');
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const rightArrow = document.querySelector(".right-arrow");
const leftArrow = document.querySelector(".left-arrow");
let currentIndex = 0;
let card;



  fetch(`https://randomuser.me/api/?results=12&inc=name, picture,
  email, location, phone, dob &noinfo &nat=US`)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err))
  

  function displayEmployees(employeeData) {
    employees = employeeData;
    employees.forEach((employee, index) => {
        if(employee) {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        html += `<div class="card" data-index="${index}">
                  <div class="text-container">
                    <img class="avatar" src="${picture.large}" />
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                  </div>
                </div>`
        }

    });
        gridContainer.innerHTML = html;
  }

  function displayModal(index) {
    currentIndex = index;
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div>
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address"><a class="left-arrow"><span class="left"></span></a>${city}<a class="right-arrow"><span class="right"></span></a></p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
    selectEmployeeArrows();
    }

    gridContainer.addEventListener('click', e => {
        if (e.target !== gridContainer) {
                const card = e.target.closest(".card");
                const index = card.getAttribute('data-index');
                displayModal(index);
            }
        });

    modalClose.addEventListener('click', () => {
            overlay.classList.add("hidden");
            });
           
    //search function to filter employees by name
    function searchFunction() {
        let input = document.getElementById("search-bar");
        let filter = input.value.toUpperCase();
        let thumb = document.getElementsByClassName('text-container');
        let searchString;
           
        for(let i = 0; i < 12; i++) {
            searchString = thumb[i].firstElementChild.nextElementSibling.textContent.toUpperCase();
            if(searchString.includes(filter)) {
                thumb[i].parentElement.style.display = "initial"; 
              } else {
                 thumb[i].parentElement.style.display = "none";
                }
                
               }
              
           }

    //eventlistener for arrows
    function selectEmployeeArrows() {
      let anchors = document.getElementsByTagName('a');
      
      for(let i = 0; i < 2; i++){
         anchors[i].addEventListener('click', function(event){
          if(event.target.classList == 'right' && employees[(parseInt(currentIndex,10))+1]) {
           displayModal((parseInt(currentIndex,10))+1);
          }
          if(event.target.classList == 'left' && employees[(parseInt(currentIndex,10))-1]) {
            displayModal((parseInt(currentIndex,10))-1);
            }
        });
    }
  }
    
          


    


