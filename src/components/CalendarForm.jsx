import React from 'react';
import ReactLightCalendar from '@lls/react-light-calendar'
//import '@lls/react-light-calendar/dist/index.css'
import "./CalendarForm.css"
const DAY_LABELS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
const MONTH_LABELS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aûot', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

export default class CalendarForm extends React.Component {
  constructor(props) {
    super(props)
    const date = new Date()
    const startDate = date.getTime()
    this.state = {
      startDate, // Today
      endDate: new Date(startDate).setDate(date.getDate() + 6) // Today + 6 days
    }
    this.props.getDate(startDate, new Date(startDate).setDate(date.getDate() + 6));
  }

  onChange = (startDate, endDate) => {
    this.props.getDate(startDate, endDate);
    this.setState({ startDate, endDate });
  }

  render = () => {
    const { startDate, endDate } = this.state

    return (
        <ReactLightCalendar startDate={startDate} endDate={endDate} onChange={this.onChange} range displayTime />
    )
  }
}