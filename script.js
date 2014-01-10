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
	var score, currentQuestion;

	(function Initialize() {
		// Initialize global variable
		score = currentQuestion = 0;
		// Clear any elements inside body, if any
		while (document.body.firstElementChild) { document.body.firstElementChild.remove(); }

		// Initially, show a button for the user to start the quiz
		var startBtn = document.createElement("button");
		startBtn.innerHTML = "Start Quiz";
		startBtn.addEventListener("click", startBtnClickHandler);
		document.body.appendChild(startBtn);
		function startBtnClickHandler() {
			// Remove itself from the tree
			startBtn.removeEventListener("click", arguments.callee);
			startBtn.remove();

			DrawUI();
			DisplayQuestion(0);
		}
	})();

	function DrawUI() {
		var questionParagraph = document.createElement("p"); questionParagraph.id="question"; // The p that contains the question text
		var choicesDiv = document.createElement("div"); choicesDiv.id="choices"; // The div that contains all the choices
		var submitBtn = document.createElement("button"); submitBtn.innerHTML = "Submit"; // The next button
		document.body.appendChild(questionParagraph);
		document.body.appendChild(choicesDiv);
		document.body.appendChild(submitBtn);
		submitBtn.addEventListener("click", SubmitBtnClickHandler);
	}

	function SubmitBtnClickHandler() {
		SubmitAnswer();
		currentQuestion++;
		if (currentQuestion < questions.length) {
			DisplayQuestion();
		} else {
			DisplayScore();
		}
	}

	function SubmitAnswer() {
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
		document.getElementById("question").innerHTML = questions[currentQuestion].question;
		var radio = document.createElement("input"), div, span;
		var choicesDiv = document.getElementById("choices");
		// Empty the choices
		while (choicesDiv.firstElementChild) { choicesDiv.firstElementChild.remove(); }
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
			choicesDiv.appendChild(div);
		}
	}

	function DisplayScore() {
		// Empty the tree again
		while (document.body.firstElementChild) { document.body.firstElementChild.remove(); }

		var p = document.createElement("p");
		p.innerHTML = "Your score is " + score + "/" + questions.length;
		document.body.appendChild(p);
	}
})();