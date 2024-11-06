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

const data = [
    {
      imie: "jacek",
      nazwisko: "kowalczyk",
      klasa: "3TH",
      test: "Egzamin zawodowy 2023 - praktyczny",
    },
    {
      imie: "jacek",
      nazwisko: "kowalczyk",
      klasa: "3TH",
      test: "Egzamin zawodowy 2023 - praktyczny",
    },
    {
      imie: "jacek",
      nazwisko: "kowalczyk",
      klasa: "3TH",
      test: "Egzamin zawodowy 2023 - praktyczny",
    },
    {
      imie: "jacek",
      nazwisko: "kowalczyk",
      klasa: "3TH",
      test: "Egzamin zawodowy 2023 - praktyczny",
    },
    {
      imie: "jacek",
      nazwisko: "kowalczyk",
      klasa: "3TH",
      test: "Egzamin zawodowy 2023 - praktyczny",
    },
  ]
  
const Dashboard = () => {
  const navigate = useNavigate()
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
            <TableHead>Test</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.data} className="hover:cursor-pointer hover:shadow-xl" onClick={() => navigate(``)}>
              <TableCell>{data.imie}</TableCell>
              <TableCell>{data.nazwisko}</TableCell>
              <TableCell><a className="hover:text-custom-blue cursor-pointer">{data.test}</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    )
  }
  export default Dashboard
  