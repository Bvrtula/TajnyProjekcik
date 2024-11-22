import React, { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'

import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../ui/button'

const AnswerTabs = () => {
  const { userid } = useParams();
  const { toast } = useToast()
  const [userData, setUserData] = useState();
  const navigate = useNavigate()
  console.log(userid)
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:4000/user/data/${userid}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast({
                title: 'Błąd',
                description: 'Nie udało się pobrać danych studenta.',
            });
        }
    };

    fetchData();
}, [userid, toast]);
  return (
    <div className='my-20 mx-[10%]'>
        <div className='flex justify-between'>
          <p className='text-3xl my-4'>
              {userData ? `Odpowiedzi ucznia: ${userData.firstname} ${userData.lastname}` : "Odpowiedzi"}
          </p>
          <p className='flex items-center'>
            <Button onClick={()=> navigate("/teacher/test/1")}>Powrót</Button>
          </p>
        </div>
        <hr className='m-2 w-full'></hr>
        <div className='w-full flex gap-2 justify-center m-12'>
          <Button onClick={() => navigate(`/teacher/test/1/odpowiedzi/kwitParkingowy/${userid}`)}>Kwit Parkingowy</Button>
          <Button onClick={() => navigate(`/teacher/test/1/odpowiedzi/wstawkaDlaGosciSpecjalnych/${userid}`)}>Wstawka Dla Gości Specjalnych</Button>
          <Button onClick={() => navigate(`/teacher/test/1/odpowiedzi/drukUslugPralniczych/${userid}`)}>Druk Usług Pralniczych</Button>
          <Button onClick={() => navigate(`/teacher/test/1/odpowiedzi/kartaKontrolnaSprzataniaPokoju/${userid}`)}>Karta Kontrolna Sprzatania Pokoju</Button>
          <Button onClick={() => navigate(`/teacher/test/1/odpowiedzi/drukSerwowaniaSniadanDoPokoju/${userid}`)}>Druk Serwowania Śniadań Do Pokoju</Button>
        </div>
    </div>
  )
}

export default AnswerTabs