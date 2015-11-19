var data = [
    {id: 1, author: "Pete Hunt", text: "This is one comment"},
    {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentBox = React.createClass({
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});

            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    },
    handleCommentSubmit: function(comment){
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data : comment,
            success : function(data){
                this.setState({data:data});
             }.bind(this),
            error: function(xhr,status,err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)



        });

    },
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount(){
        this.loadCommentsFromServer();

        // the reason why there is just a function name
        // instead of a function call ('function()') is that
        // the first parameter passed to 'setInterval()'
        // should be a function not a function call.
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function () {
        return {author: '', text: ''};
    },
    handleAuthorChange: function (e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function (e) {
        this.setState({author: e.target.value});
    },
    handleSubmit: function(e){
        e.preventDefault();
        var author= this.state.author.trim();
        var text= this.state.text.trim();
        if (!text || !author){
            return ;

        }

        this.props.onCommentSubmit({author: author, text: text});

        this.setState({author: '' , text : ''});


    },
    render: function () {
        return (
            <div className="commentForm">
                <form className="commentForm" onSubmit={this.handleSubmit}>
                    <input type="text"
                           value={this.state.author}
                           onChange={this.handleAuthorChange}
                           placeholder="Your name"/>
                    <input type="text"
                           onChange={this.handleTextChange}
                           value={this.state.text}
                           placeholder="Say something"/>
                    <input type="submit" value="Post"/>
                </form>
            </div>
        )
    }


})

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
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
});

ReactDOM.render(
    <CommentBox url='/learn-react-js/api/comments.json' pollInterval={2000}/>,
    document.getElementById('container')
);