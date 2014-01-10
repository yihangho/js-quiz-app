(function() {
	// The array that holds all the questions
	var questions = [{
		"question": "What is 1+1?",
		"choices": ["1", "11", "10", "2"],
		"answer": 3
	}, {
		"question": "Was the previous question easy?",
		"choices": ["Yes", "No"],
		"answer": 0
	}, {
		"question": "Is this the last question?",
		"choices": ["Yes", "No"],
		"answer": 0
	}];
	var score = 0, currentQuestion = 0;
	var question = document.getElementById("question");
	var choicesContainer = document.getElementById("choices-container");
	var nextBtn = document.getElementById("next-btn");

	nextBtn.addEventListener("click", NextBtnClickHandler);

	DisplayQuestion();

	function NextBtnClickHandler() {
		RecordAnswer();
		currentQuestion++;
		if (currentQuestion < questions.length) {
			DisplayQuestion();
		} else {
			DisplayScore();
		}
	}

	function RecordAnswer() {
		var radio = document.getElementsByName("answer");
		for (var i = 0; i < radio.length; i++) {
			if (radio[i].checked) {
				if (radio[i].value = questions[currentQuestion].answer) {
					score++;
				}
				break;
			}
		}
	}

	function DisplayQuestion() {
		// Update the question text
		question.innerHTML = questions[currentQuestion].question;
		
		// Empty the choices
		while (choicesContainer.firstElementChild) { choicesContainer.firstElementChild.remove(); }

		// Insert new choices
		var radio = document.createElement("input"), div, span;
		radio.type = "radio";
		radio.name = "answer";
		for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
			radio = radio.cloneNode();
			radio.value = i;

			span = document.createElement("span");
			span.innerHTML = questions[currentQuestion].choices[i];

			div = document.createElement("div");
			div.appendChild(radio);
			div.appendChild(span);
			choicesContainer.appendChild(div);
		}
	}

	function DisplayScore() {
		// Empty the tree again
		var p = document.createElement("p");
		p.innerHTML = "Your score is " + score + "/" + questions.length;
		document.body.appendChild(p);
	}
})();