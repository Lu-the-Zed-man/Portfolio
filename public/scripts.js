//Get the tab links and tab contents elements
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

//Function to open a tab
function opentab(tabname){

    //Remove the active class from all the tab links
    for (tablink of tablinks){
        tablink.classList.remove("active-link");
    }

    //Remove active class from all the tab contents
    for (tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }

    //Add active class to the current tab link and tab content
    event.currentTarget.classList.add("active-link")
    document.getElementById(tabname).classList.add("active-tab");
}


//Get the side menu element
var sidemenu = document.getElementById("sidemenu");

//Function to open the side menu
function openmenu(){
    sidemenu.style.right = "0";
}

//Function to close the side menu
function closemenu(){
    sidemenu.style.right = "-200px";
}


//Get the contact form and message span elements
const form = document.getElementById('contactForm');
const msg = document.getElementById('msg');

//Add event listener to handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();//Prevent default form submission

    //Collect form data into an object
    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    //Send form data to the server via a POST request
    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    })
    .then(response => response.text())
    .then(data => {
        //Display server response in the message span
        msg.innerHTML = data;
        setTimeout(() => {
            msg.innerHTML = '';
        }, 5000);
        form.reset(); //Reset the form fields
    })
    .catch(error => {
        console.error('Error!', error.message);//Log any errors
    });
});
