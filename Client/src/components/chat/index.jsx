import React from 'react'
import {useMultiChatLogic, MultiChatSocket, MultiChatWindow} from "react-chat-engine-advanced";
import Header from "../customHeader";
import StandardMessageForm from "../customMessageForms/standardMessageForm";

const Chat = () => {
    const chatProps = useMultiChatLogic(
        import.meta.env.VITE_PROJECT_ID,
        "John@1234",
        "1234"
    )
    return <div style={{flexBasis: "100%"}}>
        <MultiChatSocket {...chatProps} />
        <MultiChatWindow 
            {...chatProps}
            style={{height: "100vh"}}
            renderChatHeader={(chat) => <Header chat={chat}/>}
            renderMessageForm={(props) => {
                <StandardMessageForm props={props} activeChat={chatProps.chat} />
            }}
        />
    </div>;
}

export default Chat;