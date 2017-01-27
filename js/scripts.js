//business logic
function PizzaObjectMaker (pizzaName, pizzaType, toppings, specialToppings) {
  this.pizzaName=pizzaName;
  this.pizzaType= pizzaType;
  this.toppings=toppings;
  this.specialtoppings=specialToppings;
}
var pizzaToppingsInput=[];













// user interface logic
$(document).ready(function() {
  console.log("hello");
  var pizzaCount=1;
  $("form#order-form").submit(function(event) {
    event.preventDefault();
    console.log("submitted")
    ///Input///
    var pizzaTypeInput=$("#pizza-type").val();
    $("input:checkbox[name=toppings]:checked").each(function(){
      var chosenToppings = $(this).val();
      pizzaToppingsInput.push(chosenToppings);
    });
    console.log("pizzaToppingsInput: " + pizzaToppingsInput);
    console.log("pizzaTypeInput: " + pizzaTypeInput);

    ///Send to Business End///
    var newPizzaObject= new PizzaObjectMaker(pizzaCount,pizzaTypeInput,pizzaToppingsInput,0);
    console.log(newPizzaObject.pizzaType);


    ///Output///
    $("#order-checkout").prepend("- Your " + pizzaCount + "st pie is a " + newPizzaObject.pizzaType + " with" + newPizzaObject.toppings + "<br>");
    pizzaCount+=1;
  });
});
