
import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import PDFUpload from '@/components/PDFUpload'
import Dashboard from '@/components/Dashboard'

const Teacher = () => {
  return (
    <div className='w-full flex justify-center'>
    <Tabs defaultValue="account" className="w-[1000px]">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="upload_pdf">upload_pdf</TabsTrigger>
        <TabsTrigger value="dashboard">dashboard</TabsTrigger>
      </TabsList>
      <TabsContent value="upload_pdf">
        <PDFUpload />
      </TabsContent>
      <TabsContent value="dashboard">
        <Dashboard />
      </TabsContent>
      <TabsContent value="2">
      </TabsContent>
    </Tabs>
    </div>
  )
}

export default Teacher