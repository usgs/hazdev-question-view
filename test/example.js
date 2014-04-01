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
		answers:[
			{
				value:'answer1',
				title:'Answer 1'
			},
			{
				value:'answer2',
				title:'Answer 2'
			},
			{
				value:'answer3',
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
				value:'answer1',
				title:'My answer'
			},
			{
				value:'answer2',
				title:'Your answer'
			},
			{
				value:'answer3',
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
				value:'answer1',
				title:'Some answer'
			},
			{
				value:'answer2',
				title:'Another answer'
			}
		]
	});

	new QuestionView({
		el: document.querySelector('.question4'),
		title:'These ones are in a div',
		multiSelect:false,
		allowOther:true,
		//expanded:false,
		//required:false,
		answers:[
			{
				value:'answer1',
				title:'#1'
			},
			{
				value:'answer2',
				title:'#2'
			},
			{
				value:'answer3',
				title:'#3'
			},
			{
				value:'answer4',
				title:'#4'
			},
			{
				value:'answer5',
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
