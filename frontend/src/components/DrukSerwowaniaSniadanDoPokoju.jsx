import React, { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Textarea } from '@/components/ui/textarea'


const DrukSerwowaniaSniadanDoPokoju = () => {
    const thClass = "p-2 border-solid border-2 border-black text-center"
    const tdClass = "p-2 border-solid border-2 border-black text-left w-3/12"
    const [date, setDate] = useState()
  return (
    <>
    <div className='my-[3%]'>
    <form action="/submit_form" method="post">
    <table className='w-full border-collapse'>
        <tr>
            <th className={`${thClass} text-center`} colSpan="6">DRUK SERWOWANIA ŚNIADAŃ DO POKOJU</th>
        </tr>   
        <tr >
            <td className={tdClass} colSpan={2}>
              <h2>Termin wykonania usługi:</h2>
              <div className='w-full my-2'>
                    <Popover >
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
              <h2>Liczba osób:</h2>
              <Input className="box-border my-2" type="number" placeholder="1" required />
            </td>
            <td className={tdClass} colSpan={2}>
              <h2>Numer pokoju:</h2>
              <div>
                <Input className="box-border my-2" type="number" placeholder="1" required />
              </div>
            </td>
        </tr>
        <tr>
          <th className={thClass} colSpan={2}><h2>Przedział czasowy wykonania usługi</h2></th>
          <td className={tdClass} colSpan={4}>
            <div className='flex justify-center'>
              <div className='flex items-center gap-1'>
                <h2>Od:</h2>
                <div className='flex items-center gap-1'>
                  <Input className="box-border my-2 w-1/4" type="number" placeholder="08" required />:<Input className="box-border my-2 w-1/4" type="number" placeholder="30" required />
                </div>
              </div>
              <div className='flex items-center gap-1'>
                <h2>Do:</h2>
                <div className='flex items-center gap-1'>
                  <Input className="box-border my-2 w-1/4" type="number" placeholder="09" required />:<Input className="box-border my-2 w-1/4" type="number" placeholder="00" required />
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr >
            <td className={tdClass} colSpan={6}>
              <h2>Dostarczone produkty:</h2>
              <div className='w-full my-2'>
                <Textarea className="h-full" rows={2} />
              </div>
            </td>
        </tr>
        <tr>
            <th className={thClass} colSpan={1}>Asortyment</th>
            <th className={thClass} colSpan={1}>Ilość</th>
            <th className={thClass} colSpan={1}>Asortyment</th>
            <th className={thClass} colSpan={1}>Ilość</th>
            <th className={thClass} colSpan={1}>Asortyment</th>
            <th className={thClass} colSpan={1}>Ilość</th>
        </tr>
        <tr>
            <th className={thClass} colSpan={1}>Kawa czarna</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Pieczywo mieszane</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Dżem truskawkowy</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" placeholder="0" /></td>
        </tr>
        <tr>
            <th className={thClass} colSpan={1}>Kawa z mlekiem</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Tosty</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Dżem wiśniowy</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" placeholder="0" /></td>
        </tr>
        <tr>
            <th className={thClass} colSpan={1}>Herbata czarna</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Rogaliki</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Miód</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" placeholder="0" /></td>
        </tr>
        <tr>
            <th className={thClass} colSpan={1}>Herbata zielona</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Parówki</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Owoce świeże (truskawki)</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" placeholder="0" /></td>
        </tr>
        <tr>
            <th className={thClass} colSpan={1}>Sok pomarańczowy</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Jajecznica</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Owoce mrożone (truskawki, jagody i mango)</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" placeholder="0" /></td>
        </tr>
        <tr>
            <th className={thClass} colSpan={1}>Sok jabłkowy</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Jajka sadzone</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Jogurt naturalny</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" placeholder="0" /></td>
        </tr>
       
        <tr>
            <th className={thClass} colSpan={2}>PODPIS OSOBY REALIZĄCEJ KONTROLĘ</th>
            <td className={tdClass + "h-full"} colSpan={4}><Input type="text" required/></td>
        </tr>
    </table>
    </form>
    </div>
    </>
  )
}

export default DrukSerwowaniaSniadanDoPokoju