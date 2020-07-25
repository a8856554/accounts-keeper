import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody , Input} from 'reactstrap';
import CalendarForm from './CalendarForm';
import "./CalendarPopover.css"
export default class Wrapper extends React.Component {
    render() {
      return (
          <PopoverWrapper buttonLabel="Select Date" />
      )
    }
}

const PopoverHook = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    const toggle_submit = () => {
        setPopoverOpen(!popoverOpen)
    };

    const getDateRange = (startDate, endDate) =>{
        console.log(`Date range is ${new Date(startDate)} to ${new Date(endDate)}`)
    }
    return (
        <div>
            <Button id="PopoverLegacy" color="primary" type="button">
                Select date range
            </Button>
            <Popover id = "calendar-popover" placement="top" isOpen={popoverOpen} target="PopoverLegacy" toggle={ toggle }>
            
            
            
                <PopoverBody id = "calendar-popoverbody">
                    <CalendarForm getDate = {getDateRange}/>
                    <Button id="popover-submit" color="primary" type="button" onClick = {toggle_submit}>
                        Submit
                    </Button>
                </PopoverBody>
        </Popover>
        </div>
    );
}


function PopoverWrapper({ props }) {
    return PopoverHook({ props });
}