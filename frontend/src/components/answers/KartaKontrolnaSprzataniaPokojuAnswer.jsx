import React, { useState, useEffect } from 'react'
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
import { useParams, useNavigate } from 'react-router-dom';

const KartaKontrolnaSprzataniaPokojuAnswer = () => {
    const { userid } = useParams();
    const navigate = useNavigate()
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
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/teacher/odpowiedzi/kartaKontrolnaSprzataniaPokoju/${userid}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const result = await response.json();
                if (result && result[0]) {
                    const { data_kontroli, ...rest } = result[0];
                    setData(rest);
                    setDate(data_kontroli) 
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast({
                    title: 'Błąd',
                    description: 'Nie udało się pobrać odpowiedzi studenta.',
                });
            }
        };

        fetchData();
    }, [userid, toast]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };
  return (
    <>
    <div className='my-[3%] mx-[10%]'>
    <Button onClick={() => navigate(`/teacher/test/answertabs/${userid}`)}>Powrót</Button>
    <form action="/submit_form" method="post" onSubmit={handleSubmit}>
    <table className='w-full border-collapse'>
        <tr>
            <th className={`${thClass} text-center`} colSpan="2">
                <div>
                    <p>KARTA KONTROLNA SPRZĄTANIA POKOJU</p>
                    <br />
                    <div className='flex justify-center items-center gap-2'>
                        <p>POKÓJ NUMER:</p>
                        <Input className="box-border w-1/12" type="number" value={data.nr_pokoju} disabled={true} name="nr_pokoju" placeholder="1" required />
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
                        {date ? date : <span>Wybierz datę</span>}
                        </Button>
                    </PopoverTrigger>
                    </Popover>
            </td>
        </tr>
        <tr>
            <th className={thClass}>ZAZNACZ RODZAJ SPRZĄTANIA WYKONANEGO PRZEZ POKOJOWĄ</th>
            <td className={tdClass}>
                <RadioGroup defaultValue="comfortable" value={data.rodzaj_sprzatania} disabled={true} name="rodzaj_sprzatania">
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
            <td className={tdClass + "h-full"}><Textarea className="h-full" rows={5} value={data.dodatkowe_zlecenie} disabled={true} name="dodatkowe_zlecenie"/></td>
        </tr>
        <tr>
            <th className={thClass}>POPRAWNOŚĆ WYKONANIA</th>
            <td className={tdClass}>
                <RadioGroup defaultValue="comfortable" value={data.poprawnosc_wykonania} disabled={true} name="poprawnosc_wykonania">
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
            <td className={tdClass + "h-full"}><Input type="text" required value={data.podpis_osoby_realizujacej_kontrole} disabled={true} name="podpis_osoby_realizujacej_kontrole" /></td>
        </tr>
    </table>
    </form>
    </div>
    </>
  )
}

export default KartaKontrolnaSprzataniaPokojuAnswer