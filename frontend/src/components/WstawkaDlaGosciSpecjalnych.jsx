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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from '@/components/ui/textarea'

const dostarczoneProduktyIUsługi = [
    {
    id:1,
    item: "bukiet kwiatów"
    }, 
    {
    id:2,
    item: "czekoladki"
    },
    {
    id:3,
    item: "butelka szampana"
    }, 
    {
    id:4,
    item: "list powitalny"
    },
    {
    id:5,
    item: "butelka wina białego"
    }, 
    {
    id:6,
    item: "butelka wina czerwonego"
    },
]

const WstawkaDlaGosciSpecjalnych = () => {
    const thClass = "p-2 border-solid border-2 border-black w-3/12"
    const tdClass = " p-2 border-solid border-2 border-black text-left"
    const [date, setDate] = useState()
  return (
    <>
    <div className=' my-[3%]'>
    <form action="/submit_form" method="post">
    <table className='w-full border-collapse'>
            <tr>
                <th className={`${thClass} text-center`} colSpan={6}>
                    <p>WSTAWKA DLA GOŚCI SPECJALNYCH</p>
                </th>
            </tr>
            <tr>
                <td className={tdClass} colSpan={4}>
                    <h2>Termin pobytu:</h2>
                    <div className='flex flex-col gap-3 my-2'>
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
                        <div className='flex justify-start items-center gap-3'>
                            <h2>Do:</h2>
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
                    </div>
                </td>
                <td className={tdClass} colSpan={1}>
                    <h2>Liczba osób:</h2>
                    <div className='w-full my-2 p-1'>
                    <Input type="number" className="h-full" rows={2} />
                    </div>
                </td>
                <td className={tdClass} colSpan={1}>
                    <h2>Numer pokoju:</h2>
                    <div className='w-full my-2 p-1'>
                    <Input type="number" className="h-full" rows={2} />
                    </div>
                </td>
            </tr>
            <tr>
                <th className={thClass} colSpan={2}>Termin wykonania usługi</th>
                <td className={tdClass} colSpan={4}>
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
                <th className={thClass} colSpan={6}>Dostarczone produkty i usługi</th>
            </tr>
            <tr>
                <td className={tdClass} colSpan={6}>
                    <RadioGroup>
                        {dostarczoneProduktyIUsługi.map((el) => (
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={el.item} id={el.id} />
                                <Label htmlFor={el.id}>{el.item}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </td>
            </tr>
            <tr>
                <td className={tdClass} colSpan={3}>
                    <h2>Życzenia dodatkowe:</h2>
                    <div className=' my-2'>
                        <Textarea className="h-full" rows={2} />
                    </div>
                </td>
                <td className={tdClass} colSpan={3}>
                    <h2>Kosz prezentowy:</h2>
                    <div className=' my-2'>
                        <Textarea className="h-full" rows={2} />
                    </div>
                </td>
            </tr>
            <tr>
                <td className={tdClass} colSpan={3}>
                    <h2>Cena za wybraną wstawkę:</h2>
                    <div className='w-full my-2 p-1'>
                    <Input type="number" className="h-full" rows={2} />
                    </div>
                </td> 
                <td className={tdClass} colSpan={3}>
                    <h2>Dodatkowe opłaty:</h2>
                    <div className='w-full my-2 p-1'>
                    <Input type="number" className="h-full" rows={2} />
                    </div>
                </td> 
            </tr>
            <tr>
                <td className={tdClass} colSpan={6}>
                    <h2>Razem do zapłaty za realizację usługi:</h2>
                    <div className='w-full my-2 p-1'>
                    
                    </div>
                </td> 
            </tr>
            <tr>
            <td className={tdClass} colSpan={2}>
                    <h2>Data zlecenia usługi:</h2>
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
                <td className={tdClass} colSpan={3}>
                    <h2>Podpis pracownika recepcji:</h2>
                    <div className='w-full my-2 p-1'>
                        <Input type="text" className="h-full" rows={2} />
                    </div>
                </td>
                <td className={tdClass} colSpan={1}>
                    <h2>Podpis dyrektora hotelu:</h2>
                    <div className='w-full my-2 p-1'>
                        <Input type="text" className="h-full" rows={2} />
                    </div>
                </td>
            </tr>
        </table>
    </form>
    </div>
    </>
  )
}

export default WstawkaDlaGosciSpecjalnych