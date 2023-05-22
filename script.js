let disp_pswd = document.getElementById("disp_pswd");
let copy_cont = document.querySelector("[copy_content]");
let copy_msg=document.getElementById("tooltip");
let length_pswd = document.getElementById("pswd-length");
let slider = document.querySelector("[range_slider]");
let upper = document.getElementById("uppercase");
let lower = document.getElementById("lowercase");
let number = document.getElementById("numbers");
let symbol = document.getElementById("symbols");
let indicator = document.getElementById("indicator");
let generate_pswd = document.getElementById("generate_pswd");
let allCheck=document.querySelectorAll("input[type=checkbox]");

// initialization
let password = "";
let count = 0;
let password_length = 7;

let new_symbol = "`~!@#$%^&*()_+=-{}[]:;'.,/?|";

handle_slider();

function handle_slider() {
  slider.value = password_length;
  length_pswd.innerText = password_length;
  
const min=slider.min;
const max=slider.max;
slider.style.backgroundSize = ( (password_length - min)*100/(max - min)) + "% 100%";
}

function setIndicator(color){
  indicator.style.backgroundColor=color;
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}


function getrandom_interger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getUppercase() {
  return String.fromCharCode(getrandom_interger(65, 91));
}
function getlowercase() {
  return String.fromCharCode(getrandom_interger(97, 123));
}

function getnumber() {
  return getrandom_interger(0, 9);
}

function getSymbols() {
  return new_symbol.charAt(getrandom_interger(0, new_symbol.length));
}

function calstrength() {
  let up = false;
  let low = false;
  let sym = false;
  let num = false;
  if (upper.checked) up = true;
  if (lower.checked) low = true;
  if (symbol.checked) sym = true;
  if (number.checked) num = true;

  if (up && low && (sym || num) && password_length >= 8) setIndicator("#0f0");
  else if ((up || low) && (sym || num) && password_length >= 6)
    setIndicator("#ff0");
  else 
  setIndicator("#f00");
}

async function copyContent(){
    try{
        // clippoard par value copy kare
         await navigator.clipboard.writeText(disp_pswd.value);
         copy_msg.innerText="Copied";

    }
    catch{
copy_msg.innerText="failed";
    }

    // copied text ko visible karana h
    copy_msg.classList.add('active');

    setTimeout(() => {
        // hide karana h text ko
        copy_msg.classList.remove("active");
    }, 2000);


}

slider.addEventListener('input',(e)=>{
    password_length=e.target.value;
    handle_slider();
});


// count checkboxes

function handlecheckbox(){

    count=0;
    // if any checkbox checked then start
    // with first checkbox count and till end


    allCheck.forEach((element)=>{
        if(element.checked)
        count++;


    });
    console.log(count);

}

// to traverse all the checkboxes
allCheck.forEach(element => {
    element.addEventListener('change',handlecheckbox);
    
});

copy_cont.addEventListener('click',()=>{
  if(disp_pswd.value)
  copyContent();
});

function shuffle(pas){
  for(let i=pas.length-1;i>0;i--)
  {
    let j=Math.floor(Math.random()*(i+1));
    //swap
    let temp=pas[i];
    pas[i]=pas[j];
    pas[j]=temp;
  }

  let ps="";
  pas.forEach((e)=>{
    ps+=e;
  });
  return ps;
}


generate_pswd.addEventListener('click',()=>{
  if(count==0)
  return;

  if(password_length<slider.value)
  {
    password_length=slider.value;
    handle_slider();

  }

  password="";
  console.log("checking");
  let arr=[];
  if(lower.checked)
  arr.push(getlowercase);
  if(upper.checked)
  arr.push(getUppercase);
  if(number.checked)
  arr.push(getnumber);
  if(symbol.checked)
  arr.push(getSymbols);

  // compulsory addition
  
  for(let i=0;i<arr.length;i++)
  {
    password+=arr[i]();

  }
  console.log("after comp");
  // remaining addition

  for(let i=0;i<(password_length-arr.length);i++)
  {
    let random = getrandom_interger(0,arr.length);
    password+=arr[random]();
  }

  console.log("after remaining");

  let p=shuffle(Array.from(password));
  console.log("after shuffle "+ p);
  disp_pswd.value=p;
  calstrength();



})






