import Cottage from './Cottage'

type TCottage = {
    cottageId: Number
    name: String
    rate: Number
    desc: String
}

function CottageList({
    cottages,
    handleModification,
    isAdmin,
    handleSubmit,
}: any) {
    return (
        <>
            {cottages.length > 0 ? (
                cottages.map((cottage: TCottage) => (
                    <Cottage
                        key={cottage.cottageId}
                        cottage={cottage}
                        isAdmin={isAdmin}
                        handleModification={handleModification}
                        handleSubmit={handleSubmit}
                    />
                ))
            ) : (
                <p style={{ textAlign: 'center' }}>No available cottages</p>
            )}
        </>
    )
}

export default CottageList
