import React from 'react'
import {useMultiChatLogic, MultiChatSocket, MultiChatWindow} from "react-chat-engine-advanced";
import Header from "../customHeader";
import StandardMessageForm from "../customMessageForms/standardMessageForm";
import Ai from '../customMessageForms/Ai';
import AiCode from '../customMessageForms/AiCode';
import AiAssist from '../customMessageForms/AiAssist';

const Chat = () => {
    const chatProps = useMultiChatLogic(
        // import.meta.env.VITE_PROJECT_ID,
        // user
        // secret
    )
    return <div style={{flexBasis: "100%"}}>
        <MultiChatSocket {...chatProps} />
        <MultiChatWindow 
            {...chatProps}
            style={{height: "100vh"}}
            renderChatHeader={(chat) => <Header chat={chat}/>}
            renderMessageForm={(props) => {
              if(chatProps.chat?.title.startsWith("AI_Chat")) {
                return <Ai props={props} activeChat={chatProps.chat}/>;
              }
                
              if(chatProps.chat?.title.startsWith("AI_Code")) {
                return <AiCode props={props} activeChat={chatProps.chat}/>;
              }
              if(chatProps.chat?.title.startsWith("AI_Assist")) {
                return <AiAssist props={props} activeChat={chatProps.chat}/>;
              }
                
              return  <StandardMessageForm props={props} activeChat={chatProps.chat} />
            }}
        />
    </div>;
}

export default Chat;