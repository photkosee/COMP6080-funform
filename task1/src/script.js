const form = document.forms[0];
const streetName = document.getElementById("street-name");
const suburb = document.getElementById("suburb");
const postcode = document.getElementById("postcode");
const dob = document.getElementById("dob");
const buildingType = document.getElementById("building-type");
const featuresHeating = document.getElementById("features-heating");
const featuresAirconditioning = document.getElementById(
  "features-airconditioning"
);
const featuresPool = document.getElementById("features-pool");
const featuresSandpit = document.getElementById("features-sandpit");
const selectAllButton = document.getElementById("select-all-btn");
const resetButton = document.getElementById("reset-form");
const textArea = document.getElementById("form-result");
const codeTest = new RegExp("[0-9]{4}");
const dateTest = new RegExp("[0-9]{2}/[0-9]{2}/[0-9]{4}");

// Checking any selected features and return a string according to the required format
const checkFeatures = () => {
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
    featuresArray.push("no features");
  }
  return featuresArray.reduce(function (prev, curr, index) {
    if (index === 0) {
      return curr;
    }
    return prev + (index === featuresArray.length - 1 ? ", and " : ", ") + curr;
  });
};

// Change the date from a DD/MM/YYYY into a YYYY/MM/DD format
const convertDate = (str) => {
  let dateArray = str.split("/");
  return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
};

// Calculating current age from given dob
const getAge = (dob) => {
  let age = 0;
  let currDate = new Date();
  const currYear = currDate.getFullYear();
  const currMonth = currDate.getMonth() + 1;
  const currDay = currDate.getDate();
  let birthArray = dob.split("/");
  const birthYear = parseInt(birthArray[2]);
  const birthMonth = parseInt(birthArray[1]);
  const birthDay = parseInt(birthArray[0]);

  age += currYear - birthYear;
  if (
    currMonth < birthMonth || (currMonth === birthMonth && currDay < birthDay)
  ) {
    age--;
  }

  return age > 0 ? age : 0;
};

// For any actions that would render the textarea according to the spec
const TriggerRender = () => {
  if (streetName.value.length < 3 || streetName.value.length > 50) {
    textArea.value = "Please input a valid street name";
  } else if (suburb.value.length < 3 || suburb.value.length > 50) {
    textArea.value = "Please input a valid suburb";
  } else if (!codeTest.test(postcode.value) || postcode.value.length !== 4) {
    textArea.value = "Please input a valid postcode";
  } else if (
    !dateTest.test(dob.value) ||
    dob.value.length !== 10 ||
    isNaN(new Date(convertDate(dob.value)))
  ) {
    textArea.value = "Please enter a valid date of birth";
  } else {
    textArea.value = `You are ${getAge(
      dob.value
    )} years old, and your address is ${streetName.value} St, ${
      suburb.value
    }, ${postcode.value}, Australia. Your building is ${
      buildingType.value === "apartment" ? "an apartment" : "a house"
    }, and it has ${checkFeatures()}`;
  }
};

// Render everytime a form is changed
form.addEventListener("change", TriggerRender);

// Reset every element to their default values when the reset button is clicked
resetButton.addEventListener("click", () => {
  form.reset();
});

// Select / Deselect features when this button is clicked
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

// Change the text of the select-all-btn whenever all of the features are selected
const changeSelectAll = () => {
  if (
    featuresHeating.checked === true &&
    featuresAirconditioning.checked === true &&
    featuresPool.checked === true &&
    featuresSandpit.checked === true
  ) {
    selectAllButton.value = "Deselect all";
  } else {
    selectAllButton.value = "Select all";
  }
};

// Trigger the change of the text of the select-all-btn whenever needed
featuresHeating.addEventListener("change", changeSelectAll);
featuresAirconditioning.addEventListener("change", changeSelectAll);
featuresPool.addEventListener("change", changeSelectAll);
featuresSandpit.addEventListener("change", changeSelectAll);
