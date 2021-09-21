import "react-datepicker/dist/react-datepicker.css";

import { useState } from 'react';
import DatePicker from "react-datepicker"

import Icon from "../icon";
import * as S from './styles'

type Props = {
  position: 'right' | 'left'
}
const DateRange = ( {position='right'}:Props ) => {
  const [state, setState] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <S.Wrapper>
      <Icon source="Transactions" background="Gray" size="Medium" action={()=>setState(!state)} />
      {state &&
        <S.WrapperCalendar position={position}>
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </S.WrapperCalendar> }

    </S.Wrapper>
  )
}

export default DateRange
