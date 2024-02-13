import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';
import axiosClient from './AxiosClient';


const Navigation = () => {
    const [chList, setChList]  = useState([]);
    
    useEffect(() => {
        getChList();
    }, []);

    const getChList = async () => {
        const {data} = await axiosClient.get("/practice/channel")
        console.log(data);
        setChList(data);

    }

    const addChList = async ()=>{
        await axiosClient.post("/practice/channel/new",{
            channelName: "이름변경"
        }); 
        getChList();
    }

    const handleRenameChList = async (channelId, label) => {
        await axiosClient.patch("/practice/channel/update",{
            channelId:channelId,
            channelName:label
        })
        getChList();
    }
    const deleteChList = async (channelId) => {
        console.log('i delete ' + channelId);
        await axiosClient.delete("/practice/channel/"+channelId+"/delete")
        await getChList()
    }

    return (
        <div className='nav'>
            <div className='addChat'>
                <button onClick={()=>{
                    console.log('am i working?')
                    addChList()
                }}>New chat</button>
            </div>

            <div className='content'>
                <div>
                    <ol>
                    {chList.map((v,idx)=>{
                        return(
                            <li key={idx}>
                                <ChatList id={v.channelId} name={v.channelName} renameHandler={handleRenameChList} deleteHandler={deleteChList}/>
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