var CommentBox=React.createClass({
    render: function(){
        return (
            <div classname="commentBox">
                Hello, I am a commentBox;
            </div>
        );
    }
})

ReactDOM.render(
    <CommentBox />,
    document.getElementById('container')

);