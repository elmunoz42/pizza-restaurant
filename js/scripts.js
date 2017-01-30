//business logic

////PizzaObjectMaker ////
function PizzaObjectMaker (pizzaNumber, pizzaType, toppings, specialToppings) {
  this.pizzaNumber=pizzaNumber;
  this.pizzaType= pizzaType;
  this.toppings=toppings;
  this.specialToppings=specialToppings;
}
//// pizzaMath/////
PizzaObjectMaker.prototype.pizzaMath = function (pizzaType){
  if (pizzaType==="12 inch pizza") {
    return 8 + (this.toppings.length * 2) + (this.specialToppings.length * 3);
  }
  else {
    return 10 + (this.toppings.length * 2) + (this.specialToppings.length * 3);

  }
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
//// andAdder ////adds "and" at so many -count- before the end of the -phrase-
function andAdder (phrase, count) {
  var wordArray = phrase.split(' ');
  wordArray.splice((wordArray.length - count),0," and");
  // wordArray.splice((wordArray.length - (count -1)),0,". ");  /// adds dot but there's an annoying space!
  return wordArray.join(' ');
}
///// dollaBillz ////
function dollaBillz (number) {
  return "$" + number;
}

/////receipt maker////
function receiptMaker (orderArray) {
  if (orderArray.length === 1) {
    return orderArray[0];
  }
  else if (orderArray.length >1 ) {
    return orderArray.join("\n");
  }
}



// user interface logic
$(document).ready(function() {
  var pizzaCount=1;
  var orderTotal=0;
  var orders=[];
  var ordersForReceipt=[];

  // $("#new-order").click(function(event))
  ///submit///
  $("form#order-form").submit(function(event) {
    event.preventDefault();
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


    ///Send to Business End///
    var newPizzaObject= new PizzaObjectMaker(pizzaCount,pizzaTypeInput,pizzaToppingsInput,specialToppingsInput);


    ///Output///
    ///Order///
    var pizzaPrice = newPizzaObject.pizzaMath(pizzaTypeInput);
    orderTotal += pizzaPrice;
    if ((newPizzaObject.toppings.length + newPizzaObject.specialToppings.length)===0) {
      orders.push("- Your " + orderCounter(pizzaCount) + " pie is a " + newPizzaObject.pizzaType + " " + dollaBillz(pizzaPrice) + "<br>");
      ordersForReceipt.push(newPizzaObject.pizzaType + " " + dollaBillz(pizzaPrice));
      $("#order-checkout").append(orders[pizzaCount-1]);
    }
    else {
      orders.push(andAdder(("- Your " + orderCounter(pizzaCount) + " pie is a " + newPizzaObject.pizzaType + " with" + newPizzaObject.toppings + newPizzaObject.specialToppings + " " + dollaBillz(pizzaPrice) + "<br>"),2))
      ordersForReceipt.push(andAdder((newPizzaObject.pizzaType + " with" + newPizzaObject.toppings + newPizzaObject.specialToppings + " " + dollaBillz(pizzaPrice)),2));
      $("#order-checkout").append(orders[pizzaCount-1]);
    }
    pizzaCount+=1;
    $("#total").text(dollaBillz(orderTotal));
  });
  //order-form.submit

    ///checkout///
    $("form#payment-info").submit(function(event){
      event.preventDefault();
      var paymentType = $("#payment-type").val();
      var confirmed = false;
      if (orderTotal===0) {
        alert("Please add something to your order.");
      }
      else {
        if (paymentType === "cash") {
          alert("receipt:\n" + receiptMaker(ordersForReceipt) + "\ntotal: " +dollaBillz(orderTotal) + "\nThank you for your business. Enjoy!");
          pizzaCount=1;
          orderTotal=0;
          orders=[];
          ordersForReceipt=[];
          $("#order-checkout").text("");
          $("#total").text("");
          $('input:checkbox[name=toppings]').last().attr('checked',false);
          $('input:checkbox[name=special-toppings]').last().attr('checked',false);
        }
        else {
          confirmed = confirm("We have... \n" + receiptMaker(ordersForReceipt) + "\ntotal: " + dollaBillz(orderTotal) + "\nIs this your complete order?");
          if (confirmed) {
            prompt("Name on the card:");
            prompt("Your credit card number:");
            prompt("The expiration date: (example 10/19) ");
            alert("receipt:\n"+ receiptMaker(ordersForReceipt) + "\ntotal: " +dollaBillz(orderTotal) + "\nThank you for your business. Enjoy!");
            pizzaCount=1;
            orderTotal=0;
            orders=[];
            ordersForReceipt=[];
            $("#order-checkout").text("");
            $("#total").text("");
            $('input:checkbox[name=toppings]').last().attr('checked',false);
            $('input:checkbox[name=special-toppings]').last().attr('checked',false);

          }
          else {
            prompt("No problem. Go ahead and tweak your order however you like.")

          }
          //checkout confirmation
        }
        // payment choice
      }
      // checkout not empty

    });
    // payment-info.submit
    $("#order-delete").click(function(){
      event.preventDefault();
      pizzaCount=1;
      orderTotal=0;
      orders=[];
      ordersForReceipt=[];
      $("#order-checkout").text("");
      $("#total").text("");
      $('input:checkbox[name=toppings]').last().attr('checked',false);
      $('input:checkbox[name=special-toppings]').last().attr('checked',false);
    })
});
