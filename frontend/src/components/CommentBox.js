import React from 'react';
import commentBox from 'commentbox.io';

class CommentBox extends React.Component {

    componentDidMount() {
        this.removeCommentBox = commentBox('Your commentBox project ID',{
            createBoxUrl(boxId, pageLocation) {
                pageLocation.search = pageLocation.search.replace("?",""); // removes query string!
                pageLocation.hash = boxId; // creates link to this specific Comment Box on your page
                return pageLocation.search.replace("?",""); // return url string
            },
        });
        
    }

    componentWillUnmount() {
        this.removeCommentBox(); 
    }

    render() {
        return (
            <div className="commentbox" />
        );
    }
}
export default CommentBox;