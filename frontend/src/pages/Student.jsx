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
import { useState, useEffect, React } from 'react'





export const Student = () => {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:4000/student/egzaminy", {
          method: "GET",
          headers: {
          "Content-Type": "Application/JSON",
          }})
          .then((respose) => respose.json())
          .then((data) =>  setExams(data))
          .then(() => console.log(exams))
          .catch((error) => {
            console.log(error)
          })}, []);

  return (
    <div className='w-[600px] mx-auto'>
    <h1 className='text-3xl font-bold p-4 my-3'>Twoje egzaminy</h1>
    <Table>
        <TableCaption>Lista dostępnych egzaminów</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nazwa egzaminu</TableHead>
            <TableHead>Klasa</TableHead>
            <TableHead>Data dodania</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.map((el) => (
            <TableRow key={el.id} className="hover:cursor-pointer hover:shadow-xl" onClick={() => navigate(`/student/test/${el.id}`)}>
              <TableCell ><a className="hover:text-custom-blue cursor-pointer">{el.nazwa}</a></TableCell>
              <TableCell >{el.klasa}</TableCell>
              <TableCell >{el.data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
)}
