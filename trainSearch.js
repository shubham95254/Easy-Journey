var today = new Date().toISOString().split("T")[0];
document.getElementById("date").setAttribute("min", today);

let touristAttractions = "";
let dstn = "";

var btn = document.getElementById("submit");
btn.addEventListener("click", myFunction);

function myFunction(event) {
  event.preventDefault();
  var from = document.getElementById("from").value;
  let arr = from.split("-");

  from = arr[1].trim();
  var to = document.getElementById("to").value;
  let dstn = to.split(" - ")[0];
  to = to.split(" - ")[1];
  console.log(dstn);
  var date = document.getElementById("date").value;
  console.log(from, to, date);
  if (from == to) {
    alert("Error: Source and destination are same");
    window.location.reload();
  }
  else if (today > date) {
    alert("Error: Date cannot be before today");
  }
  else {
    fetch(
      `https://railway-w6eh.onrender.com/proxy?from=${from}&to=${to}&date=${date}`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        // get lan lon of to place
        return fetch(
          `https://api.opentripmap.com/0.1/en/places/geoname?name=${dstn}&apikey=5ae2e3f221c38a28845f05b610b34dcc8a1de3fb50321895e9d82726`
        )
          .then((response2) => response2.json())
          .then((response2) => {
            console.log(response2);

            // api to get nearby tourist attractions
            var kinds =
              "unclassified_objects,amusements,museums,urban_environment,historic,natural,foods";
            return fetch(
              `https://api.opentripmap.com/0.1/en/places/radius?radius=30000&lat=${response2.lat}&lon=${response2.lon}&kinds=${kinds}&rate=1&apikey=5ae2e3f221c38a28845f05b610b34dcc8a1de3fb50321895e9d82726`
            )
              .then((response3) => response3.json())
              .then((response3) => {
                response3.features.sort(function (a, b) {
                  return b.properties.rate - a.properties.rate;
                });

                console.log(response3.features);
                if (response3.features.length > 30) {
                  response3.features.splice(30);
                }
                response3.features.forEach((feature) => {
                  touristAttractions += `<li>${feature.properties.name}</li>`;
                });
                // Use the touristAttractions data to render the search results
                let listItem = "";
                let main = document.querySelector("main");
                response.data.forEach((item) => {
                  listItem += `<li>
                  <div class="trainBlock" id="train_1">
                      <div class="trainNameNo">
                          <span class="trainName">${item.train_base.train_name}</span>
                          <span class="trainNo">TrainNumber - ${item.train_base.train_no}</span>
                      </div>
              
                      <div class="time" style="margin-top: 20px">
                          <div class="departure">
                              <h5>DEPARTURE TIME</h5>
                              <p id="departureTime">${item.train_base.from_time}</p>
                          </div>
                          <div class="arrival">
                              <h5>ARRIVAL TIME</h5>
                              <p id="arrivalTime">${item.train_base.to_time}</p>
                          </div>
                      </div>
                      <div class="btn">
                          <button type="submit" class="submitBtn"><a href="https://www.irctc.co.in/nget">Book Ticket</a></button>
                      </div>
              
                  </div>
              </li>`;
                });

                const searchResult = `<nav id="nav">
                <a href="Homepage.html">Home</a>
            </nav>
            <div id="result">
                <div id="TrainList">
                      <h2>Your Search Result</h2>
                    <div id="trains">
                        <ol id="trainList" style="padding-left: 0px">
                            ${listItem}
                        </ol>
                    </div>
                </div>
            
                <div class="touristAttraction">
                    <h3>Tourist Attractions at ${dstn}</h3>
                    <ul id="touristAttractions">
                        ${touristAttractions}
                    </ul>
                </div>
            </div>`;
                main.insertAdjacentHTML("beforeend", searchResult);
              });
          });
      })

      .then(() => {
        document.getElementById("result").style.display = "grid";
        document.getElementById("nav").style.display = "block";
      })
      .catch((error) => {
        console.log("Error: " + error);
        alert("No direct trains found/type in stations correctly");
        window.location.reload();
      });

    document.getElementById("SearchTrain").style.display = "none";
  }
}
