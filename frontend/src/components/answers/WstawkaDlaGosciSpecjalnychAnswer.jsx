import React from 'react'
import { Input } from '../ui/input'
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
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'



const WstawkaDlaGosciSpecjalnychAnswer = () => {
    const { userid } = useParams();
    const navigate = useNavigate()
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
    const thClass = "p-2 border-solid border-2 border-black w-3/12"
    const tdClass = " p-2 border-solid border-2 border-black text-left"
    const [terminPobytuOd, setTerminPobytuOd] = useState()
    const [terminPobytuDo, setTerminPobytuDo] = useState()
    const [terminWykonaniaUslugi, setTerminWykonaniaUslugi] = useState()
    const [dataZleceniaUslugi, setDataZleceniaUslugi] = useState()
    const { toast } = useToast();
    const [zyczeniaDodatkowe, setZyczeniaDodatkowe] = useState('');
    const isMounted = useRef(true);

    const [data, setData] = useState({
        termin_pobytu_od: "",
        termin_pobytu_do: "",
        liczba_osob: "",
        nr_pokoju: "",
        termin_wykonania_uslugi: "",
        zyczenia_dodatkowe: "",
        kosz_prezentowy: "",
        cena_za_wybrana_wstawke: "",
        dodatkowe_oplaty: "",
        razem_do_zaplaty: "",
        data_zlecenia_uslugi: "",
        podpis_pracownika_recepcji: "",
        podpis_dyrektora_hotelu: "",
    });

    useEffect(() => {
        isMounted.current = true;

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/teacher/odpowiedzi/wstawkaDlaGosciSpecjalnych/${userid}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const result = await response.json();
                if (isMounted.current && result && result[0]) {
                    const { termin_pobytu_od, termin_pobytu_do, termin_wykonania_uslugi, data_zlecenia_uslugi, ...rest } = result[0];
                    setData(rest);
                    setTerminPobytuOd(termin_pobytu_od); 
                    setTerminPobytuDo(termin_pobytu_do); 
                    setTerminWykonaniaUslugi(termin_wykonania_uslugi); 
                    setDataZleceniaUslugi(data_zlecenia_uslugi); 
                    console.log(terminPobytuOd, terminPobytuDo, terminWykonaniaUslugi, dataZleceniaUslugi)
                    
                }
            } catch (error) {
                if (isMounted.current) {
                    console.error('Error fetching data:', error);
                    toast({
                        title: 'Błąd',
                        description: 'Nie udało się pobrać odpowiedzi studenta.',
                    });
                }
            }
        };

        fetchData();

        return () => {
            isMounted.current = false; // Mark as unmounted on cleanup
        };
    }, [userid, toast]);
    const handleSubmit = async (e) => {
        e.preventDefault();
    };

  return (
    <>
    <div className='my-[3%] mx-[10%]'>
    <Button onClick={() => navigate(`/teacher/test/answertabs/${userid}`)}>Powrót</Button>
    <form onSubmit={handleSubmit} method="post">
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
                                    <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal",!terminPobytuOd && "text-muted-foreground")}>
                                    <CalendarIcon />
                                    {terminPobytuOd ? terminPobytuOd : <span>Wybierz datę</span>}
                                    </Button>
                                </PopoverTrigger>
                            </Popover>
                        </div>
                        <div className='flex justify-start items-center gap-3'>
                            <h2>Do:</h2>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal",!terminPobytuDo && "text-muted-foreground")}>
                                    <CalendarIcon />
                                    {terminPobytuDo ? terminPobytuDo : <span>Wybierz datę</span>}
                                    </Button>
                                </PopoverTrigger>
                            </Popover>
                        </div>
                    </div>
                </td>
                <td className={tdClass} colSpan={1}>
                    <h2>Liczba osób:</h2>
                    <div className='w-full my-2 p-1'>
                    <Input type="number" className="h-full" disabled={true} value={data.liczba_osob} name="liczba_osob" rows={2} />
                    </div>
                </td>
                <td className={tdClass} colSpan={1}>
                    <h2>Numer pokoju:</h2>
                    <div className='w-full my-2 p-1'>
                    <Input type="number" className="h-full" disabled={true} value={data.nr_pokoju} name="nr_pokoju" rows={2} />
                    </div>
                </td>
            </tr>
            <tr>
                <th className={thClass} colSpan={2}>Termin wykonania usługi</th>
                <td className={tdClass} colSpan={4}>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal",!terminWykonaniaUslugi && "text-muted-foreground")}>
                                <CalendarIcon />
                                {terminWykonaniaUslugi ? terminWykonaniaUslugi : <span>Wybierz datę</span>}
                                </Button>
                            </PopoverTrigger>
                        </Popover>
                </td>
            </tr>
            <tr>
                <th className={thClass} colSpan={6}>Dostarczone produkty i usługi</th>
            </tr>
            <tr> 
                <td className={tdClass} colSpan={6}>
                    <RadioGroup value={zyczeniaDodatkowe || ''}>
                        {dostarczoneProduktyIUsługi.map((el) => (
                            <div className="flex items-center space-x-2 disabled-radio" key={el.id}>
                                <RadioGroupItem value={el.item} id={el.id} disabled />
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
                        <Textarea className="h-full" disabled={true} value={data.zyczenia_dodatkowe} name="zyczenia_dodatkowe" rows={2} />
                    </div>
                </td>
                <td className={tdClass} colSpan={3}>
                    <h2>Kosz prezentowy:</h2>
                    <div className=' my-2'>
                        <Textarea className="h-full" rows={2} disabled={true} value={data.kosz_prezentowy} name="kosz_prezentowy"/>
                    </div>
                </td>
            </tr>
            <tr>
                <td className={tdClass} colSpan={3}>
                    <h2>Cena za wybraną wstawkę:</h2>
                    <div className='w-full my-2 p-1'>
                    <Input type="number" className="h-full" disabled={true} value={data.cena_za_wybrana_wstawke} name="cena_za_wybrana_wstawke" rows={2} />
                    </div>
                </td> 
                <td className={tdClass} colSpan={3}>
                    <h2>Dodatkowe opłaty:</h2>
                    <div className='w-full my-2 p-1'>
                    <Input type="number" className="h-full" disabled={true} value={data.dodatkowe_oplaty} name="dodatkowe_oplaty" rows={2} />
                    </div>
                </td> 
            </tr>
            <tr>
                <td className={tdClass} colSpan={6}>
                    <div className='flex items-center gap-2'>
                        <h2>Razem do zapłaty za realizację usługi:</h2>
                        <div className='w-1/4 my-2 p-1'>
                            <Input type="number" className="h-full" disabled={true} value={data.razem_do_zaplaty} name="razem_do_zaplaty" rows={2} />
                        </div>
                    </div>
                </td> 
            </tr>
            <tr>
            <td className={tdClass} colSpan={2}>
                    <h2>Data zlecenia usługi:</h2>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal",!dataZleceniaUslugi && "text-muted-foreground")}>
                                <CalendarIcon />
                                {dataZleceniaUslugi ? dataZleceniaUslugi : <span>Wybierz datę</span>}
                                </Button>
                            </PopoverTrigger>
                        </Popover>
                </td>
                <td className={tdClass} colSpan={3}>
                    <h2>Podpis pracownika recepcji:</h2>
                    <div className='w-full my-2 p-1'>
                        <Input type="text" className="h-full" disabled={true} value={data.podpis_pracownika_recepcji} name="podpis_pracownika_recepcji" rows={2} />
                    </div>
                </td>
                <td className={tdClass} colSpan={1}>
                    <h2>Podpis dyrektora hotelu:</h2>
                    <div className='w-full my-2 p-1'>
                        <Input type="text" className="h-full" value={data.podpis_dyrektora_hotelu} disabled={true} name="podpis_dyrektora_hotelu" rows={2} />
                    </div>
                </td>
            </tr>
        </table>
    </form>
    </div>
    </>
  )
}

export default WstawkaDlaGosciSpecjalnychAnswer