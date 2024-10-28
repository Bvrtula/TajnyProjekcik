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
    return (
      <Table>
        <TableCaption>Lista uczniów którzy rozwiązali test</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Imię</TableHead>
            <TableHead>Nazwisko</TableHead>
            <TableHead>Klasa</TableHead>
            <TableHead>Test</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.data}>
              <TableCell>{data.imie}</TableCell>
              <TableCell>{data.nazwisko}</TableCell>
              <TableCell>{data.klasa}</TableCell>
              <TableCell><a className="hover:text-custom-blue cursor-pointer">{data.test}</a></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  export default Dashboard
  