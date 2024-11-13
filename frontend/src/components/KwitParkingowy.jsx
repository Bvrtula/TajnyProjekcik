import React from 'react'
import { Input } from './ui/input'
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from 'date-fns'
import { pl } from 'date-fns/locale' 
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
const KwitParkingowy = () => {
    const thClass = "p-2 border-solid border-2 border-black w-3/12"
    const tdClass = " p-2 border-solid border-2 border-black text-left"
    const [okresKorzystaniaOd, setOkresKorzystaniaOd] = useState()
    const [okresKorzystaniaDo, setOkresKorzystaniaDo] = useState()
    const { toast } = useToast()

    const [data, setData] = useState({
      imie_i_nazwisko_goscia: "",
      nr_pokoju: "",
      samochod_marki: "",
      nr_rejestracyjny: "",
      podpis_pracownika: "",
    })

    const handleChange = (e) => {
      const {name, value} = e.target
      console.log(name, value)
      setData((prev) => {
        return {...prev, [name]:value}
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      
      const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
      data["okres_korzystania_od"] = okresKorzystaniaOd.toLocaleDateString('pl-PL', options)
      data["okres_korzystania_do"] = okresKorzystaniaDo.toLocaleDateString('pl-PL', options)

      console.log(data)
      fetch("http://localhost:4000/student/egzamin/kwitParkingowy", {
        method: "POST",
        headers: {
        "Content-Type": "Application/JSON",
        },
        credentials: "include",
        body: JSON.stringify(data),
        })
        .then((respose) => respose.json())
        .then((data) =>  console.log(data))
        .then(() => toast({
          title: "Sukces",
          description: `Pomyślnie przesłano odpowiedzi`
        }))
        .catch((error) => {
          console.log(error)
          toast({
            title: "Błąd",
            description: `Nie udało się utworzyć użytkownika: ${error}`,
        });
        });
    }

  return (
    <>
    <div className=' my-[3%]'>
    <form onSubmit={handleSubmit}>
    <table className='w-full border-collapse'>
        <tr>
            <th className={`${thClass} text-center`} colSpan={4}>
                <p>KWIT PARKINGOWY</p>
            </th>
        </tr>
        <tr >
            <td className={tdClass} colSpan={4}>
              <h2>Imię i nazwisko gościa / lub nazwa firmy korzystającej z parkingu:</h2>
              <div className='w-full my-2 p-1'>
                <Input className="h-full" rows={2} name="imie_i_nazwisko_goscia" onChange={handleChange}/>
              </div>
            </td>
        </tr>
        <tr >
            <th className={`${thClass} text-center`} colSpan={4}>
                <p>Okres korzystania z usługi parkingowej</p>
            </th>
        </tr>
        <tr>
            <td className={tdClass} colSpan={2}>
              <div className='flex justify-start items-center gap-3'>
              <h2>Od:</h2>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal",!okresKorzystaniaOd && "text-muted-foreground")}>
                        <CalendarIcon />
                        {okresKorzystaniaOd ? format(okresKorzystaniaOd, "PPP", { locale: pl }) : <span>Wybierz datę</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={okresKorzystaniaOd} onSelect={setOkresKorzystaniaOd} name="okres_korzystania_od" locale={pl} initialFocus/>
                    </PopoverContent>
                </Popover>
              </div>
            </td>
            <td className={tdClass} colSpan={2}>
              <div className='flex justify-start items-center gap-3'>
              <h2>Do:</h2>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal",!okresKorzystaniaDo && "text-muted-foreground")}>
                        <CalendarIcon />
                        {okresKorzystaniaDo ? format(okresKorzystaniaDo, "PPP", { locale: pl }) : <span>Wybierz datę</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={okresKorzystaniaDo} onSelect={setOkresKorzystaniaDo} locale={pl} initialFocus/>
                    </PopoverContent>
                </Popover>
              </div>
            </td>
        </tr>
        <tr >
            <td className={tdClass} colSpan={2}>
              <div className='flex justify-start gap-3 flex-col'>
                <h2 className='w-[65%]'>Numer pokoju:</h2>
                <Input type="number" onChange={handleChange} name="nr_pokoju" className="h-full" rows={1} />
              </div>
            </td>
            <td className={tdClass} colSpan={2}>
              <h2>Samochód marki:</h2>
              <div className='w-full my-2 p-1'>
                <Input className="h-full" onChange={handleChange} name="samochod_marki" rows={2} />
              </div>
              <h2>Nr rejestracyjny:</h2>
              <div className='w-full my-2 p-1'>
                <Input className="h-full" onChange={handleChange} name="nr_rejestracyjny" rows={2} />
              </div>
            </td>
        </tr>
        <tr>
            <th className={thClass} colSpan={2}>Podpis pracownika parkingu</th>
            <td className={tdClass + "h-full"} colSpan={2}><Input type="text" onChange={handleChange} name="podpis_pracownika" required/></td>
        </tr>
    </table>
    <Button type="submit">Submit</Button>
    </form>
    </div>
    </>
  )
}

export default KwitParkingowy