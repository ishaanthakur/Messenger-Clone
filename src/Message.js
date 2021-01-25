//rfce es7 snippet
 
import React, { forwardRef } from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'; 
import './Message.css';
//forwardRef wrapping every messages with some addiotnal funcitonalities which in this case
// is a reference to the message state
const Message = forwardRef(({message, username}, ref) => {
    const isUser = username === message.username;
    return (

        <div ref={ref} className = {`message_card ${isUser && 'message_usr'}`}> 
                 <Card className = {isUser? "msg_usr_card": "msg_gst_card"}>
                <CardContent>
                    <Typography
                        color = "white"
                        variant = "h5"
                        component = "h2"
                    >
                       {!isUser && `${message.username || 'Unknown User'}: `}{message.message}
                    </Typography>
                </CardContent>
            </Card>   
        </div>
                
       
    )
})

export default Message
