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
		answers:null  // Array of answers, each with attributes:
		              // value - The "value" for the input
		              // label - The answer to show the user
		              // otherValue - optional extra value for more info
		              // otherLabel - Question to ask associate with otherValue
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
		this._options = Util.extend({}, DEFAULTS, options || {});
		this._answerList = [];

		View.call(this, this._options);
	};

	QuestionView.prototype = Object.create(View.prototype);

	QuestionView.prototype._initialize = function () {
		var options = this._options;

		// Clear any place holder words within the containing element.
		this.el.innerHTML = [
			'<section class="question">',
				'<header class="question-label"></header>',
				'<div class="question-options"></div>',
			'</section>'
		].join('');

		// The question being asked (question-label)
		this._label = this.el.querySelector('.question-label');
		this._label.innerHTML = options.label;

		// The list of answers
		this._answers = this.el.querySelector('.question-options');
		this._addAnswers();
		this.setAnswer(options.selectedAnswer);

		this.getAnswer();  // TODO remove this when done testing
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
		    inputType = (options.multiSelect ? 'checkbox' : 'radio'),
		    answers = options.answers,
		    answer,
		    answerList = this._answerList,
		    questionId = 'question-' + (++ID_SEQUENCE),
		    answerId,
		    buf = [];

		for (var i=0, len=answers.length; i<len; i++) {
			answer = answers[i];
			answerId = 'answer-' + (++ID_SEQUENCE);

			buf.push(
				'<label for="', answerId, '" class="answer-', i, '">',
					'<input',
						' type="', inputType, '"',
						' name="', questionId, '"',
						' id="', answerId, '"',
						' value="', answer.value, '"',
						'/>',
					answer.label,
				'</label>'
			);
			if (typeof answer.otherLabel === 'string') {
				buf.push(
					'<label for="', answerId, '" class="answer-', i, '-other other">',
					answer.otherLabel,
					'<input',
						' type="textbox"',
						' name="', questionId, '-other"',
						' id="', answerId, '-other"',
						' value="', answer.otherValue, '"',
						'/>',
					'</label>'
				);
			}
		}

		this._answers.innerHTML = buf.join('');

		// Keep track of answers with array of answer objects.
		for (i=0, len=answers.length; i<len; i++) {
			answer = answers[i];
			answerList.push({
				option: answer,
				input: this._answers.querySelector('.answer-' + i + ' > input'),
				otherInput: this._answers.querySelector(
						'.answer-' + i + '-other > input')
			});
		}

		// Bind and add event listeners to all inputs
		this._onChange = this._onChange.bind(this);
		this._onBlur = this._onBlur.bind(this);

		for (i=0, len=answerList.length; i<len; i++) {
			answerList[i].input.addEventListener('change', this._onChange);
			if (answerList[i].otherInput !== null) {
				answerList[i].otherInput.addEventListener('blur', this._onBlur);
			}
		}
	};

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
	 * Clean up event listeners
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
	QuestionView.prototype.getAnswer = function() {
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
	 */
	QuestionView.prototype.setAnswer = function(selectedAnswer) {
		var options = this._options,
		    answerList = this._answerList,
		    multiSelect = options.multiSelect,
		    checked;

		var len=answerList.length;
		// Make sure everything is unchecked first
		for (var k=0; k<len; k++) {
			answerList[k].input.checked=false;
		}

		for (var i=0; i<len; i++) {
			var answer = answerList[i];

			if (multiSelect) { // Check boxes
				checked = false;
				if (selectedAnswer !== null) {
					for (var j=0, len2=selectedAnswer.length; j<len2; j++) {
						if (selectedAnswer[j] === answer.option.value){
							checked = true;
							break;
						}
					}
				}
			} else {           // Radio buttons
				checked = (selectedAnswer === answer.option.value);
			}

			answer.input.checked=checked;
			if (answer.otherInput !== null) {
				answer.otherInput.disabled = !checked;
			}
		}
	};

	return QuestionView;
});
