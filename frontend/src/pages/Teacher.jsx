
import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import PDFUpload from '@/components/PDFUpload'
import Dashboard from '@/components/TestResults'
import Testy from '@/components/Testy'

const Teacher = () => {
  return (
    <div className='w-full flex justify-center'>
    <Tabs defaultValue="account" className="w-[1000px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="upload_pdf">upload_pdf</TabsTrigger>
        <TabsTrigger value="testy">testy</TabsTrigger>
      </TabsList>
      <TabsContent value="upload_pdf">
        <PDFUpload />
      </TabsContent>
      <TabsContent value="testy">
        <Testy />
      </TabsContent>
    </Tabs>
    </div>
  )
}

export default Teacher