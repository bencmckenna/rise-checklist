var checkboxesOnPage;
var checkboxesInLesson;
var checkboxesTicked = [];
var checkboxMap = {};
var checkboxData;

var currentLesson = getLessonURL(window.location.href);
var prevLesson;

window.onhashchange = function(){
	initCheckboxes();
	checkboxData = JSON.stringify(checkboxMap);
	//console.log(checkboxData);
}

function convertSuspendedData(stringData) {
	//Jump to index page so that no checkboxes are loaded when users resume their session (hacky solution... but works)
	window.location.replace("#/lessons/");
	//Parse suspended data string and assign back to checkboxMap object
	checkboxData = stringData;
	checkboxMap = JSON.parse(stringData);
}

//Called by index.html ---> save checkboxes then count checkboxes
function initCheckboxes(){
	saveCheckboxes();
	countCheckboxes();
	applyCheckboxes();
}

function saveCheckboxes(){
	//Iterate through the checkboxes in the current lesson (if the parameter has been defined)
	if (checkboxesInLesson != undefined){
		for (i = 0; i < checkboxesInLesson.length; i++){
			//Determine if the checkboxes are ticked or not
			if (checkboxesInLesson[i].classList.contains("block-list__checkbox--checked") == true) {
				//Save value of array @ index as 1 if checked (e.g. [1, 1, 1])
				checkboxMap[currentLesson][i] = 1;
				//console.log("Checkbox number " + i + " is ticked in lesson " + currentLesson); 
			} else {
				//Save value of array @ index as 0 if unchecked (e.g. [0, 0, 0])
				checkboxMap[currentLesson][i] = 0;
				//console.log("Checkbox number " + i + " is NOT ticked in lesson " + currentLesson); 
			}
		}
	}
}

function countCheckboxes(){
	//Update the previous and current lesson IDs (after saving)
	if (getLessonURL(window.location.href) != currentLesson){
		prevLesson = currentLesson;
	}
	currentLesson = getLessonURL(window.location.href);
	//Save all checkboxes loaded on WHOLE PAGE into a variable
	checkboxesOnPage = document.getElementsByClassName('block-list__checkbox brand--border');
	//console.log("Total no. of checkboxes LOADED = " + checkboxesOnPage.length);
	//Assign checkboxes with their respective lesson ID as a custom attribute
	for (i = 0; i < checkboxesOnPage.length; i++){
		if (checkboxesOnPage[i].getAttribute("data-lesson-id") != prevLesson || checkboxesOnPage[i].hasAttribute("data-lesson-id") == null){
			checkboxesOnPage[i].setAttribute("data-lesson-id", currentLesson);
			//console.log(checkboxesOnPage[i]);
		}
	}
	//Save all checkboxes loaded on CURRENT LESSON into a variable (by using the query selector method to find the attribute + ID)
	checkboxesInLesson = document.querySelectorAll('[data-lesson-id="' + currentLesson + '"]');
	//console.log("Total no. of checkboxes IN THIS LESSON = " + checkboxesInLesson.length);
	//Check if the lesson has been visited and recorded yet or not
	if (checkboxMap[currentLesson] == undefined){
		checkboxMap[currentLesson] = [];
	} else {
		//console.log(currentLesson + " already recorded as a property");
	}
}

function applyCheckboxes(){
	//Tick checkboxes that were marked as being ticked before
	for (i = 0; i < checkboxesInLesson.length; i++){
		if (checkboxMap[currentLesson][i] == 1){
			checkboxesOnPage[i].classList.add("block-list__checkbox--checked");
			checkboxesOnPage[i].classList.add("brand--background");
		}
	}
}

function updateCurrentLesson(){
	currentLesson = getLessonURL(window.location.href);
}

function getLessonURL(wholeURL) {
    return wholeURL.split('/').pop()
}