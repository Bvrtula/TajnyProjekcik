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

const DrukUslugPralniczych = () => {
    const thClass = "p-2 border-solid border-2 border-black w-3/12"
    const tdClass = " p-2 border-solid border-2 border-black text-left"
    const [date, setDate] = useState()

    const data = [
        {
            id:1,
            asortyment: "Koszula damska/męska",
            cena: 23,
        }, {
            id:2,
            asortyment:"Spódnica/ lub spodnie damskie",
            cena: 28
        }, {
            id: 3,
            asortyment: "Garnitur damski",
            cena: 45
        }, {
            id: 4,
            asortyment: "Garnitur męski",
            cena:48
        }, {
            id: 5,
            asortyment: "Usługa ekspresowa - wykonanie usługi do 5 godzin: dodatkowo płatna",
            cena: 35
        }
    ]

  return (
    <>
    <div className=' my-[3%]'>
    <form action="/submit_form" method="post">
    <table className='w-full border-collapse'>
        <thead>
            <tr>
            <th className={`${thClass} text-center`} colSpan={6}>
                <p>DRUK USŁUG PRALNICZYCH</p>
            </th>
            </tr>
            <tr>
            <td className={tdClass} colSpan={3}>
                <h2>Nazwisko i imię gościa:</h2>
                <div className='w-full my-2 p-1'>
                <Input className="h-full" rows={2} />
                </div>
            </td>
            <td className={tdClass} colSpan={3}>
                <h2>Nr pokoju:</h2>
                <div className='w-full my-2 p-1'>
                <Input type="number" className="h-full" rows={2} />
                </div>
            </td>
            </tr>
            <tr>
            <td className={tdClass} colSpan={3}>
                <h2>Data realizacji usługi:</h2>
            </td>
            <td className={tdClass} colSpan={3}>
                <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal",!date && "text-muted-foreground")}>
                    <CalendarIcon />
                    {date ? format(date, "PPP", { locale: pl }) : <span>Wybierz datę</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} locale={pl} initialFocus/>
                </PopoverContent>
                </Popover>
            </td>
            </tr>
            <tr>
            <th className={tdClass} colSpan={2}><h2>Asortyment:</h2></th>
            <th className={tdClass} colSpan={1}><h2>Ilość:</h2></th>
            <th className={tdClass} colSpan={1}><h2>Cena jednostkowa:</h2></th>
            <th className={tdClass} colSpan={1}><h2>Wartość wykonanej usługi:</h2></th>
            </tr>
        </thead>
        
        <tbody>
            {data.map((el) => (
            <tr key={el.id}>
                <td className={tdClass} colSpan={2}>
                <h2>{el.asortyment}</h2>
                </td>
                <td className={tdClass} colSpan={1}>
                <div className='w-full my-2 p-1'>
                    <Input type="number" className="h-full" rows={2} />
                </div>
                </td>
                <td className={tdClass} colSpan={1}>
                <h2>{el.cena}</h2>
                </td>
                <td className={tdClass} colSpan={1}>
                <div className='w-full my-2 p-1'>
                    <Input type="number" className="h-full" rows={2} />
                </div>
                </td>
            </tr>
            ))}
            
            <tr>
                <th className={thClass} colSpan={3}><h2>Do zapłaty</h2></th>
                <td className={tdClass} colSpan={3}>
                    <div className='w-full my-2 p-1'>
                    <Input type="number" className="h-full" rows={2} />
                    </div>
                </td>
            </tr>
            <tr>
                <th className={thClass} colSpan={3}>
                    <h2>Podpis pracownika realizującego zlecenie:</h2>
                </th>
                <td className={tdClass} colSpan={3}>
                    <div className='w-full my-2 p-1'>
                    <Input className="h-full" rows={2} />
                    </div>
                </td>
            </tr>
        </tbody>
        </table>
    </form>
    </div>
    </>
  )
}

export default DrukUslugPralniczych