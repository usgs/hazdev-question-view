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
		this._answerIndex = [];

		View.call(this, this._options);
	};

	QuestionView.prototype = Object.create(View.prototype);

	QuestionView.prototype._initialize = function () {
		var section = document.createElement('section');
		section.classList.add('question');

		section.appendChild(this._addAnswers());

		this.setAnswers(this._options.selectedAnswer);

		this.el.innerHTML = '';
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
		    answerList = document.createElement('fieldset'),
		    legend = document.createElement('legend'),
		    ul = document.createElement('ul'),
		    answerIndex = this._answerIndex,
		    answer,
		    i,
		    len;

		answerList.name = questionId;
		legend.textContent = options.label;
		answerList.appendChild(legend);

		for (i=0, len=answers.length; i<len; i++) {
			this._addAnswer(answers[i], questionId, ul);
		}
		answerList.appendChild(ul);
		this._answerList = answerList;

		// Keep track of answers with array of answer objects.
		for (i=0, len=answers.length; i<len; i++) {
			answer = answers[i];
			// answerIndex.push({
				// option: answer
				// input: this._answers.querySelector('.answer-' + i + ' > input'),
				// otherInput: this._answers.querySelector(
				// 		'.answer-' + i + '-other > input')
			// });
			answerIndex[answer.value] = i;
		}

		// Bind and add event listeners to all inputs.
		this._onChange = this._onChange.bind(this);
		this._onBlur = this._onBlur.bind(this);

		answerElement = answerList.getElementsByTagName('li');
		for (i=0, len=answerElement.length; i<len; i++) {
			var inputs = answerElement[i].getElementsByTagName('input');
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
	 * @param answer {Object}
	 *        qId {Integer} Unique identifier for the question
	 *        ul {Document.Element} Container element for the answers
	 *
	 * @return String
	 *         Contains an answer wrapped in appropriate HTML.
	 *
	 */
	QuestionView.prototype._addAnswer = function (answer, qId, ul) {
		var answerId = 'answer-' + (++ID_SEQUENCE),
				inputType = (this._options.multiSelect ? 'checkbox' : 'radio'),
		    li = document.createElement('li'),
		    label = document.createElement('label'),
		    input = document.createElement('input'),
		    answerText = document.createTextNode(answer.label);

		label.for = answerId;
		label.classList.add('answer');

		input.type = inputType;
		input.name = qId;
		input.id = answerId;
		input.value = answer.value;

		label.appendChild(input);
		label.appendChild(answerText);

		li.appendChild(label);

		if (typeof answer.otherLabel === 'string') {
			var textbox = document.createElement('input');
			textbox.type = 'textbox';
			textbox.name = qId + '-other';
			textbox.id = answerId + '-other';
			textbox.value = answer.otherValue;
			textbox.classList.add('other');
			textbox.placeholder = answer.otherLabel;
			li.appendChild(textbox);
		}
		ul.appendChild(li);
	};

	/**
	 * Event listener for "other" inputs.
	 * Radio buttons & check boxes.
	 *       Enable or disable text boxes associated with "other".
	 *       Put focus in text box when associated radio/checkbox is selected.
	 *
	 */
	QuestionView.prototype._onChange = function (ev) {
		var target = ev.target,
		    answerList = this._answerList,
		    answerElement = answerList.getElementsByTagName('li'),
		    i,
		    len = answerElement.length,
		    checked;

		for (i=0; i<len; i++) {
			var inputs = answerElement[i].getElementsByTagName('input');
			// If there is an "other" input textbox
			if (inputs[1] !== undefined) {
				checked = inputs[0].checked;
				inputs[1].disabled = !checked;
				// If the "other" input checkbox for this textbox is target
				if (inputs[0] === target && checked) {
					inputs[1].focus();
				}
			}
		}
		this.trigger('change', this);
	};

	/**
	 * Event listener for "other" inputs.
	 * Text boxes.
	 *      If the value in the text box changes, save the change.
	 *
	 */
	QuestionView.prototype._onBlur = function (ev) {
		var target = ev.target,
				answers = this._options.answers,
		    answerList = this._answerList,
		    answerElement = answerList.getElementsByTagName('li'),
		    i,
		    len = answerElement.length;

		for (i=0; i<len; i++) {
			var inputs = answerElement[i].getElementsByTagName('input');
			if (inputs[1] === target) {
				if (answers[i].otherValue !== target.value) {
					answers[i].otherValue = target.value;
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
	 * Clear all answers.
	 *       Uncheck all check boxes and radio buttons.
	 *       Disable all text boxes for "other" fields.
	 */
	QuestionView.prototype.clearAnswers = function () {
		var answerList = this._answerList,
		    answerElement = answerList.getElementsByTagName('li'),
		    i,
		    len = answerElement.length;

		for (i=0; i<len; i++) {
			var inputs = answerElement[i].getElementsByTagName('input');
			inputs[0].checked = false;
			// If there is an "other" input textbox
			if (inputs[1] !== undefined) {
				inputs[1].disabled = true;
			}
		}
	};

	/**
	 * Clean up event listeners, remove list of answers
	 *
	 */
	QuestionView.prototype.destroy = function () {
		var answerList = this._answerList,
				answerElement = answerList.getElementsByTagName('li'),
		    i,
		    len = answerElement.length;

		this._answerList = null;
		for (i=0; i<len; i++) {
			var inputs = answerElement[i].getElementsByTagName('input');
			inputs[0].removeEventListener('change', this._onChange);
			if (inputs[1] !== undefined) {
				inputs[1].removeEventListener('blur', this._onBlur);
			}
			inputs = null;
		}
		answerElement = null;
	};

	/**
	 * Return list of answers.
	 *
	 * @return {Object|Array}
	 *         Null if no answers are selected
	 *         An object containing a single answer if only 1 is selected
	 *         An array of answer objects if there is more than 1
	 */
	QuestionView.prototype.getAnswers = function () {
		var options = this._options,
		    answer = options.answers,
		    currentAnswer = [],
		    answerList = this._answerList,
		    answerElement = answerList.getElementsByTagName('li'),
		    i,
		    len = answerElement.length;
    // TODO, this not working
		for (i=0; i<len; i++) {
			var inputs = answerElement[i].getElementsByTagName('input');
			// console.log(inputs[0].checked);
			if (inputs[0].checked) {
				// console.log(answer[i]);
				currentAnswer.push(
					answer[i]
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
	 * Assumes a string for the "value" of a single answer.
	 *
	 * @param {String}
	 *        The "value" of the selected answer.
	 */
	QuestionView.prototype.selectAnswers = function (answer) {
		var inputs;

		if (typeof answer !== 'undefined') {
			inputs = answer.getElementsByTagName('input');
			if (inputs[0]) {
				inputs[0].checked = true;
				// If there is an "other" input textbox
				if (inputs[1] !== undefined) {
					inputs[1].disabled = false;
				}
			}
		}
	};

	/**
	 * Finds all of the selected answers.
	 * Calls selectAnswer with each of them.
	 *
	 * Assumes a string for the value of a single answer if multiSelect:false
	 * Assumes an array of answer values if multiSelect:true
	 *
	 * @param {String|Array}
	 *        A string containing the "value" of the selected answer.
	 *        The list of currently selected answers as strings.
	 */
	QuestionView.prototype.setAnswers = function (selectedAnswer) {
		var answerList = this._answerList,
		    answerElement = answerList.getElementsByTagName('li'),
		    answer,
		    answerIndex = this._answerIndex,
		    i,
		    len;

		// Make sure everything is unchecked first
		this.clearAnswers();

		if (selectedAnswer === null) {
			return;
		}

		if (typeof selectedAnswer === 'string') {
			answer = answerElement[answerIndex[selectedAnswer]];
			this.selectAnswers(answer);
		} else {  // Array of strings
			for (i=0, len=selectedAnswer.length; i<len; i++) {
				answer = answerElement[answerIndex[selectedAnswer[i]]];
				this.selectAnswers(answer);
			}
		}
	};

	return QuestionView;
});
