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
	// Total score
	var score = 0;
	// Initially, show a button for the user to start the quiz
	var startBtn = document.createElement("button");
	startBtn.innerHTML = "Start Quiz";
	var startBtnClickHandler = function() {
		startBtn.removeEventListener("click", arguments.callee);
		startBtn.remove();
		// Load the questions UI and start the quiz
		(function() {
			var currentQuestion = 0;
			var questionParagraph = document.createElement("p"); // The p that contains the question text
			var choicesDiv = document.createElement("div"); // The div that contains all the choices
			var submitBtn = document.createElement("button"); submitBtn.innerHTML = "Submit"; // The next button
			document.body.appendChild(questionParagraph);
			document.body.appendChild(choicesDiv);
			document.body.appendChild(submitBtn);
			submitBtn.addEventListener("click", SubmitBtnClickHandler);
			function SubmitBtnClickHandler() {
				var choicesRadios = document.getElementsByName("answer");
				for (var i = 0; i < choicesRadios.length; i++) {
					if (choicesRadios[i].checked) {
						if (choicesRadios[i].value == questions[currentQuestion].answer) {
							score++;
						}
						break;
					}
				}
				currentQuestion++;
				if (currentQuestion < questions.length) {
					// There are more questions - display the next one
					WriteQuestion();
				} else {
					// This is the last question. Clear everything and show the score.
					submitBtn.removeEventListener("click", arguments.callee);
					choicesDiv.remove();
					submitBtn.remove();

					// Use the paragraph that was displaying the question to display the score.
					questionParagraph.innerHTML = "Your score is " + score + "/" + questions.length;
				}
			}
			function WriteQuestion() {
				questionParagraph.innerHTML = questions[currentQuestion].question;
				while (choicesDiv.firstElementChild) { choicesDiv.firstElementChild.remove(); } // Empty the choices div
				// Populate the choicesDiv
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
					choicesDiv.appendChild(div);
				}
			};
			WriteQuestion();
		})();
	};
	startBtn.addEventListener("click", startBtnClickHandler);
	document.body.appendChild(startBtn);
})();