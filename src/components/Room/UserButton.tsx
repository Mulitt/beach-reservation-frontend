import { Link } from 'react-router-dom'

const UserButton = ({ room, reserveRoom }) => {
    return (
        <>
            <button
                className="btn-reserve"
                onClick={() => {
                    reserveRoom(room.roomNumber)
                }}
            >
                Reserve
            </button>
            <button className="btn-view-room">
                <Link
                    to={`/service/rooms/${room.roomNumber}`}
                    className="view-room-link"
                >
                    View
                </Link>
            </button>
        </>
    )
}

export default UserButton
