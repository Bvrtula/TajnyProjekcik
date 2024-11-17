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
import { da } from "date-fns/locale"
import { useNavigate } from "react-router-dom"
import { Button } from './ui/button'
import { useState, useEffect } from "react"
  
const Dashboard = () => {
    const navigate = useNavigate()
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/teacher/odpowiedzi", {
          method: "GET",
          headers: {
          "Content-Type": "Application/JSON",
          }})
          .then((respose) => respose.json())
          .then((data) =>  setResults(data))
          .then(() => console.log(exams))
          .catch((error) => {
            console.log(error)
          })}, []);

    return (
      <div className='w-[600px] mx-auto'>
      <div className="flex justify-between items-center">
        <h1 className='text-3xl font-bold p-4 my-3'>Klasa 4TM</h1>
        <Button onClick={() => navigate("/teacher")}>Powrót</Button>
      </div>
      <Table>
        <TableCaption>Lista uczniów którzy rozwiązali test</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Imię</TableHead>
            <TableHead>Nazwisko</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((data) => (
            <TableRow key={data.id} className="hover:cursor-pointer hover:shadow-xl" onClick={() => navigate(`/teacher/test/answer/${data.id}`)}>
              <TableCell>{data.firstname}</TableCell>
              <TableCell>{data.lastname}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    )
  }
  export default Dashboard
  