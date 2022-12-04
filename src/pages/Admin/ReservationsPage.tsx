import { Tabs } from '@mantine/core'
import { MdOutlineBedroomChild } from 'react-icons/md'
import { FaUmbrellaBeach } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import ContentHeader from '../../components/ContentHeader'
import Reservations from '../../components/Reservations/Reservations'
import Cottages from '../../components/Reservations/Cottages'

type TReservation = {
    bookingId: Number
    roomNumber: Number
    cottageName: String
    userId: Number
    checkin: String
    checkout: String
    adults: Number
    kids: Number
    price: Number
    createdAt: String
}

const ReservationsPage = () => {
    const [roomReservations, setRoomReservations] = useState<TReservation[]>([])
    const [cottageReservations, setCottageReservations] = useState<
        TReservation[]
    >([])

    useEffect(() => {
        fetchReservations()
    }, [])

    function fetchReservations() {
        // fetch('http://localhost:5000/api/admin/reservations')
        fetch('https://beach-reservation.onrender.com/api/admin/reservations')
            .then((response) => response.json())
            .then((data) => {
                data.rooms.map((reservation: any) => {
                    setRoomReservations((prev) => [...prev, reservation])
                })
                data.cottages.map((reservation: any) => {
                    setCottageReservations((prev) => [...prev, reservation])
                })
            })
    }

    return (
        <div className="main">
            <ContentHeader text={'Reservations'} />
            <Tabs defaultValue="gallery" mt="md">
                <Tabs.List>
                    <Tabs.Tab
                        value="gallery"
                        icon={<MdOutlineBedroomChild size={24} />}
                    >
                        Rooms
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="messages"
                        icon={<FaUmbrellaBeach size={24} />}
                    >
                        Cottages
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="gallery" pt="xs">
                    <Reservations reservations={roomReservations} />
                </Tabs.Panel>
                <Tabs.Panel value="messages" pt="xs">
                    <Cottages reservations={cottageReservations} />
                </Tabs.Panel>
            </Tabs>
        </div>
    )
}

export default ReservationsPage
