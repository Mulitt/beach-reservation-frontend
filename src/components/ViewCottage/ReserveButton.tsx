import { useState } from 'react'
import { Modal, Button, Group, Box } from '@mantine/core'
import CottageForm from './CottageForm'

function ReserveButton({ cottage, handleSubmit }: any) {
    const [opened, setOpened] = useState(false)

    return (
        <>
            <Modal opened={opened} onClose={() => setOpened(false)} size={800}>
                <Box>
                    <CottageForm
                        closeModal={() => setOpened(false)}
                        cottageId={cottage.cottageId}
                        state={undefined}
                        handleSubmit={handleSubmit}
                    />
                </Box>
            </Modal>

            <Group position="center">
                <Button size="md" onClick={() => setOpened(true)}>
                    Reserve
                </Button>
            </Group>
        </>
    )
}

export default ReserveButton
