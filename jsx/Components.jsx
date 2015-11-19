var CommentBox = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList/>
                <CommentForm/>
            </div>
        );
    }
})

var CommentForm = React.createClass({
    render: function () {
        return (
            <div className="commentForm">
                Hello, I am a CommentForm.
            </div>
        )
    }
})

var CommentList = React.createClass({
    render: function () {
        return (
            <div className="commentList">
                <Comment author="Zizy">this is **comment** one  </Comment>
                <Comment author="Sure">this is *comment* two</Comment>
            </div>
        );
    }
})

var Comment = React.createClass({
    rawMarkup: function () {
        var rawMarkup = marked(marked(this.props.children.toString(), {sanitize: true}))
        //sanitize: true 过滤HTML语法, 然而不是标签过滤
        return {__html: rawMarkup};

    },

    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
            </div>
        );
    }
})

ReactDOM.render(
    <CommentBox />,
    document.getElementById('container')
);