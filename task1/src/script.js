const form = document.forms[0];
const streetName = document.getElementById("street-name");
const suburb = document.getElementById("suburb");
const postcode = document.getElementById("postcode");
const dob = document.getElementById("dob");
const buildingType = document.getElementById("building-type");
const featuresHeating = document.getElementById("features-heating");
const featuresAirconditioning = document.getElementById("features-airconditioning");
const featuresPool = document.getElementById("features-pool");
const featuresSandpit = document.getElementById("features-sandpit");
const selectAllButton = document.getElementById("select-all-btn");
const resetButton = document.getElementById("reset-form");
const textArea = document.getElementById("form-result");
const codeTest = new RegExp("[0-9]{4}");
const dateTest = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}");

function checkFeatures() {
  let featuresArray = [];
  if (featuresHeating.checked) {
    featuresArray.push("Heating");
  }
  if (featuresAirconditioning.checked) {
    featuresArray.push("AirConditioning");
  }
  if (featuresPool.checked) {
    featuresArray.push("Pool");
  }
  if (featuresSandpit.checked) {
    featuresArray.push("Sandpit");
  }
  if (featuresArray.length === 0) {
    featuresArray.push("no features")
  }
  return featuresArray.reduce(function (prev, curr, index) {
    if (index === 0) {return curr}
    return prev + (index === featuresArray.length - 1 ? ", and " : ", ") + curr;
  });
}

function getDate(str) {
  let dateArray = str.split("/");
  return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
}

// inspire from stackoverflow
const getAge = (dob) => {
  return Math.floor((new Date() - dob.getTime()) / 3.15576e+10);
}

function TriggerRender() {
  if (streetName.value.length < 3 || streetName.value.length > 50) {
    textArea.value = "Please input a valid street name";
  } else if (suburb.value.length < 3 || suburb.value.length > 50) {
    textArea.value = "Please input a valid suburb";
  } else if (!codeTest.test(postcode.value) || postcode.value.length !== 4) {
    textArea.value = "Please input a valid postcode";
  } else if (!dateTest.test(dob.value) || isNaN(new Date(getDate(dob.value)))) {
    console.log(new Date(getDate(dob.value)));
    textArea.value = "Please enter a valid date of birth";
  } else {
    console.log(new Date(getDate(dob.value)));
    textArea.value = `You are ${getAge(new Date(getDate(dob.value)))} years old, and your address is ${streetName.value} St, ${suburb.value}, ${postcode.value}, Australia. Your building is ${buildingType.value === "apartment" ? "an apartment" : "a house"}, and it has ${checkFeatures()}`;
  }
}

form.addEventListener("change", TriggerRender);

resetButton.addEventListener("click", () => {
  streetName.value = "";
  textArea.value = "";
  suburb.value = "";
  postcode.value = "";
  dob.value = "";
  buildingType.value = "apartment";
  featuresHeating.checked = false;
  featuresAirconditioning.checked = false;
  featuresPool.checked = false;
  featuresSandpit.checked = false;
});

selectAllButton.addEventListener("click", () => {
  if (selectAllButton.value === "Deselect all") {
    featuresHeating.checked = false;
    featuresAirconditioning.checked = false;
    featuresPool.checked = false;
    featuresSandpit.checked = false;
    selectAllButton.value = "Select all";
  } else {
    featuresHeating.checked = true;
    featuresAirconditioning.checked = true;
    featuresPool.checked = true;
    featuresSandpit.checked = true;
    selectAllButton.value = "Deselect all";
  }
  TriggerRender();
});

function changeSelectAll() {
  if (featuresHeating.checked === true &&
      featuresAirconditioning.checked === true &&
      featuresPool.checked === true &&
      featuresSandpit.checked === true) {
    
    selectAllButton.value = "Deselect all";
  } else {
    selectAllButton.value = "Select all";
  }
}

featuresHeating.addEventListener("change", changeSelectAll);
featuresAirconditioning.addEventListener("change", changeSelectAll);
featuresPool.addEventListener("change", changeSelectAll);
featuresSandpit.addEventListener("change", changeSelectAll);
