var data = [
    {id: 1, author: "Pete Hunt", text: "This is one comment"},
    {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentBox = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data}/>
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
        var commentNodes=this.props.data.map(function(comment){
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
             )
        });
        return (
            <div className="commentList">
                {commentNodes}
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
    <CommentBox data={data} />,
    document.getElementById('container')
);