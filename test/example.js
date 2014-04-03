/* global require */
require.config({
	baseUrl: '..',
	paths: {
		'mvc': '/hazdev-webutils/src/mvc',
    'util': '/hazdev-webutils/src/util'
	}
});

require([
	'QuestionView'
], function (
	QuestionView
) {
	'use strict';

/*
   // ----------------------------------------------------------------------
   // Example of all values with comments
   // ----------------------------------------------------------------------
	new QuestionView({
		el: document.querySelector('.question1'), // Match the class in your html
		label:'This is a question?',              // Ask your question
		multiSelect:false,               // Allow multiple answers or only one?
		allowOther:false,
		//expanded:false,                // Not yet implemented
		//required:false,                // Not yet implemented
		selectedAnswer:'second-answer',  // Use a string for single default answer
		//selectedAnswer:[               // Use an array to select multiple defaults
		//	'second-answer',
		//	'fourth-answer'
		//],
		answers:[                        // Array of answer options objects
			{
				value:'first-answer',        // 'Value' for the input element
				label:'Answer 1'             // The human-friendly answer to show
			},
			{
				value:'second-answer',
				label:'Answer 2'
			},
			{      // As many answers as you need for your question, each in an object
				value:'third-answer',
				label:'Answer 3'
			}
		]
	});
*/

	new QuestionView({
		el: document.querySelector('.question1'),
		label:'This is a question?',
		multiSelect:false,
		allowOther:false,
		//expanded:false,
		//required:false,
		selectedAnswer:'second-answer',
		answers:[
			{
				value:'first-answer',
				label:'Answer 1'
			},
			{
				value:'second-answer',
				label:'Answer 2'
			},
			{
				value:'third-answer',
				label:'Answer 3'
			}
		]
	});

	new QuestionView({
		el: document.querySelector('.question2'),
		label:'This IS a question!',
		multiSelect:true,
		allowOther:false,
		//expanded:false,
		//required:false,
		answers:[
			{
				value:'first-answer',
				label:'My answer'
			},
			{
				value:'second-answer',
				label:'Your answer'
			},
			{
				value:'third-answer',
				label:'Their answer'
			}
		]
	});

	new QuestionView({
		el: document.querySelector('.question3'),
		label:'This one uses an "other" box',
		multiSelect:false,
		allowOther:true,
		//expanded:false,
		//required:false,
		answers:[
			{
				value:'first-answer',
				label:'Some answer'
			},
			{
				value:'second-answer',
				label:'Another answer'
			}
		]
	});

	new QuestionView({
		el: document.querySelector('.question4'),
		label:'These ones are in a div',
		multiSelect:true,
		allowOther:true,
		//expanded:false,
		//required:false,
		selectedAnswer:[
			'second-answer',
			'fourth-answer'
		],
		answers:[
			{
				value:'first-answer',
				label:'#1'
			},
			{
				value:'second-answer',
				label:'#2'
			},
			{
				value:'third-answer',
				label:'#3'
			},
			{
				value:'fourth-answer',
				label:'#4'
			},
			{
				value:'fifth-answer',
				label:'#5'
			}
		]
	});

	new QuestionView({
		el: document.querySelector('.question5'),
		label:'One last question',
		multiSelect:true,
		allowOther:false,
		//expanded:false,
		//required:false,
		answers:[
			{
				value:'answer-high',
				label:'High'
			},
			{
				value:'answer-low',
				label:'Low'
			},
			{
				value:'answer-up',
				label:'Up'
			},
			{
				value:'answer-down',
				label:'Down'
			},
			{
				value:'answer-left',
				label:'Left'
			},
			{
				value:'answer-right',
				label:'Right'
			}
		]
	});
});
