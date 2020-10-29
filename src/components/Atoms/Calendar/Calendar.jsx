import PropTypes from 'prop-types';
import React from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import DatePicker from 'react-date-picker';

import './Calendar.sass';

const Calendar = ({ onChange, value, isRange, ...rest }) => {
  return (
    <div className='Calendar'>
      {isRange && (
        <DateRangePicker
          onChange={onChange}
          value={value}
          locale='es-CO'
          className='dateRangePicker'
          calendarClassName='dateRangePickerCalendar'
          {...rest}
        />
      )}
      {!isRange && (
        <DatePicker
          onChange={onChange}
          value={value}
          locale='es-CO'
          className='dateRangePicker'
          calendarClassName='dateRangePickerCalendar'
          {...rest}
        />
      )}
    </div>
  );
};

Calendar.defaultProps = {
  isRange: true,
};

Calendar.propTypes = {
  isRange: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default Calendar;
