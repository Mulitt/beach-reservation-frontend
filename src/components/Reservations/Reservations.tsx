import './Reservations.css'

const Reservations = ({ reservations }: any) => {
    return (
        <div className="table-container">
            <table className="table-reservations">
                <thead>
                    <tr>
                        <td>Booking ID</td>
                        <td>User ID</td>
                        <td>Room</td>
                        <td>Created</td>
                        <td>Checkin</td>
                        <td>Checkout</td>
                        <td>Kids</td>
                        <td>Adults</td>
                        <td>Fee</td>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((data: any) => (
                        <tr key={data.bookingId}>
                            <td>{data.bookingId}</td>
                            <td>{data.userId}</td>
                            <td>{data.roomNumber}</td>
                            <td>
                                {new Date(data.createdAt).toLocaleDateString(
                                    'en-CA'
                                )}
                            </td>
                            <td>
                                {new Date(data.checkin).toLocaleDateString(
                                    'en-CA'
                                )}
                            </td>
                            <td>
                                {new Date(data.checkout).toLocaleDateString(
                                    'en-CA'
                                )}
                            </td>
                            <td>{data.kids}</td>
                            <td>{data.adults}</td>
                            <td>{data.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Reservations
