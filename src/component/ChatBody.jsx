import React, { useState } from 'react';

const ChatBody = () => {
    const [inputValue, setInputValue] = useState('')
    const [chat, setChat] = useState([
        {
            user:"나",
            logMsg:"안녕?"
        },
        {
            user:"DumGPT",
            logMsg:"몰루?"
        },

    ])

    const textMsg = (event)=>{
        setInputValue(event.target.value);
    };

    const handleKeyPress = (event)=>{
        if( event.key === 'Enter'){
            sendMsg();
        }
    }
    const sendMsg = ()=>{
        setChat([
            ...chat,
            {
                user: '나',
                logMsg: inputValue
            },
            {
                user:"DumGPT",
                logMsg:"몰루?"
            }
        ]);
        setInputValue("");
    }


    return (
        <div className='chatContainer'>
            <div className="result">
                <div className="msgBox">
                    {chat.map((m, idx)=>
                        <div key={idx}>
                            <div>{m.user}</div>
                            <div>{m.logMsg}</div>
                        </div>
                    )}
                </div>
            </div>
            <div className='inputContainer'>
                <input className="inputMsg" placeholder='Message DumGPT...' onChange={textMsg} value={inputValue} onKeyPress={handleKeyPress}></input>
                <button className='sendBtn' onClick={sendMsg}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatBody;