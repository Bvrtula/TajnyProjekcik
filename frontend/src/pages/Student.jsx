import KartaKontrolnaSprzataniaPokoju from '@/components/KartaKontrolnaSprzataniaPokoju'
import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import DrukSerwowaniaSniadanDoPokoju from '@/components/DrukSerwowaniaSniadanDoPokoju'
import KwitParkingowy from '@/components/KwitParkingowy'
import DrukUslugPralniczych from '@/components/DrukUslugPralniczych'


export const Student = () => {
  return (
    <div className='w-full flex justify-center'>
    <Tabs defaultValue="account" className="w-[1000px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="karta_kontrolna_sprzatania_pokoju">karta_kontrolna_sprzatania_pokoju</TabsTrigger>
        <TabsTrigger value="druk_serwowania_sniadan_do_pokoju">druk_serwowania_sniadan_do_pokoju</TabsTrigger>
        <TabsTrigger value="kwit_parkingowy">kwit_parkingowy</TabsTrigger>
        <TabsTrigger value="druk_uslug_pralniczych">druk_uslug_pralniczych</TabsTrigger>
      </TabsList>
      <TabsContent value="karta_kontrolna_sprzatania_pokoju">
        <KartaKontrolnaSprzataniaPokoju />
      </TabsContent>
      <TabsContent value="druk_serwowania_sniadan_do_pokoju">
        <DrukSerwowaniaSniadanDoPokoju />
      </TabsContent>
      <TabsContent value="kwit_parkingowy">
        <KwitParkingowy />
      </TabsContent>
      <TabsContent value="druk_uslug_pralniczych">
        <DrukUslugPralniczych />
      </TabsContent>
    </Tabs>
    </div>
  )
}
