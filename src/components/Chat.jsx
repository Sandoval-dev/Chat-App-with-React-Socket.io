import React, { useEffect, useState } from 'react'

const Chat = ({ socket, username, room }) => {

    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    useEffect(() => {

        socket.on('messageReturn', (data) => {
            setMessageList((prev) => [...prev, data])
        })

    }, [socket])

    const sendMessage = async () => {

        const messageContent = {
            username: username,
            message: message,
            room: room,
            date: (new Date(Date.now)).getHours() + ':' + (new Date(Date.now)).getMinutes()
        }
        await socket.emit('message', messageContent)
        setMessageList((prev) => [...prev, messageContent])
        setMessage('')

    }
    console.log(messageList)
    return (
        <div className='flex items-center justify-center h-full'>

            <div className='w-1/3 h-[600px]  bg-indigo-200 relative'>
                <div className='w-full h-16 bg-gray-700 flex items-center p-2'>
                    <div className='w-12 h-12 bg-white rounded-full'></div>
                    <div className='font-bold text-white text-xl p-3'>{room}</div>
                </div>
                <div className='w-full h-[400px] overflow-y-auto'>
                    {
                        messageList && messageList.map((msg, i) => (
                            <div className={`${username===msg.username ?'flex justify-end' : '' }`}>
                            <div className={`${username === msg.username ? 'bg-green-600 rounded-br-none' : 'bg-blue-600 rounded-bl-none'} w-1/2 h-12 p-2  text-white m-2 rounded-xl`} >
                                <div>{msg.message}</div>
                                <div className='w-full flex justify-end text-xs mx-1'>{msg.username}</div>
                            </div>
                        </div>
                        ))
                    }

              

                </div>
                <div className='absolute bottom-0 left-0 w-full'>
                    <input value={message} onChange={e => setMessage(e.target.value)} className='w-3/4 h-12 border p-3 font-thin outline-none' type='text' placeholder='Message Send' />
                    <button onClick={sendMessage} className='w-1/4 bg-indigo-600 text-white h-12 rounde font-bold hover:opacity-80 transition ease-in-out delay-150'>SEND</button>
                </div>


            </div>

        </div>
    )
}

export default Chat