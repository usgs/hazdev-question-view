/* global define */
define([
	'util/Util'
], function (
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
		this._answers.innerHTML = this.addAnswers();

		this.getAnswers();
	};

	/**
	 * Add all answers to the list of answers.
	 *
	 */
	QuestionView.prototype.addAnswers = function () {
		var options = this._options,
		    inputType = (options.multiSelect ? 'checkbox' : 'radio'),
		    answers = options.answers,
		    addOther = options.allowOther,
		    id = ++ID_SEQUENCE,
		    questionId = 'question-' + id,
		    answerId = 'answer-' + id,
		    buf = [];

		for (var i=0, len=answers.length; i<len; i++) {
			buf.push([
				'<input type="' + inputType + '" name="' + questionId +
					'" id="' + answerId + '" value="' + answerId + '">' +
				'<label for="' + answerId + '">' +
					answers[i].title +
				'</label>'
			]);

			id = ++ID_SEQUENCE;
			answerId = 'answer-' + id;
		}

		if (addOther) {
			buf.push([
				'<input type="' + inputType + '" name="' + questionId +
					'" id="' + answerId + '" value="' + answerId + '">' +
				'<label for="' + answerId + '">' +
					'Other' +
				'</label>' +
				'<input type="text" class="other" name="' + questionId + '">'
			]);
		}
		return buf.join('');
	};

	/**
	 * Return list of answers.
	 *
	 * @return {String|DOMElement}
	 *         This implementation returns obj.title.
	 */
	QuestionView.prototype.getAnswers = function() {
		var answers = this._options.answers;

		console.log(answers);
		return answers;
	};

	return QuestionView;
});
