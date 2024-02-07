import React, { useState } from 'react';

const ChatBody = () => {
    const [inputValue, setInputValue] = useState('')
    const textMsg = (event)=>{
        setInputValue(event.target.value);
    };

    const handleKeyPress = (event)=>{
        if( event.key === 'Enter'){
            sendMsg();
        }
    }
    const sendMsg = ()=>{
        const message = document.querySelector('.msg');
        message.innerText=inputValue;
    }

    return (
        <div className='chatContainer'>
            <div className="result">
                <p className="msg"></p>
            </div>
            <div className='inputContainer'>
                <textarea className="inputMsg" placeholder='Message DumGPT...' onChange={textMsg} onKeyPress={handleKeyPress}></textarea>
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