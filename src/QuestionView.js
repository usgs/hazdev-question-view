/* global define */
define([
	'util/Util'
], function (
	Util
) {
	'use strict';

	var DEFAULTS = {
		el:document.createElement('div'),
		title:null,        // The question being asked
		multiSelect:false, // For radio buttons or checkboxes, radio is default
		allowOther:false,  // To create a text field when other is selected
		//expanded:false,    // Expanded view for displaying list of answers
		//required:false,     // To mark a question as being required to answer
		currentAnswer:null,
		answers:[
			{
				value:null,
				title:null
			}
		]
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

		this.el = options.el || document.createElement('section');
		this.el.classList.add('question');

		this._title = this.el.appendChild(document.createElement('question-title'));
		this._title.innerHTML = options.title;

		if (options.multiSelect) {

		}

		if (options.allowOther) {

		}

		this._currentAnswer = this.el.appendChild(document.createElement('question-answer'));
		this._currentAnswer.innerHTML = options.currentAnswer;

		this._answers = [];
		// add all provided answers when constructing
		if (options.answers) {
			for (var i=0, len=options.answers.length; i<len; i++) {
				this.addAnswer(options.answer[i], true);
			}
		}
		//this._answers = this.el.appendChild(document.createElement('question-options'));
		//this._answers.innerHTML = options.answers;
	};

	/**
	 * Add an item to this list.
	 *
	 * @param options {Object}
	 *        item being added to list.
	 */
	QuestionView.prototype.addAnswer = function () {
		// assign unique ids to this items elements
		var id = ++ID_SEQUENCE;
		var answerId = 'answer-list-' + id;

		// summary element
		var answerEl = document.createElement('span');
		answerEl.id = answerId;
		answerEl.className = 'answer-list';
		answerEl.setAttribute('role', 'answer');
		var answerContent = this.getAnswers();
		if (typeof answerContent === 'string') {
			answerEl.innerHTML = answerContent;
		} else {
			answerEl.appendChild(answerContent);
		}

		// save reference to tab and elements
		var answer = {
			answerEl: answerEl
		};
		this._answers.push(answer);

		// add elements to dom
		this._nav.appendChild(answerEl);

		// return reference to tab for selecting
		return answer;
	};

	return QuestionView;
});
