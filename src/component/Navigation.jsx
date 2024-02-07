import React, { useState } from 'react';
import ChatList from './ChatList';

const navigation = () => {
    const [chList, setChList]  = useState([
        {
            name:'첫번째 채널'
        },
        {
            name:'두번째 채널'
        },
        {
            name:'세번째 채널'
        },
        {
            name:'네번째 채널'
        },
        {
            name:'다섯번째 채널'
        }
    ]);
    return (
        <div className='nav'>
            <div className='addChat'>
                New chat
            </div>

            <div className='content'>
                <div>
                    <ol>
                    {chList.map((v,idx)=>{
                        return(
                            <li key={idx}>
                                <ChatList name={v.name}/>
                            </li>
                        )
                    })}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default navigation;