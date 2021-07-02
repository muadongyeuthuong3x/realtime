import React from 'react'
import moment from 'moment'
import './CommentCard.css'

function CommentCard({children, comment}) {
   
    return (
        <div className="comment_card">
            <div className="comment_card_row">
                <h3>{comment.username}</h3>
             
            </div>

            <span>{moment(comment.createdAt).fromNow()}</span>

            <span>{new Date(comment.createdAt).toLocaleString()}</span>

            <p dangerouslySetInnerHTML={{__html: comment.content}}
              style={{
                padding: '5px 10px',
                outline: 'none',
                marginBottom:"10px",
                wordWrap:"break-word"
            }} />

         
       {comment.reply && comment.reply.map((data ,index) =>(
              <div className="comment_multer">
                    <h3>{data.username}</h3>
                    <span>{moment(data.createdAt).fromNow()}</span>
        
        <span>{new Date(data.createdAt).toLocaleString()}</span>
        
        <p dangerouslySetInnerHTML={{__html: data.content}}
          style={{
            padding: '5px 10px',
            outline: 'none',
            marginBottom:"10px",
            wordWrap:"break-word"
        }} />
         </div>
       ))}    

           

            {children}
            
        </div>
    )
}

export default CommentCard