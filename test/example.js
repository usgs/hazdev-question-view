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
		el: document.querySelector('question1'),
		title:'This is a question?',
		multiSelect:false,
		allowOther:false,
		//expanded:false,
		//required:false,
		answers:[
			{
				value:'answer1',
				title:'answer1'
			},
			{
				value:'answer2',
				title:'answer2'
			},
			{
				value:'answer3',
				title:'answer3'
			}
		]
	});

	questionView.show();
});
