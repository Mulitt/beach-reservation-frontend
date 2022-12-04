import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import ContentHeader from '../../components/ContentHeader'
import Modal from '../../components/Modal/Modal'
import PostAlert from '../../components/PostAlert/PostAlert'
import RoomFilter from '../../components/RoomFilter/RoomFilter'
import RoomList from '../../components/RoomList/RoomList'
import SubmissionLoader from '../../components/SubmissionLoader/SubmissionLoader'

const RoomsPage = () => {
    const [rooms, setRooms] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [openedRoom, setOpenedRoom] = useState(0)
    const [isSubmitSuccess, setisSubmitSuccess] = useState(false)
    const [displayAlert, setdisplayAlert] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function openModal(id) {
        setModalOpen(true)
        setOpenedRoom(id)
    }

    function closeModal() {
        setModalOpen(false)
    }

    function closeAlert() {
        setdisplayAlert(false)
    }

    // Handles submission of reservation form
    async function reserveRoom(details) {
        setIsSubmitting(true)

        // const response = await fetch('http://localhost:5000/api/reserve/room', {
        const response = await fetch(
            'https://beach-reservation.onrender.com/api/reserve/room',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(details),
            }
        )

        const status = await response.json()

        closeModal()
        setIsSubmitting(false)

        if (status.status === 'fail') {
            setisSubmitSuccess(false)
        } else {
            setisSubmitSuccess(true)
        }

        setdisplayAlert(true)
    }

    // Filters out rooms
    async function filterRooms(checkin, checkout, type) {
        setIsLoading(true)

        const response = await fetch(
            // `http://localhost:5000/api/rooms/filter?type=${type}&checkin=${checkin}&checkout=${checkout}`
            `https://beach-reservation.onrender.com/api/rooms/filter?type=${type}&checkin=${checkin}&checkout=${checkout}`
        )
        const data = await response.json()

        setIsLoading(false)

        // Remove current rooms from state
        setRooms([])

        if (!data) return

        // Set new rooms to state
        data.map((room) => {
            setRooms((prev) => [...prev, room])
        })
    }

    // Disabling scroll on main content when modal is open
    useEffect(() => {
        if (modalOpen || displayAlert) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [modalOpen, displayAlert])

    // Getting rooms at first load
    useEffect(() => {
        setIsLoading((curr) => (curr = !curr))
        // fetch('http://localhost:5000/api/rooms')
        fetch('https://beach-reservation.onrender.com/api/rooms')
            .then((response) => response.json())
            .then((data) => {
                data.map((room) => setRooms((prev) => [...prev, room]))
                setIsLoading((curr) => (curr = !curr))
            })
    }, [])

    return (
        <>
            {isSubmitting && <SubmissionLoader />}

            <div className="main">
                <ContentHeader text={'Rooms'} />
                <RoomFilter handleFilter={filterRooms} />

                {modalOpen && (
                    <Modal
                        closeModal={closeModal}
                        roomNumber={openedRoom}
                        state={modalOpen}
                        handleSubmit={reserveRoom}
                    />
                )}

                <PostAlert
                    closeAlert={closeAlert}
                    status={isSubmitSuccess}
                    isVisible={displayAlert}
                />

                <RoomList
                    roomsData={rooms}
                    reserveRoom={openModal}
                    isLoading={isLoading}
                />
                <Outlet />
            </div>
        </>
    )
}

export default RoomsPage
