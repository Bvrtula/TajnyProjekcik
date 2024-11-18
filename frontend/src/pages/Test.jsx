import React, { useState } from 'react'
import KartaKontrolnaSprzataniaPokoju from '@/components/KartaKontrolnaSprzataniaPokoju'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import DrukSerwowaniaSniadanDoPokoju from '@/components/DrukSerwowaniaSniadanDoPokoju'
import KwitParkingowy from '@/components/KwitParkingowy'
import DrukUslugPralniczych from '@/components/DrukUslugPralniczych'
import WstawkaDlaGosciSpecjalnych from '@/components/WstawkaDlaGosciSpecjalnych'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const Test = () => {
    const navigate = useNavigate()
    const [submissionStates, setSubmissionStates] = useState({
        kwitParkingowy: false,
        wstawkaDlaGosciSpecjalnych: false,
        kartaKontrolnaSprzataniaPokoju: false,
        drukSerwowaniSniadanDoPokoju: false,
        drukUslugPralniczych: false,
    });

    const handleSolved = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/student/egzamin/zakoncz', {
            method: 'POST',
            credentials: 'include',
        })
            .then(() => navigate('/student'))
            .catch((error) => {
                console.log(error);
            });
    };

    const markFormAsSubmitted = (formName) => {
        setSubmissionStates((prev) => ({ ...prev, [formName]: true }));
    };
  return (
    <>
        <div>
            POLECENIE EGZAMINU...
            <Button onClick={handleSolved}>Zakończ</Button>
        </div>
        <div className='w-full flex justify-center'>
        <Tabs defaultValue="account" className="w-[1400px]">
        <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="karta_kontrolna_sprzatania_pokoju">karta_kontrolna_sprzatania_pokoju</TabsTrigger>
            <TabsTrigger value="druk_serwowania_sniadan_do_pokoju">druk_serwowania_sniadan_do_pokoju</TabsTrigger>
            <TabsTrigger value="kwit_parkingowy">kwit_parkingowy</TabsTrigger>
            <TabsTrigger value="druk_uslug_pralniczych">druk_uslug_pralniczych</TabsTrigger>
            <TabsTrigger value="wstawka_dla_gosci_specjalnych">wstawka_dla_gosci_specjalnych</TabsTrigger>
        </TabsList>
        <TabsContent value="karta_kontrolna_sprzatania_pokoju">
            <KartaKontrolnaSprzataniaPokoju isSubmitted={submissionStates.kartaKontrolnaSprzataniaPokoju} onFormSubmit={() => markFormAsSubmitted('kartaKontrolnaSprzataniaPokoju')}/>
        </TabsContent>
        <TabsContent value="druk_serwowania_sniadan_do_pokoju">
            <DrukSerwowaniaSniadanDoPokoju isSubmitted={submissionStates.drukSerwowaniSniadanDoPokoju} onFormSubmit={() => markFormAsSubmitted('drukSerwowaniSniadanDoPokoju')}/>
        </TabsContent>
        <TabsContent value="kwit_parkingowy">
            <KwitParkingowy isSubmitted={submissionStates.kwitParkingowy} onFormSubmit={() => markFormAsSubmitted('kwitParkingowy')}/>
        </TabsContent>
        <TabsContent value="druk_uslug_pralniczych">
            <DrukUslugPralniczych isSubmitted={submissionStates.drukUslugPralniczych} onFormSubmit={() => markFormAsSubmitted('drukUslugPralniczych')}/>
        </TabsContent>
        <TabsContent value="wstawka_dla_gosci_specjalnych">
            <WstawkaDlaGosciSpecjalnych isSubmitted={submissionStates.wstawkaDlaGosciSpecjalnych} onFormSubmit={() => markFormAsSubmitted('wstawkaDlaGosciSpecjalnych')}/>
        </TabsContent>
        </Tabs>
        </div>
    </>
  )
}

export default Test