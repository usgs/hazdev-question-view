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
		title:null,         // The question being asked
		multiSelect:false,  // For radio buttons or checkboxes, radio is default
		allowOther:false,   // To create a text field when other is selected
		//expanded:false,     // Expanded view for displaying list of answers
		//required:false,     // To mark a question as being required to answer
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
		this._answers.innerHTML = this._addAnswers();

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
		    addOther = options.allowOther,
		    id = ++ID_SEQUENCE,
		    questionId = 'question-' + id,
		    answerId = 'answer-' + id,
		    buf = [];

		for (var i=0, len=answers.length; i<len; i++) {
			buf.push(
				'<label for="', answerId, '" class="answer-', i, '">',
					'<input',
						' type="', inputType, '"',
						' name="', questionId, '"',
						' id="', answerId, '"',
						' value="', answerId, '"',
						'/>',
					answers[i].title,
				'</label>'
			);

			// Keep track of answers with array of answer objects.
			this._answerList.push({
				options: answers[i],
				input: this.el.querySelector('.answer-' + i + ' > input')
			});

			id = ++ID_SEQUENCE;
			answerId = 'answer-' + id;
		}

		if (addOther) {
			buf.push(
				'<label for="', answerId, '" class="other">',
					'<input',
						' type="', inputType, '"',
						' name="', questionId, '"',
						' id="', answerId, '"',
						' value="', answerId, '"',
						'/>',
					'Other',
					'<input type="text" name="', questionId, '">',
				'</label>'
			);
		}
		return buf.join('');
	};

	/**
	 * Sets input.checked on input elements.
	 *
	 */
	QuestionView.prototype._setAnswer = function() {

	}


	/**
	 * Return list of answers.
	 *
	 * @return {String|Array}
	 *         This implementation returns obj.title.
	 */
	QuestionView.prototype.getAnswers = function() {
		var answers = this._options.answers,
				answerList = this._answerList;

		for (var i=0, len=answerList.length; i<len; i++) {
			console.log('options '+answerList[i].options.title);
			console.log('input '+answerList[i].input);
		}

		return answers;
	};

	return QuestionView;
});
