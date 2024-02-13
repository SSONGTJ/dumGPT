import React, { useState } from 'react';
import ChatList from './ChatList';

const Navigation = () => {
    const [chList, setChList]  = useState([
        {

            id: 1, 
            name:'첫번째 채널'
        },
        {
            id: 2, 
            name:'두번째 채널'
        },
        {
            id: 3, 
            name:'세번째 채널'
        },
        {
            id: 4, 
            name:'네번째 채널'
        },
        {
            id: 5, 
            name:'다섯번째 채널'
        }
    ]);
    const handleRenameChList = (id, newName) => {
        const newChList = chList.map((obj) => {
            if (obj.id !== id) {
                return obj; 
            }
            return {id, name: newName};
        }); 
        setChList(newChList);
    };
    
    const deleteChList = (id) => {
        const newChList = chList.filter ((obj)=>{
            if (obj.id !== id) {
                return obj;
            }
        })
        setChList(newChList);
    }
    console.log(chList);
    return (
        <div className='nav'>
            <div className='addChat'>
                <button onClick={()=>{
                    setChList([
                        ...chList,
                        {id:6, name:"여섯"}]
                        
                    )
                }}>New chat</button>
            </div>

            <div className='content'>
                <div>
                    <ol>
                    {chList.map((v,idx)=>{
                        return(
                            <li key={idx}>
                                <ChatList id={v.id} name={v.name} renameHandler={handleRenameChList} deleteHandler={deleteChList}/>
                            </li>
                        )
                    })}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export {Navigation};