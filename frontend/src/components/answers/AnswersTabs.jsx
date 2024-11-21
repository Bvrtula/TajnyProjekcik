import React, { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../ui/button'

const AnswerTabs = () => {
  const { userid } = useParams();
  const navigate = useNavigate()
  console.log(userid)
  return (
    <>
        <p className='text-3xl text-center my-4'>
            ODPOWIEDZI
        </p>
        <div className='w-full flex gap-2 justify-center m-12'>
          <Button onClick={() => navigate(`/teacher/test/1/odpowiedzi/kwitParkingowy/${userid}`)}>Kwit Parkingowy</Button>
          <Button onClick={() => navigate(`/teacher/odpowiedzi/wstawkaDlaGosciSpecjalnych/${userid}`)}>Wstawka Dla Gości Specjalnych</Button>
        </div>
    </>
  )
}

export default AnswerTabs