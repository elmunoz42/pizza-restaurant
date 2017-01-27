//business logic
function PizzaObjectMaker (pizzaName, pizzaType, toppings, specialToppings) {
  this.pizzaName=pizzaName;
  this.pizzaType= pizzaType;
  this.toppings=toppings;
  this.specialtoppings=specialToppings;
}














// user interface logic
$(document).ready(function() {
  console.log("hello");
  $("form#order-form").submit(function(event) {
    event.preventDefault();
    console.log("submitted")
    ///Input///
    var pizzaTypeInput=$("#pizza-type").val();
    var pizzaCount=1;
    console.log("pizzaTypeInput: " + pizzaTypeInput);

    ///Send to Business End///
    var newPizzaObject= new PizzaObjectMaker(pizzaCount,pizzaTypeInput,0,0);
    console.log(newPizzaObject.pizzaType);

    ///Output///
    $("#order-checkout").prepend("Your " + pizzaCount + "st pie is a " + newPizzaObject.pizzaType);

  });
});
