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
		el:document.createElement('section'),
		title:null,          // The question being asked
		multiSelect:false,   // For radio buttons or checkboxes, radio is default
		allowOther:false,    // To create a text field when other is selected
		//expanded:false,      // Expanded view for displaying list of answers
		//required:false,      // To mark a question as being required to answer
		selectedAnswer:null, // Any answers that should be selected by default
		answers:null
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
		this._initialize();
	};

	QuestionView.prototype._initialize = function () {
		var options = this._options;

		this.el = options.el;
		// Clear any place holder words within the containing element.
		this.el.innerHTML = [
			'<section class="question">',
				'<header class="question-title"></header>',
				'<div class="question-options"></div>',
			'</section>'
		].join('');

		// The question being asked (question-title)
		this._title = this.el.querySelector('.question-title');
		this._title.innerHTML = options.title;

		// The list of answers
		this._answers = this.el.querySelector('.question-options');
		this._addAnswers();
		this._setAnswer();

		this.getAnswers();
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
		    addOther = options.allowOther,
		    questionId = 'question-' + ++ID_SEQUENCE,
		    answerId,
		    buf = [];

		for (var i=0, len=answers.length; i<len; i++) {
			answer = answers[i];
			answerId = 'answer-' + ++ID_SEQUENCE;

			buf.push(
				'<label for="', answerId, '" class="answer-', i, '">',
					'<input',
						' type="', inputType, '"',
						' name="', questionId, '"',
						' id="', answerId, '"',
						' value="', answer.value, '"',
						'/>',
					answer.title,
				'</label>'
			);
		}

		if (addOther) {
			answerId = 'answer-' + ++ID_SEQUENCE;
			buf.push(
				'<label for="', answerId, '" class="other">',
					'<input',
						' type="', inputType, '"',
						' name="', questionId, '"',
						' id="', answerId, '"',
						' value="other"',
						'/>',
					'Other',
					'<input type="text"/>',
				'</label>'
			);
		}

		this._answers.innerHTML = buf.join('');

		// Keep track of answers with array of answer objects.
		for (i=0, len=answers.length; i<len; i++) {
			answer = answers[i];
			this._answerList.push({
				options: answer,
				input: this._answers.querySelector('.answer-' + i + ' > input')
			});
		}
		if (addOther){
			this._other = {
				input: this._answers.querySelector('.other > input'),
				value: this._answers.querySelector('.other > input[type="text"]')
			};
		}
	};

	/**
	 * Sets input.checked on input elements.
	 * Assumes a string for the value of a single answer if multiSelect:false
	 * Assumes an array of answer values if multiSelect:true
	 *
	 */
	QuestionView.prototype._setAnswer = function() {
		var options = this._options,
		    selectedAnswer,
		    answerList = this._answerList,
		    multiSelect = options.multiSelect;

 		if (options.selectedAnswer !== null) {
 			selectedAnswer = options.selectedAnswer;
 		} else {
 			return;
 		}

		if (selectedAnswer !== null) {
			for (var i=0, len=answerList.length; i<len; i++) {
				if (multiSelect) { // Check boxes
					for (var j=0, len2=selectedAnswer.length; j<len2; j++) {
						if (selectedAnswer[j] == answerList[i].options.value) {
							answerList[i].input.checked="checked";
						}
					}
				} else {           // Radio buttons
					if (selectedAnswer == answerList[i].options.value) {
						answerList[i].input.checked="checked";
					}
				}
			}
		}

	};


	/**
	 * Return list of answers.
	 *
	 * @return {Object|Array}
	 *         Null if no answers are selected
	 *         An object containing a single answer if only 1 is selected
	 *         An array of answer objects if there is more than 1
	 */
	QuestionView.prototype.getAnswers = function() {
		var options = this._options,
		    addOther = options.allowOther,
		    answer,
		    currentAnswer = [],
		    answerList = this._answerList;

		for (var i=0, len=answerList.length; i<len; i++) {
			answer = answerList[i];
			if (answer.input.checked) {
				currentAnswer.push(
					answer.options
				);
			}
		}

		if (addOther) {
			if (this._other.input.checked) {
				currentAnswer.push(
					{
						value: 'other',
						title: this._other.value.value
					}
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

	return QuestionView;
});
