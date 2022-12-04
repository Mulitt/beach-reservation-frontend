import { useEffect, useState } from 'react'
import Room from '../Room/Room'
import ComponentLoader from '../ComponentLoader/ComponentLoader'
import './RoomList.css'

const RoomList = ({
    roomsData,
    reserveRoom,
    isLoading,
    isAdmin,
    editRoom,
}: any) => {
    const [rooms, setRooms] = useState([])
    const [roomLoading, setRoomLoading] = useState(false)

    useEffect(() => {
        setRoomLoading(isLoading)

        setRooms([])
        roomsData.map((room) => {
            setRooms((prev) => [...prev, room])
        })
    }, [roomsData, isLoading])

    return (
        <div className="room-container">
            {roomLoading ? (
                <ComponentLoader />
            ) : rooms.length > 0 ? (
                rooms.map((room) => (
                    <Room
                        key={room.roomNumber}
                        room={room}
                        reserveRoom={reserveRoom}
                        editRoom={editRoom}
                        isAdmin={isAdmin}
                    />
                ))
            ) : (
                <p style={{ textAlign: 'center', margin: '6em auto' }}>
                    No Available Rooms
                </p>
            )}
        </div>
    )
}

export default RoomList
