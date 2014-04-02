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

	new QuestionView({
		el: document.querySelector('.question1'),
		title:'This is a question?',
		multiSelect:false,
		allowOther:false,
		//expanded:false,
		//required:false,
		selectedAnswer:'second-answer',
		answers:[
			{
				value:'first-answer',
				title:'Answer 1'
			},
			{
				value:'second-answer',
				title:'Answer 2'
			},
			{
				value:'third-answer',
				title:'Answer 3'
			}
		]
	});

	new QuestionView({
		el: document.querySelector('.question2'),
		title:'This IS a question!',
		multiSelect:true,
		allowOther:false,
		//expanded:false,
		//required:false,
		answers:[
			{
				value:'first-answer',
				title:'My answer'
			},
			{
				value:'second-answer',
				title:'Your answer'
			},
			{
				value:'third-answer',
				title:'Their answer'
			}
		]
	});

	new QuestionView({
		el: document.querySelector('.question3'),
		title:'This one uses an "other" box',
		multiSelect:false,
		allowOther:true,
		//expanded:false,
		//required:false,
		answers:[
			{
				value:'first-answer',
				title:'Some answer'
			},
			{
				value:'second-answer',
				title:'Another answer'
			}
		]
	});

	new QuestionView({
		el: document.querySelector('.question4'),
		title:'These ones are in a div',
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
				title:'#1'
			},
			{
				value:'second-answer',
				title:'#2'
			},
			{
				value:'third-answer',
				title:'#3'
			},
			{
				value:'fourth-answer',
				title:'#4'
			},
			{
				value:'fifth-answer',
				title:'#5'
			}
		]
	});

	new QuestionView({
		el: document.querySelector('.question5'),
		title:'One last question',
		multiSelect:true,
		allowOther:false,
		//expanded:false,
		//required:false,
		answers:[
			{
				value:'answer-high',
				title:'High'
			},
			{
				value:'answer-low',
				title:'Low'
			},
			{
				value:'answer-up',
				title:'Up'
			},
			{
				value:'answer-down',
				title:'Down'
			},
			{
				value:'answer-left',
				title:'Left'
			},
			{
				value:'answer-right',
				title:'Right'
			}
		]
	});
});
