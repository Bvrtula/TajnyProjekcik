import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Calendar as CalendarIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from '@/components/ui/textarea'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale' 
import { useToast } from '@/hooks/use-toast'

const KartaKontrolnaSprzataniaPokoju = () => {
    const thClass = "p-2 border-solid border-2 border-black text-left w-3/12"
    const tdClass = " p-2 border-solid border-2 border-black text-left"
    const [date, setDate] = useState()
    const { toast } = useToast()
    const [data, setData] = useState({
        nr_pokoju: "",
        data_kontroli: "",
        rodzaj_sprzatania: "",
        dodatkowe_zlecenie: "",
        poprawnosc_wykonania: "",
        podpis_osoby_realizujacej_kontrole: "",
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
        data["data_kontroli"] = date.toLocaleDateString('pl-PL', options)
  
        console.log(data)
        fetch("http://localhost:4000/student/egzamin/kartaKontrolnaSprzataniaPokoju", {
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
    <form action="/submit_form" method="post" onSubmit={handleSubmit}>
    <table className='w-full border-collapse'>
        <tr>
            <th className={`${thClass} text-center`} colSpan="2">
                <div>
                    <p>KARTA KONTROLNA SPRZĄTANIA POKOJU</p>
                    <br />
                    <div className='flex justify-center items-center gap-2'>
                        <p>POKÓJ NUMER:</p>
                        <Input className="box-border w-1/12" type="number" onChange={handleChange} name="nr_pokoju" placeholder="1" required />
                    </div>
                </div>
            </th>
        </tr>   
        <tr>
            <th className={thClass}>DATA KONTROLI POKOJU</th>
            <td className={tdClass}>
                    <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal",!date && "text-muted-foreground")}>
                        <CalendarIcon />
                        {date ? format(date, "PPP", { locale: pl }) : <span>Wybierz datę</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate}  locale={pl} initialFocus/>
                    </PopoverContent>
                    </Popover>
            </td>
        </tr>
        <tr>
            <th className={thClass}>ZAZNACZ RODZAJ SPRZĄTANIA WYKONANEGO PRZEZ POKOJOWĄ</th>
            <td className={tdClass}>
                <RadioGroup defaultValue="comfortable" onChange={handleChange} name="rodzaj_sprzatania">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="W TRAKCIE POBYTU GOŚCI" id="r1" />
                        <Label htmlFor="r1">W TRAKCIE POBYTU GOŚCI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="PO WYJEŹDZIE GOŚCI   " id="r2" />
                        <Label htmlFor="r2">PO WYJEŹDZIE GOŚCI</Label>
                    </div>
                </RadioGroup>
            </td>
        </tr>
        <tr>
            <th className={thClass}>DODATKOWE ZLECENIE DLA POKOJOWEJ DO WYKONANIA W DNIU KONTROLI (W RAZIE BRAKU WPISAĆ BRAK)</th>
            <td className={tdClass + "h-full"}><Textarea className="h-full" rows={5} onChange={handleChange} name="dodatkowe_zlecenie"/></td>
        </tr>
        <tr>
            <th className={thClass}>POPRAWNOŚĆ WYKONANIA</th>
            <td className={tdClass}>
                <RadioGroup defaultValue="comfortable" onChange={handleChange} name="poprawnosc_wykonania">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="TAK" id="r1" />
                        <Label htmlFor="r1">TAK</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="NIE" id="r2" />
                        <Label htmlFor="r2">NIE</Label>
                    </div>
                </RadioGroup>
            </td>
        </tr>
        <tr>
            <th className={thClass}>PODPIS OSOBY REALIZĄCEJ KONTROLĘ</th>
            <td className={tdClass + "h-full"}><Input type="text" required onChange={handleChange} name="podpis_osoby_realizujacej_kontrole" /></td>
        </tr>
    </table>
    <Button type="submit">Submit</Button>
    </form>
    </div>
    </>
  )
}

export default KartaKontrolnaSprzataniaPokoju