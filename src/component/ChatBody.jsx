import React, { useEffect, useRef, useState } from 'react';
import axiosClient from './AxiosClient';
import { useLocation } from 'react-router-dom';

const ChatBody = () => {
    const [inputValue, setInputValue] = useState('')
    const [content, setContent] = useState([])

    const msgBoxRef = useRef(null)

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const channelId = searchParams.get("channelId")

    useEffect(()=>{
        getContent()
    }, [channelId])

    const getContent = async() => {
        const {data} = await axiosClient.get("/practice/chat?channelId="+channelId)
        setContent(data)
    }

    const textMsg = (event)=>{
        setInputValue(event.target.value);
    };

    const handleKeyPress = (event)=>{
        if( event.key === 'Enter'){
            sendMsg();
        }
    }
    const sendMsg = async ()=>{
        await axiosClient.post("/practice/channel/"+channelId+"/chat",{
            content:inputValue 
        })
        setInputValue("");
        getContent()
    }

    useEffect(()=>{
        console.log("실행 됨")
        window.scrollTo(0,0);
    }, [channelId])

    return (
        <div className='chatContainer'>
            <div className="result">
                <div className="msgBox" ref={msgBoxRef}>
                    {content.map((v, idx)=>
                        <div key={idx} className='wrap'>
                            <div className='author'>{v.author}</div>
                            <div className='content'>{v.content}</div>
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