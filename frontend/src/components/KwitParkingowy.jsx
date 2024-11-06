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

const KwitParkingowy = () => {
    const thClass = "p-2 border-solid border-2 border-black w-3/12"
    const tdClass = " p-2 border-solid border-2 border-black text-left"
    const [date, setDate] = useState()
  return (
    <>
    <div className=' my-[3%]'>
    <form action="/submit_form" method="post">
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
                <Input className="h-full" rows={2} />
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
                        <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal",!date && "text-muted-foreground")}>
                        <CalendarIcon />
                        {date ? format(date, "PPP", { locale: pl }) : <span>Wybierz datę</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate}  locale={pl} initialFocus/>
                    </PopoverContent>
                </Popover>
              </div>
            </td>
            <td className={tdClass} colSpan={2}>
              <div className='flex justify-start items-center gap-3'>
              <h2>Od:</h2>
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
              </div>
            </td>
        </tr>
        <tr >
            <td className={tdClass} colSpan={2}>
              <div className='flex justify-start gap-3 flex-col'>
                <h2 className='w-[65%]'>Numer pokoju:</h2>
                <Input type="number" className="h-full" rows={1} />
              </div>
            </td>
            <td className={tdClass} colSpan={2}>
              <h2>Samochód marki:</h2>
              <div className='w-full my-2 p-1'>
                <Input className="h-full" rows={2} />
              </div>
              <h2>Nr rejestracyjny:</h2>
              <div className='w-full my-2 p-1'>
                <Input className="h-full" rows={2} />
              </div>
            </td>
        </tr>
        <tr>
            <th className={thClass} colSpan={2}>Podpis pracownika parkingu</th>
            <td className={tdClass + "h-full"} colSpan={2}><Input type="text" required/></td>
        </tr>
    </table>
    </form>
    </div>
    </>
  )
}

export default KwitParkingowy