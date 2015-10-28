<?php

if (!isset($TEMPLATE)) {
  $TITLE = 'Question View examples';
  $HEAD = '<link rel="stylesheet" href="hazdev-question-view.css"/>';
  $FOOT = '<script src="hazdev-question-view.js"></script>' .
    '<script src="example.js"></script>';
}
include '_example.inc.php';

?>

<ol>
  <li class="question1">First question</li>
  <li class="question2">Second question</li>
  <li class="question3">Third question</li>
</ol>

<div class="question4"></div>
<div class="question5"></div>
