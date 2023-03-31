// getting all required elements
const searchWrapper = document.querySelector(".from");
const inputBox = searchWrapper.querySelector("#from");
const stnName = searchWrapper.querySelector(".trainsSearch1");

// if user press any key and release
inputBox.onkeyup = (e) => {
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
    searchWrapper.classList.add("active"); //show autocomplete box
    showstationList(emptyArray);
    let allList = stnName.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      //adding onclick attribute in all li tag
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchWrapper.classList.remove("active"); //hide autocomplete box
  }
};

function select(element) {
  let selectData = element.textContent;
  inputBox.value = selectData;
  searchWrapper.classList.remove("active");
}

function showstationList(list) {
  let listData;
  if (!list.length) {
    // userValue = inputBox.value;
    listData = "";
  } else {  
    listData = list.join("");
  }
  stnName.innerHTML = listData;
}
