import AddRoom from '../AddRoom/AddRoom'
import './UtilBar.css'

const UtilBar = ({
    currentFilter,
    setFilter,
    isAddOpen,
    handleAddRoomModal,
    submitRoom,
    closeAddRoom,
}) => {
    return (
        <div className="util-bar">
            <div className="status-selector">
                <label htmlFor="statusFilter">Status</label>
                <select
                    name="statusFilter"
                    id="statusFilter"
                    value={currentFilter}
                    onChange={(e) => {
                        setFilter(e.target.value)
                    }}
                >
                    <option value="all">All</option>
                    <option value="operational">Operational</option>
                    <option value="unoperational">Not operational</option>
                </select>
            </div>

            <AddRoom
                isAddOpen={isAddOpen}
                addRoom={handleAddRoomModal}
                submitRoom={submitRoom}
                closeAddRoom={closeAddRoom}
            />
        </div>
    )
}

export default UtilBar
