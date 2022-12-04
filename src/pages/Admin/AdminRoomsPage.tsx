import { useEffect, useState } from 'react'
import ContentHeader from '../../components/ContentHeader'
import RoomList from '../../components/RoomList/RoomList'
import EditRoom from '../../components/EditRoom/EditRoom'
import SubmissionLoader from '../../components/SubmissionLoader/SubmissionLoader'
import PostAlertAdmin from '../../components/PostAlert/PostAlertAdmin'
import UtilBar from '../../components/AdminUtilBar/UtilBar'

const AdminRoomsPage = () => {
    const [rooms, setRooms] = useState([{}])
    const [filter, setFilter] = useState('all')
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [submissionLoading, setSubmissionLoading] = useState(false)
    const [isPostSuccess, setIsPostSuccess] = useState(false)
    const [displayAlert, setDisplayAlert] = useState(false)

    // TODO: dd functionality to send request to server to modify room
    function modifyRoom(roomNumber) {
        setIsEditOpen(true)
    }

    function handleAddRoomModal() {
        setIsAddOpen((curr) => (curr = !curr))
    }

    function closeModal(e) {
        if (e.target.classList.contains('btn-cancel')) {
            setIsAddOpen(false)
            setIsEditOpen(false)
        }
    }

    function closeAlert() {
        setDisplayAlert(false)
    }

    function filterRooms(filter) {
        setFilter(filter)
    }

    async function submitRoom(details) {
        setSubmissionLoading(true)

        const response = await fetch(
            // 'http://localhost:5000/api/admin/room/add',
            'https://beach-reservation.onrender.com/api/admin/room/add',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(details),
            }
        )
        const status = await response.json()

        // remove submission loader
        setSubmissionLoading(false)
        // close addroom modal
        handleAddRoomModal()

        if (status.status === 'fail') {
            setIsPostSuccess(false)
        } else {
            setIsPostSuccess(true)
        }

        setDisplayAlert(true)

        setRooms((prev) => [
            ...prev,
            {
                roomNumber: status.roomNumer,
                type: details.type,
                bed: details.bed,
                description: details.shortDesc,
                status: details.status,
                price: details.rate,
            },
        ])
    }

    useEffect(() => {
        isEditOpen || isAddOpen
            ? (document.body.style.overflow = 'hidden')
            : (document.body.style.overflow = 'unset')
    }, [isEditOpen, isAddOpen])

    useEffect(() => {
        setIsLoading(true)
        // fetch(`http://localhost:5000/api/rooms/all/${filter}`)
        fetch(`https://beach-reservation.onrender.com/api/rooms/all/${filter}`)
            .then((response) => response.json())
            .then((data) => {
                setRooms([])
                data.map((room) => setRooms((prev) => [...prev, room]))
            })
        setIsLoading(false)
    }, [filter])

    return (
        <>
            {submissionLoading && <SubmissionLoader />}
            <div className="main">
                <ContentHeader text={'Rooms'} />
                <UtilBar
                    currentFilter={filter}
                    setFilter={filterRooms}
                    isAddOpen={isAddOpen}
                    handleAddRoomModal={handleAddRoomModal}
                    submitRoom={submitRoom}
                    closeAddRoom={closeModal}
                />
                <EditRoom isVisible={isEditOpen} closeEdit={closeModal} />
                <PostAlertAdmin
                    closeAlert={closeAlert}
                    status={isPostSuccess}
                    isVisible={displayAlert}
                />
                <RoomList
                    isLoading={isLoading}
                    roomsData={rooms}
                    isAdmin={true}
                    editRoom={modifyRoom}
                    reserveRoom={undefined}
                />
            </div>
        </>
    )
}

export default AdminRoomsPage
