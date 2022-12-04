import { useState } from 'react'
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates'

function CottageFilter() {
    const [value, setValue] = useState<DateRangePickerValue>([
        new Date(),
        new Date(),
    ])

    return (
        <DateRangePicker
            width={100}
            fullWidth={false}
            placeholder="Pick dates range"
            value={value}
            onChange={setValue}
        />
    )
}

export default CottageFilter
