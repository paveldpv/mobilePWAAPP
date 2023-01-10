// import React from 'react'

type Props = {
  label:string,
  units:string,
  mark:string,
  value:number,
  setValue:React.Dispatch<React.SetStateAction<Number>>
}

export default function InputParamsGears({label,units,mark,setValue}: Props) {
  return (
    <div>InputParamsGears</div>
  )
}