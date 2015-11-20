
var CommentForm = React.createClass({
    getInitialState: function () {
        return {author: '', text: ''};
    },
    handleAuthorChange: function (e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function (e) {
        this.setState({text: e.target.value});
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
            <div className="commentForm form-control-static">
                <form className="commentForm"  onSubmit={this.handleSubmit}>
                    <input  type="text"
                            className="form-group form-control "
                            value={this.state.author}
                            onChange={this.handleAuthorChange}
                            placeholder="Your name"/>
                    <input type="text"
                           className="form-group form-control "
                           onChange={this.handleTextChange}
                           value={this.state.text}
                           placeholder="Say something"/>
                    <input type="submit" className="form-control btn btn-success" value="Post"/>
                </form>
            </div>
        )
    }


})