//business logic
function PizzaObjectMaker (pizzaNumber, pizzaType, toppings, specialToppings) {
  this.pizzaNumber=pizzaNumber;
  this.pizzaType= pizzaType;
  this.toppings=toppings;
  this.specialToppings=specialToppings;
}
var pizzaToppingsInput=[];
var specialToppingsInput=[];

PizzaObjectMaker.prototype.pizzaMath = function (){
  return 10 + (this.toppings.length * 2) + (this.specialToppings.length * 3);
}

/// change 10 to this.type.cost //// make an object for each size of pizza









// user interface logic
$(document).ready(function() {
  console.log("hello");
  var pizzaCount=1;
  var orderTotal=0

  ///submit///
  $("form#order-form").submit(function(event) {
    event.preventDefault();
    console.log("submitted")

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
    console.log("pizzaPrice: " + pizzaPrice);
    $("#order-checkout").prepend("- Your " + pizzaCount + "st pie is a " + newPizzaObject.pizzaType + " with" + newPizzaObject.toppings + "<br>" + pizzaPrice);
    console.log(newPizzaObject.toppings);
    console.log(newPizzaObject.specialToppings);
    pizzaCount+=1;
  });
});
