/* global define, describe, it, beforeEach */
define([
	'chai',
	'sinon',

	'mvc/View',
	'QuestionView'
], function (
	chai,
	sinon,

	View,
	QuestionView
) {
	'use strict';
	var expect = chai.expect;

	var emptyQuestion = new QuestionView({});

	var getClickEvent = function () {
		var evt = document.createEvent('MouseEvents');
		evt.initMouseEvent('click', true, true, window, 1, 0, 0);
		return evt;
	};
	var getChangeEvent = function () {
		var evt = document.createEvent('HTMLEvents');
		evt.initEvent('change', false, true);
		return evt;
	};
	var getBlurEvent = function () {
		var evt = document.createEvent('HTMLEvents');
		evt.initEvent('blur', false, true);
		return evt;
	};

	describe('QuestionView test suite', function () {

		describe('Constructor', function () {
			it('Is defined', function () {
				expect(typeof QuestionView).to.equal('function');
			});

			it('Inherits from View', function () {
				expect(emptyQuestion).to.be.an.instanceof(View);
			});

			it('Sets options on itself', function () {
				expect(new QuestionView).to.be.an.instanceof(Object);
			});

		});

		describe('_onChange', function () {
			it('Enables "other" input when selected', function () {
				var question = new QuestionView({
					label:'This one uses an "other" box',
					multiSelect:false,
					answers:[
						{
							value:'first-answer',
							label:'Some answer'
						},
						{
							value:'second-answer',
							label:'Another answer',
							otherValue:'Please specify...',
							otherLabel:'Other:'
						}
					]
				});

				expect(question._answerList[1].otherInput.disabled).to.equal(true);
				question._answerList[1].input.checked = true;
				question._answerList[1].input.dispatchEvent(getChangeEvent());
				expect(question._answerList[1].otherInput.disabled).to.equal(false);
			});

			it('Disables "other" input when de-selected', function () {
				var question = new QuestionView({
					label:'This one uses an "other" box',
					multiSelect:false,
					answers:[
						{
							value:'first-answer',
							label:'Some answer'
						},
						{
							value:'second-answer',
							label:'Another answer',
							otherValue:'Please specify...',
							otherLabel:'Other:'
						}
					]
				});

				expect(question._answerList[1].otherInput.disabled).to.equal(true);
				question._answerList[1].input.checked = false;
				question._answerList[1].input.dispatchEvent(getChangeEvent());
				expect(question._answerList[1].otherInput.disabled).to.equal(true);
			});
		});

		describe('_onBlur', function () {
			it('Triggers change event when value has changed', function () {
				var spy = sinon.spy();
				var question = new QuestionView({
					label:'This one uses an "other" box',
					multiSelect:false,
					selectedAnswer:'second-answer',
					answers:[
						{
							value:'first-answer',
							label:'Some answer'
						},
						{
							value:'second-answer',
							label:'Another answer',
							otherValue:'Please specify...',
							otherLabel:'Other:'
						}
					]
				});

				question.on('change', spy);
				question._answerList[1].otherInput.value = 'dont say anything';
				question._answerList[1].otherInput.dispatchEvent(getBlurEvent());
				expect(spy.callCount).to.equal(1);
				question._answerList[1].otherInput.dispatchEvent(getBlurEvent());
				expect(spy.callCount).to.equal(1);
				question._answerList[1].otherInput.value = 'yes, 20';
				question._answerList[1].otherInput.dispatchEvent(getBlurEvent());
				expect(spy.callCount).to.equal(2);
			});
		});

	});
});

