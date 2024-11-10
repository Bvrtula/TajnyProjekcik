import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
const data = [
    {
    id: 1,
    testname: "egzamin1",
    klasa: "4TH",
    date: "17-02-2024"
    }, 
]

export const Student = () => {
  const navigate = useNavigate()
  return (
    <div className='w-[600px] mx-auto'>
    <h1 className='text-3xl font-bold p-4 my-3'>Twoje egzaminy</h1>
    <Table>
        <TableCaption>Lista wszystkich zadanych egzaminów</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nazwa egzaminu</TableHead>
            <TableHead>Klasa</TableHead>
            <TableHead>Data dodania</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.data} className="hover:cursor-pointer hover:shadow-xl" onClick={() => navigate(`/student/test/${data.id}`)}>
              <TableCell ><a className="hover:text-custom-blue cursor-pointer">{data.testname}</a></TableCell>
              <TableCell >{data.klasa}</TableCell>
              <TableCell >{data.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
)}
