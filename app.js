const form = document.getElementById('comments');
// adding data to db
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('comments').add({
       name: form.name.value,
       comment: form.comment.value
    });
    form.name.value = '';
    form.comment.value = '';
});

// reading from db

const div = document.querySelector('.cont');

renderList = (doc) => {
    var main_div = document.createElement('div');
    var card_body = document.createElement('div');
    var name = document.createElement('h5');
    var comment = document.createElement('p');
    main_div.setAttribute('class','card mt-3');
    card_body.setAttribute('class','card-body');
    name.setAttribute('class','card-title');
    comment.setAttribute('class','card-text');
    name.textContent = doc.data().name;
    comment.textContent = doc.data().comment;
    card_body.appendChild(name);
    card_body.appendChild(comment);
    main_div.appendChild(card_body);
    div.appendChild(main_div);
}

db.collection('comments').onSnapshot(snap => {
    let changes = snap.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            renderList(change.doc);
        }
    });
});


// carttt
function update(product, price, isIncreasing) {
    const inputBox = document.getElementById(product + "-quantity");
  
    let productQuantity = inputBox.value;
  
    if (isIncreasing == true) {
      inputBox.value = parseInt(inputBox.value) + 1;
    } else if (inputBox.value > 0) {
      inputBox.value = parseInt(productQuantity) - 1;
    }
    ///update case total price
  
    //at first caseQuantity = inputBox.value which is one > then by clicking '+'  inputBox.value = 2 > caseQuantity is still 1>
  
    let productPrice = document.getElementById(product + "-price");
  
    productPrice.innerText = inputBox.value * price;
  
    // Call suBtotal
  
    calculateTotal();
  }
  
  // taking multiple input at a same time
  
  function getInputProduct(product) {
    const inputBox = document.getElementById(product + "-quantity");
  
    const productQuantity = parseInt(inputBox.value);
  
    return productQuantity;
  }
  
  function calculateTotal() {
    const phoneTotal = getInputProduct("phone") * 1150;
    const caseTotal = getInputProduct("case") * 50;
  
    const subTotal = phoneTotal + caseTotal;
  
    const tax = subTotal * 0.15;
  
    document.getElementById("sub-total").innerText = subTotal;
    document.getElementById("tax").innerText = tax;
    document.getElementById("total").innerText = subTotal + tax;
  }
  
  /// update phone case price
  document.getElementById("case-plus").addEventListener("click", function () {
    //   const caseInput = document.getElementById("case-quantity");
    //   const caseQuantity = caseInput.value;
    //   caseInput.value = parseInt(caseQuantity) + 1;
    update("case", 50, true);
  });
  
  document.getElementById("case-minus").addEventListener("click", function () {
    //   const caseInput = document.getElementById("case-quantity");
  
    //   const caseQuantity = caseInput.value;
  
    //   caseInput.value = parseFloat(caseQuantity) - 1;
  
    update("case", 50, false);
  });
  
  /// update phone price
  document.getElementById("phone-plus").addEventListener("click", function () {
    update("phone", 1150, true);
  });
  
  document.getElementById("phone-minus").addEventListener("click", function () {
    update("phone", 1150, false);
  });



  function showb() {

    var name = document.getElementById("name").value;
    var Email= document.getElementById("email").value;
    var amount = document.getElementById("amount").value;
    var attendee= document.getElementById("attendee").value;
  
  
     firebase.database().ref("User/"+ name).set({
            name : name,
            email : Email,
            amount: amount,
            attendee: attendee
          }, function(error) {
            if (error) {
              // The write failed...
              alert("Not done");
            } else {
                alert("DONE");
              
           
            }
          });
  }
  