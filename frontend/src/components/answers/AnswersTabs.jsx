import React, { useState } from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import KwitParkingowyAnswer from './KwitParkingowyAnswer'
import { useParams } from 'react-router-dom'


const AnswerTabs = () => {
  const { userid } = useParams();
  console.log(userid)
  return (
    <>
        <div>
            ODPOWIEDZI
        </div>
        <div className='w-full flex justify-center'>
        <Tabs defaultValue="account" className="w-[1400px]">
        <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="kwit_parkingowy">kwit_parkingowy</TabsTrigger>
        </TabsList>
        <TabsContent value="kwit_parkingowy">
            <KwitParkingowyAnswer userid={userid} />
        </TabsContent>
        </Tabs>
        </div>
    </>
  )
}

export default AnswerTabs