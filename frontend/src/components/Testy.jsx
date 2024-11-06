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

const Testy = () => {
    const navigate = useNavigate()

    
  return (
    <div className='w-[600px] mx-auto'>
    <h1 className='text-3xl font-bold p-4 my-3'>Utworzone testy</h1>
    <Table>
        <TableCaption>Lista wszystkich utworzonych testów</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nazwa testu</TableHead>
            <TableHead>Klasa</TableHead>
            <TableHead>Data dodania</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.data} className="hover:cursor-pointer hover:shadow-xl" onClick={() => navigate(`/teacher/test/${data.id}`)}>
              <TableCell ><a className="hover:text-custom-blue cursor-pointer">{data.testname}</a></TableCell>
              <TableCell >{data.klasa}</TableCell>
              <TableCell >{data.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
  )}

export default Testy