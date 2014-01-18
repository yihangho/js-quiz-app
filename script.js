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
	var userAnswers = [];
	var currentQuestion = 0;
	var question = document.getElementById("question");
	var choicesContainer = document.getElementById("choices-container");
	var prevBtn = document.getElementById("prev-btn");
	var nextBtn = document.getElementById("next-btn");

	prevBtn.addEventListener("click", PrevBtnClickHandler);
	nextBtn.addEventListener("click", NextBtnClickHandler);

	DisplayQuestion();

	function PrevBtnClickHandler() {
		RecordAnswer();
		if (currentQuestion) {
			currentQuestion--;
			DisplayQuestion();
		}
	}

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
				userAnswers[currentQuestion] = radio[i].value;
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
			if (userAnswers[currentQuestion] == i) {
				radio.setAttribute("checked", "true");
			} else {
				radio.removeAttribute("checked");
			}

			span = document.createElement("span");
			span.innerHTML = questions[currentQuestion].choices[i];

			div = document.createElement("div");
			div.appendChild(radio);
			div.appendChild(span);
			choicesContainer.appendChild(div);
		}
	}

	function DisplayScore() {
		var score = 0;
		for (var i = 0; i < questions.length; i++) {
			if (questions[i].answer == userAnswers[i]) {
				score++;
			}
		}
		var p = document.createElement("p");
		p.innerHTML = "Your score is " + score + "/" + questions.length;
		document.body.appendChild(p);
	}
})();