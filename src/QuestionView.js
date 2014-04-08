/* global define */
define([
	'mvc/View',
	'util/Util'
], function (
	View,
	Util
) {
	'use strict';

	var DEFAULTS = {
		label:null,          // The question being asked
		multiSelect:false,   // For radio buttons or checkboxes, radio is default
		selectedAnswer:null, // Any answers that should be selected by default
		answers:null      // Array of answers, each with attributes:
		                  //  value - The "value" for the input
		                  //  label - The answer to show the user
		                  //  otherValue - optional extra value for more info
		                  //  otherLabel - Question to ask associate with otherValue
	};
	var ID_SEQUENCE = 0;


	// ----------------------------------------------------------------------
	// Initialization Methods
	// ----------------------------------------------------------------------

	/**
	 * @constructor
	 * Creates a new QuestionView.
	 *
	 * @param options {Object}
	 *        An object containing configuration options. See DEFAULTS for
	 *        detailed documentation on what can be specified.
	 */
	var QuestionView = function (options) {
		/*console.log(
			'QuestionView source: https://github.com/usgs/hazdev-question-view'
		);*/
		this._options = Util.extend({}, DEFAULTS, options || {});
		this._answerList = [];

		View.call(this, this._options);
	};

	QuestionView.prototype = Object.create(View.prototype);

	QuestionView.prototype._initialize = function () {
		var section = document.createElement("section");
		section.classList.add("question");

		section.appendChild(this._addAnswers());

		this.setAnswer(this._options.selectedAnswer);

		this.el.innerHTML = "";
		this.el.appendChild(section);
	};

	/**
	 * Add all answers to the list of answers.
	 *
	 * @return String
	 *         Contains a list of answer options wrapped in appropriate HTML.
	 *
	 */
	QuestionView.prototype._addAnswers = function () {
		var options = this._options,
		    answers = options.answers,
		    answerElement,
		    questionId = 'question-' + (++ID_SEQUENCE),
		    answerList = document.createElement("fieldset"),
		    legend = document.createElement("legend"),
		    ul = document.createElement("ul"),
		    i,
		    len;

		answerList.name = questionId;
		legend.textContent = options.label;
		answerList.appendChild(legend);

		for (i=0, len=answers.length; i<len; i++) {
			this._addAnswer(answers[i], questionId, ul);
		}
		answerList.appendChild(ul);

		// Bind and add event listeners to all inputs
		this._onChange = this._onChange.bind(this);
		this._onBlur = this._onBlur.bind(this);

		answerElement = answerList.getElementsByTagName('li');
		for (i=0, len=answerElement.length; i<len; i++) {
			var inputs = answerElement[i].getElementsByTagName('input')
			inputs[0].addEventListener('change', this._onChange);
			if (inputs[1] !== undefined) {
				inputs[1].addEventListener('blur', this._onBlur);
			}
		}

		return answerList;
	};

	/**
	 * Wrap a single answer in appropriate html.
	 *
	 * @return String
	 *         Contains an answer wrapped in appropriate HTML.
	 *
	 */
	QuestionView.prototype._addAnswer = function (answer, qId, ul) {
		var answerId = 'answer-' + (++ID_SEQUENCE),
				inputType = (this._options.multiSelect ? 'checkbox' : 'radio'),
		    li = document.createElement("li"),
		    label = document.createElement("label"),
		    input = document.createElement("input"),
		    answerText = document.createTextNode(answer.label);

		label.for = answerId;
		label.classList.add("answer");

		input.type = inputType;
		input.name = qId;
		input.id = answerId;
		input.value = answer.value;

		label.appendChild(input);
		label.appendChild(answerText);

		li.appendChild(label);

		if (typeof answer.otherLabel === 'string') {
			var textbox = document.createElement("input");
			textbox.type = 'textbox';
			textbox.name = qId + '-other';
			textbox.id = answerId + '-other';
			textbox.value = answer.otherValue;
			textbox.classList.add("other");
			textbox.placeholder = answer.otherLabel;
			li.appendChild(textbox);
		}
		ul.appendChild(li);
	}

	/**
	 *
	 */
	QuestionView.prototype._onChange = function (ev) {
		var target = ev.target,
		    answerList = this._answerList,
		    i,
		    len,
		    checked;

		for (i=0, len=answerList.length; i<len; i++) {
			if (answerList[i].otherInput !== null) {
				checked = answerList[i].input.checked;
				answerList[i].otherInput.disabled = !checked;
				if (answerList[i].input === target && checked) {
					answerList[i].otherInput.focus();
				}
			}
		}
		this.trigger('change', this);
	};

	/**
	 *
	 */
	QuestionView.prototype._onBlur = function (ev) {
		var target = ev.target,
		    answerList = this._answerList,
		    i,
		    len;

		for (i=0, len=answerList.length; i<len; i++) {
			if (answerList[i].otherInput === target) {
				if (answerList[i].option.otherValue !== target.value) {
					answerList[i].option.otherValue = target.value;
					this.trigger('change', this);
				}
				break;
			}
		}
	};


	// ----------------------------------------------------------------------
	// Public Methods
	// ----------------------------------------------------------------------

	/**
	 * Clean up event listeners, remove list of answers
	 *
	 */
	QuestionView.prototype.destroy = function () {
		var answerList = this._answerList,
		    i,
		    len;

		for (i=0, len=answerList.length; i<len; i++) {
			answerList[i].input.removeEventListener('change', this._onChange);
			answerList[i].input = null;
			if (answerList[i].otherInput !== null) {
				answerList[i].otherInput.removeEventListener('blur', this._onBlur);
				answerList[i].otherInput = null;
			}
		}
		this._answerList = null;
	};

	/**
	 * Return list of answers.
	 *
	 * @return {Object|Array}
	 *         Null if no answers are selected
	 *         An object containing a single answer if only 1 is selected
	 *         An array of answer objects if there is more than 1
	 */
	QuestionView.prototype.getAnswer = function () {
		var options = this._options,
		    answer,
		    currentAnswer = [],
		    answerList = this._answerList;

		for (var i=0, len=answerList.length; i<len; i++) {
			answer = answerList[i];
			if (answer.input.checked) {
				currentAnswer.push(
					answer.option
				);
			}
		}

		if (currentAnswer.length === 0) {
			return null;
		} else if (options.multiSelect) {
			return currentAnswer;
		} else {
			return currentAnswer[0];
		}
	};

	/**
	 * Sets input.checked on input elements.
	 * Assumes a string for the value of a single answer if multiSelect:false
	 * Assumes an array of answer values if multiSelect:true
	 *
	 * @param {String|Array}
	 *        The list of currently selected answers as strings
	 */
	QuestionView.prototype.setAnswer = function (selectedAnswer) {
		var options = this._options,
		    answerList = this._answerList,
		    multiSelect = options.multiSelect,
		    checked,
		    answer,
		    answerIndex;

		var len=answerList.length;
		var index={};
		// Make sure everything is unchecked first
		for (var k=0; k<len; k++) {
			answerList[k].input.checked=false;
			if (answerList[k].otherInput) {
				answerList[k].otherInput.disabled=true;
			}

			index[answerList[k].value]=k;
		}

		if (selectedAnswer === null) {
			return;
		}

		if (typeof selectedAnswer === 'string') {
			answerIndex = index[selectedAnswer];
			if (typeof answerIndex !== 'undefined') {
				answer = answerList[answerIndex];
				if (answer.input) {
					answer.input = checked;
					if (answer.otherInput) {
						answer.otherInput.disabled=false;
					}
				}
			}
		} else {
			for (var j=0, len2=selectedAnswer.length; j<len2; j++) {
				answerIndex = index[selectedAnswer[j]];
				if (typeof answerIndex !== 'undefined') {
					answer = answerList[answerIndex];
					if (answer.input) {
						answer.input = checked;
						if (answer.otherInput) {
							answer.otherInput.disabled=false;
						}
					}
				}
			}
		}

		// for (var i=0; i<len; i++) {
		// 	var answer = answerList[i];

		// 	if (multiSelect) { // Check boxes
		// 		checked = false;
		// 		if (selectedAnswer !== null) {
		// 			for (var j=0, len2=selectedAnswer.length; j<len2; j++) {
		// 				if (selectedAnswer[j] === answer.option.value){
		// 					checked = true;
		// 					break;
		// 				}
		// 			}
		// /*			answerList[index[selectedAnswer]].input = checked;
		// 		}
		// 	} else {           // Radio buttons
		// 		checked = (selectedAnswer === answer.option.value);
		// 	}

			// answer.input.checked=checked;
			// if (answer.otherInput !== null) {
			// 	answer.otherInput.disabled = !checked;
			// }
		// }
	};

	return QuestionView;
});
