var $ = require('jquery');

/**
 * Created by media-06 on 11/19/15.
 */
var CommentBox = require('./components/CommentBox.jsx');
var React = require('react');

var ReactDOM = require('react-dom');


$(document).ready(function(){
    ReactDOM.render(
        <CommentBox url='http://localhost:3000/comments' pollInterval={2000}/>,
        document.getElementById('container')
    );
});
