var marked = require('marked');
var React = require('react');

module.exports= React.createClass({
    rawMarkup: function () {
        var rawMarkup = marked(marked(this.props.children.toString(), {sanitize: true}))
        //sanitize: true 过滤HTML语法, 然而不是标签过滤
        return {__html: rawMarkup};

    },

    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor text-info">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
            </div>
        );
    }
});