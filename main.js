var btnsArray = document.querySelectorAll("button"),
    deleteArray = document.querySelectorAll("a"),
    qteValueObject = document.getElementsByClassName("qte"),
    unitPricesObject = document.getElementsByClassName("item-unit-price"),
    totalPricesObject = document.getElementsByClassName("item-total-price"),
    itemSections = document.getElementsByClassName("item"),
    likes = document.querySelectorAll("img");
;

/** Arrays **/

var qteValueArray = convertToArray(qteValueObject),
    unitPricesArray = convertToArray(unitPricesObject),
    totalPricesArray = convertToArray(totalPricesObject)
;


function convertToArray(HTMLObject) {
    var newArrayToReturn = [];
    for (var i = 0; i < HTMLObject.length; i++) {
        if (HTMLObject[i].children.length > 0) {
            newArrayToReturn.push(parseFloat(HTMLObject[i].querySelector("p").innerHTML));
        } else {
            newArrayToReturn.push(parseInt(HTMLObject[i].innerHTML));
        }
    }
    return newArrayToReturn;
}

function updateView(currentBtnClassName, currentBtnParentID) {
    if (currentBtnClassName == "add") qteValueArray[currentBtnParentID]++;
    else {
        if ((qteValueArray[currentBtnParentID] - 1) > -1) qteValueArray[currentBtnParentID]--;
    }

    totalPricesArray[currentBtnParentID] = unitPricesArray[currentBtnParentID] * qteValueArray[currentBtnParentID];

    qteValueObject[currentBtnParentID].innerHTML = qteValueArray[currentBtnParentID];
    totalPricesObject[currentBtnParentID].innerHTML = totalPricesArray[currentBtnParentID].toFixed(2) + "&nbsp;€";
}


function updateTotalPrice(){
    var totalPrice = 0.00;

    for (var i = 0; i < itemSections.length; i++) {
        if(itemSections[i].style.display != "none"){
            totalPrice = totalPrice + totalPricesArray[i];
        }
        
    }

    document.getElementById("total-Price").innerHTML = "Prix Total est = " + totalPrice.toFixed(2) + "&nbsp;€";
}


function itemsCount(){
    var itemCounter = 0;

    for(var i=0; i<itemSections.length;i++){
        if(itemSections[i].style.display != "none") itemCounter++;
    }

    document.getElementById("itemsCount").innerHTML = itemCounter;
}

itemsCount();
updateTotalPrice();

btnsArray.forEach(assignEventListenerBtn);

function assignEventListenerBtn(currentBtn) {
    currentBtn.addEventListener("click", function () {
        var currentBtnClassName = currentBtn.getAttribute("class"),
        currentBtnParentID = currentBtn.parentNode.getAttribute("id");

        updateView(currentBtnClassName, currentBtnParentID);
        updateTotalPrice();
    });
} 

deleteArray.forEach(assignEventListenerArray);

function assignEventListenerArray(currentLink) {
    currentLink.addEventListener("click", function () {
        var currentLinkParentID = currentLink.parentNode.getAttribute("id");

        itemSections[currentLinkParentID].style.display = "none";

        itemsCount();
        updateTotalPrice();
    });
} 

likes.forEach(assignEventListenerImg);

function assignEventListenerImg(currentImg) {
    currentImg.addEventListener("click", function () {
        var currentImgSize = currentImg.getAttribute("src");
        if(currentImgSize.includes("32")){
           currentImg.src = "res/heart-icon-48.png" ;
        }
        else{
            currentImg.src = "res/heart-icon-32.png" ;
        }
    });
} 