import UserButton from '../Room/UserButton'
import '../Room/Room.css'
import EditCottage from './EditCottage'
import ReserveCottage from '../ViewCottage/ReserveCottage'
import ReserveButton from '../ViewCottage/ReserveButton'
import { Link } from 'react-router-dom'

const Cottage = ({
    cottage,
    isAdmin,
    dates,
    handleModification,
    handleReserveCottage,
}: any) => {
    return (
        <div className="room-card" style={{ marginBottom: '1em' }}>
            <div className="room-img">
                <img src="data:image/jpeg;base64,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" />
            </div>
            <div className="room-overview">
                <h2>{cottage.name}</h2>
                {/* <p>{}</p> */}
                <p>{cottage.description}</p>
            </div>
            <div className="room-actions">
                <div className="room-rate">₱{cottage.price}</div>
                <div className="room-cta">
                    {isAdmin ? (
                        <EditCottage
                            cottage={cottage}
                            handleModification={handleModification}
                        />
                    ) : (
                        // <ReserveCottage
                        //     cottage={cottage}
                        //     handleSubmit={handleSubmit}
                        // />
                        <>
                            <ReserveButton
                                cottage={cottage}
                                handleReserveCottage={handleReserveCottage}
                                dates={dates}
                            />
                            <button className="btn-view-room">
                                <Link
                                    state={dates}
                                    to={`/service/cottage/${cottage.cottageId}`}
                                    className="view-room-link"
                                >
                                    View
                                </Link>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cottage
