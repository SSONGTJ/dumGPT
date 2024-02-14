import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';
import axiosClient from './AxiosClient';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    const [chList, setChList]  = useState([]);
    const navigate = useNavigate();
   
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

    const handleChannelClick = (channelId) => {
        navigate(`practice/chat?channelId=${channelId}`);
    }

    return (
        <div className='nav'>
            <div className='addChat'>
                <button onClick={()=>{
                    addChList()
                    handleChannelClick(chList[chList.length-1].channelId)
                }}>New chat</button>

                <button><a href="/">Home</a></button>
            </div>

            <div className='content'>
                <div>
                    <ol>
                    {chList.map((v,idx)=>{
                        return(
                            <li key={idx} onClick={ () => {
                                handleChannelClick(v.channelId)
                            }}>
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