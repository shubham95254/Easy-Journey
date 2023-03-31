// getting all required elements
const searchWrapper2 = document.querySelector(".to");
const inputBox2 = searchWrapper2.querySelector("#to");
const stnName2 = searchWrapper2.querySelector(".trainsSearch2");

// if user press any key and release
inputBox2.onkeyup = (e) => {
  let userData = e.target.value; //user entered data
  let emptyArray = [];
  if (userData) {
    emptyArray = stationList.filter((data) => {
      //filtering array value and user characters to lowercase and return only those words which are start with user entered chars
      return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
    });
    emptyArray = emptyArray.map((data) => {
      // passing hreturn data inside li tag
      return (data = `<li>${data}</li>`);
    });
    searchWrapper2.classList.add("active"); //show autocomplete box
    showstationList2(emptyArray);
    let allList = stnName2.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute("onclick", "select2(this)");
    }
  } else {
    searchWrapper2.classList.remove("active"); //hide autocomplete box
  }
};

function select2(element) {
  let selectData = element.textContent;
  inputBox2.value = selectData;
  searchWrapper2.classList.remove("active");
}

function showstationList2(list) {
  let listData;
  if (!list.length) {
    // userValue = inputBox2.value;
    listData = "";
  } else {  
    listData = list.join("");
  }
  stnName2.innerHTML = listData;
}
