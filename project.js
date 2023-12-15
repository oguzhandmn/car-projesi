
const form = document.getElementById("car-form");
const titleElement =document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-cars");

// UI OBJESINI BASLATMA

const ui = new UI();


const storage = new Storage();


// tum evenleri yukleme isi 
eventListeners();

function eventListeners (){
// submit olusturma
form.addEventListener("submit",addCar);

// storage icin 
document.addEventListener("DOMContentLoaded",function(){

let cars = storage.getCarsFromStorage();
ui.loadAllCars(cars); 


});
// silme islemi
cardbody.addEventListener("click",deleteCar);

// hepsini silme 

clear.addEventListener("click",clearAllCars);



}


function addCar (e){

const title = titleElement.value;
const price = priceElement.value;
const url = urlElement.value;

if( title === "" || price === "" || url === "" ){

    // hata
    ui.displayMessages("tum alanlari doldurun...","danger");

}
else{
    // yeni arac  
    const newCar = new Car(title,price,url);

    ui.addCarToUI(newCar);
    
   storage.addCarToStorage(newCar);


    ui.displayMessages("arac basariyla eklendi","success");
    // ARAYUZE ARAC EKLEME 

}
ui.clearInput(titleElement,urlElement,priceElement);

e.preventDefault();

}


function deleteCar (e){
if(e.target.id=== "delete-car"){
    ui.deleteCarFromUI(e.target);

    storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);


    ui.displayMessages("silme islemi basariyla gerceklesti...","success");


}


}

function clearAllCars (e){
    

     if(confirm("tum aracclar silenecek eminmisiniz ?")){
        ui.clearAllCarsFromUI();
        storage.clearAllCarsFromStorage();
     }


}

