import React from 'react'

const Room = ({username, room, setUsername, setRoom, setChatScreen, socket}) => {

    const sendRoom = () => {

      socket.emit('room', room)
      setChatScreen(true)
    }
  return (
    <div className='flex items-center justify-center h-full'>
        <div className='w-1/3 h-[340px] bg-indigo-600 flex flex-col space-y-4 p-3 rounded-md'>
            <h1 className='font-bold text-2xl text-center my-4'>Welcome to Chat</h1>
            <input value={username} name='username' onChange={e => setUsername(e.target.value)} type="text" className='h-12 rounded-xl p-3 outline-none' placeholder='Username'/>
            <input value={room} name='room' onChange={e => setRoom(e.target.value)} type="text" className='h-12 rounded-xl p-3 outline-none' placeholder='Room'/>
            <div onClick={sendRoom} className='tracking-wider border h-12 p-2 text-xl text-center rounded-lg transition ease-in-out delay-150 bg-indigo-300 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-800 duration-300 hover:text-white cursor-pointer'>Chat!</div>

        </div>
    </div>
  )
}

export default Room