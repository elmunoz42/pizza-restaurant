//business logic


////PizzaObjectMaker ////
function PizzaObjectMaker (pizzaNumber, pizzaType, toppings, specialToppings) {
  this.pizzaNumber=pizzaNumber;
  this.pizzaType= pizzaType;
  this.toppings=toppings;
  this.specialToppings=specialToppings;
}
//// pizzaMath/////
PizzaObjectMaker.prototype.pizzaMath = function (){
  return 10 + (this.toppings.length * 2) + (this.specialToppings.length * 3);
}
/// change 10 to this.type.cost //// make an object for each size of pizza

//// orderCounter ///
function orderCounter (number) {
  if (number===1) {
    return number + "st"
  }
  else if (number===2) {
    return number + "nd"
  }
  else if (number===3) {
    return number + "rd"
  }
  else if (number>3) {
    return number + "th"
  }
}
//// andAdder ////
function andAdder (phrase) {
  var wordArray = phrase.split(' ');
  console.log(wordArray);
  wordArray.splice((wordArray.length - 1),0," and")
  return wordArray.join(' ');
}
///// dollaBillz ////
function dollaBillz (number) {
  return "$" + number;
}










// user interface logic
$(document).ready(function() {
  console.log("hello");
  var pizzaCount=1;
  var orderTotal=0
  ///submit///
  $("form#order-form").submit(function(event) {
    event.preventDefault();
    console.log("submitted")
    var pizzaToppingsInput=[];
    var specialToppingsInput=[];

    ///Input///
    var pizzaTypeInput=$("#pizza-type").val();
    $("input:checkbox[name=toppings]:checked").each(function(){
      var chosenToppings = $(this).val();
      pizzaToppingsInput.push(chosenToppings);
    });
    $("input:checkbox[name=special-toppings]:checked").each(function(){
      var chosenSpecialToppings = $(this).val();
      specialToppingsInput.push(chosenSpecialToppings);
    });
    console.log("pizzaToppingsInput: " + pizzaToppingsInput);
    console.log("pi");
    console.log("pizzaTypeInput: " + pizzaTypeInput);

    ///Send to Business End///
    var newPizzaObject= new PizzaObjectMaker(pizzaCount,pizzaTypeInput,pizzaToppingsInput,specialToppingsInput);
    console.log(newPizzaObject.pizzaType);


    ///Output///
    var pizzaPrice = newPizzaObject.pizzaMath();
    orderTotal += pizzaPrice;
    console.log("pizzaPrice: " + pizzaPrice);
    console.log("orderTotal: " + orderTotal);
    if ((newPizzaObject.toppings.length + newPizzaObject.specialToppings.length)===0) {
      $("#order-checkout").append("- Your " + orderCounter(pizzaCount) + " pie is a " + newPizzaObject.pizzaType + "<br>" + dollaBillz(pizzaPrice) + "<br>");
    }
    else if ((newPizzaObject.toppings.length + newPizzaObject.specialToppings.length)===2) {
    $("#order-checkout").append("- Your " + orderCounter(pizzaCount) + " pie is a " + newPizzaObject.pizzaType + " with" + newPizzaObject.toppings + " and" + newPizzaObject.specialToppings + "<br>" + dollaBillz(pizzaPrice) + "<br>");
    }
    else {
      $("#order-checkout").append(andAdder("- Your " + orderCounter(pizzaCount) + " pie is a " + newPizzaObject.pizzaType + " with" + newPizzaObject.toppings + newPizzaObject.specialToppings + "<br>" + dollaBillz(pizzaPrice) + "<br>"));
    }
    console.log(newPizzaObject.toppings);
    console.log(newPizzaObject.specialToppings);
    pizzaCount+=1;
    $("#total").text(dollaBillz(orderTotal));
  });
});
