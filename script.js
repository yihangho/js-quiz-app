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

	// Registration-related DOMs
	var registerBtn = document.getElementById("register-btn");

	// Quiz-related DOMs
	var quizContainer = document.getElementById("quiz");
	var question = document.getElementById("question");
	var choicesContainer = document.getElementById("choices-container");
	var prevBtn = document.getElementById("prev-btn");
	var nextBtn = document.getElementById("next-btn");

	// Score-related DOMs
	var scoreContainer = document.getElementById("score");
	var scoreSpan = document.getElementById("score-val");

	// IndexedDB
	var request = indexedDB.open("quiz", 1);
	var database;
	
	request.onsuccess = function(event) {
		database = event.target.result;
	};

	request.onerror = function(event) {
		console.log("Error opening DB: " + event.target.errorCode);
	};

	request.onupgradeneeded = function(event) {
		database = event.target.result;
		if (!database.objectStoreNames.contains("users")) {
			database.createObjectStore("users", { keyPath: "username" });
		}
	}

	registerBtn.addEventListener("click", function() {
		var username = document.getElementById("registration-username").value;
		var password = document.getElementById("registration-password").value;

		if (database) {
			var objectstore = database.transaction("users", "readwrite").objectStore("users");

			request = objectstore.get(username);
			request.onsuccess = function(event) {
				if (!event.target.result) {
					request = objectstore.put({ username: username, password: password });
					request.onsuccess = function() {
						console.log("Registration success");
					}
					request.onerror = function(event) {
						document.getElementById("registration-error").innerHTML = "Something went wrong. Registration failed.";
					}
				} else {
					document.getElementById("registration-error").innerHTML = "Username taken. Choose another username.";
				}
			};
			request.onerror = function() {
				document.getElementById("registration-error").innerHTML = "Something went wrong. Registration failed.";
			};
		}
	});

	// TODO Use anon function
	prevBtn.addEventListener("click", PrevBtnClickHandler);
	nextBtn.addEventListener("click", NextBtnClickHandler);

	Initialize();

	function Initialize() {
		currentQuestion = 0;
		DisplayQuestion();
	}

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

		if (currentQuestion > 0) {
			prevBtn.classList.remove("hidden");
		} else {
			prevBtn.classList.add("hidden");
		}
	}

	function DisplayScore() {
		var score = 0;
		for (var i = 0; i < questions.length; i++) {
			if (questions[i].answer == userAnswers[i]) {
				score++;
			}
		}
		quizContainer.classList.add("hidden");
		scoreSpan.innerHTML = score + "/" + questions.length;
		scoreContainer.classList.remove("hidden");
	}
})();