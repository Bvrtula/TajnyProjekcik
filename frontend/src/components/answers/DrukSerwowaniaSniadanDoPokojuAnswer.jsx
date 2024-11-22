import React, { useState, useEffect } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { useParams, useNavigate } from 'react-router-dom';

const DrukSerwowaniaSniadanDoPokojuAnswer = () => {
    const { userid } = useParams();
    const navigate = useNavigate()
    const thClass = "p-2 border-solid border-2 border-black text-center"
    const tdClass = "p-2 border-solid border-2 border-black text-left w-3/12"
    const [date, setDate] = useState()
    const { toast } = useToast()
    const [startHour, setStartHour] = useState('');
    const [startMinute, setStartMinute] = useState('');
    const [endHour, setEndHour] = useState('');
    const [endMinute, setEndMinute] = useState('');

    const [data, setData] = useState({
        termin: "",
        liczba_osob: "",
        nr_pokoju: "",
        przedzial_czasowy_od: "",
        przedzial_czasowy_do: "",
        dostarczone_produkty: "",
        kawa_czarna_ilosc: "",
        kawa_z_mlekiem_ilosc: "",
        herbata_czarna_ilosc: "",
        herbata_zielona_ilosc: "",
        sok_pomaranczowy_ilosc: "",
        sok_jablkowy_ilosc: "",
        pieczywo_mieszane_ilosc: "",
        tosty_ilosc: "",
        rogaliki_ilosc: "",
        parowki_ilosc: "",
        jajecznica_ilosc: "",
        jajka_sadzone_ilosc: "",
        dzem_truskawkowy_ilosc: "",
        dzem_wisniowy_ilosc: "",
        miod_ilosc: "",
        owoce_swieze_ilosc: "",
        owoce_mrozone_ilosc: "",
        jogurt_naturalny_ilosc: "",
        podpis_osoby: "",
      })

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/teacher/odpowiedzi/drukSerwowaniaSniadanDoPokoju/${userid}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const result = await response.json();
                if (result && result[0]) {
                    const { termin, ...rest } = result[0];
                    setData(rest);
                    setDate(termin)
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
    <form method="post" onSubmit={handleSubmit}>
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
                        {date ? date : <span>Wybierz datę</span>}
                        </Button>
                    </PopoverTrigger>
                    </Popover>
              </div>
            </td>
            <td className={tdClass} colSpan={2}>
              <h2>Liczba osób:</h2>
              <Input className="box-border my-2" type="number" value={data.liczba_osob} disabled={true} name="liczba_osob" placeholder="1" required />
            </td>
            <td className={tdClass} colSpan={2}>
              <h2>Numer pokoju:</h2>
              <div>
                <Input className="box-border my-2" type="number" value={data.nr_pokoju} disabled={true} name="nr_pokoju" placeholder="1" required />
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
                  <Input className="box-border my-2"  value={data.przedzial_czasowy_od} disabled={true} />
                </div>
              </div>
              <div className='flex items-center gap-1'>
                <h2>Do:</h2>
                <div className='flex items-center gap-1'>
                  <Input className="box-border my-2"  value={data.przedzial_czasowy_do} disabled={true} />
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr >
            <td className={tdClass} colSpan={6}>
              <h2>Dostarczone produkty:</h2>
              <div className='w-full my-2'>
                <Textarea className="h-full" rows={2} value={data.dostarczone_produkty} disabled={true} name="dostarczone_produkty"/>
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
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" value={data.kawa_czarna_ilosc} disabled={true} name="kawa_czarna_ilosc" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Pieczywo mieszane</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" value={data.kawa_z_mlekiem_ilosc} disabled={true} name="kawa_z_mlekiem_ilosc" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Dżem truskawkowy</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" value={data.dzem_truskawkowy_ilosc} disabled={true} name="dzem_truskawkowy_ilosc" placeholder="0" /></td>
        </tr>
        <tr>
            <th className={thClass} colSpan={1}>Kawa z mlekiem</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" value={data.kawa_z_mlekiem_ilosc} disabled={true} name="kawa_z_mlekiem_ilosc" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Tosty</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" value={data.tosty_ilosc} disabled={true} name="tosty_ilosc" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Dżem wiśniowy</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" value={data.dzem_wisniowy_ilosc} disabled={true} name="dzem_wisniowy_ilosc" placeholder="0" /></td>
        </tr>
        <tr>
            <th className={thClass} colSpan={1}>Herbata czarna</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" value={data.herbata_czarna_ilosc} disabled={true} name="herbata_czarna_ilosc" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Rogaliki</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" value={data.rogaliki_ilosc} disabled={true} name="rogaliki_ilosc" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Miód</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" value={data.miod_ilosc} disabled={true} name="miod_ilosc" placeholder="0" /></td>
        </tr>
        <tr>
            <th className={thClass} colSpan={1}>Herbata zielona</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" value={data.herbata_zielona_ilosc} disabled={true} name="herbata_zielona_ilosc" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Parówki</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" value={data.parowki_ilosc} disabled={true} name="parowki_ilosc" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Owoce świeże (truskawki)</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" value={data.owoce_swieze_ilosc} disabled={true} name="owoce_swieze_ilosc" placeholder="0" /></td>
        </tr>
        <tr>
            <th className={thClass} colSpan={1}>Sok pomarańczowy</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" value={data.sok_pomaranczowy_ilosc} disabled={true} name="sok_pomaranczowy_ilosc" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Jajecznica</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2" type="number" value={data.jajecznica_ilosc} disabled={true} name="jajecznica_ilosc" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Owoce mrożone (truskawki, jagody i mango)</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" value={data.owoce_mrozone_ilosc} disabled={true} name="owoce_mrozone_ilosc" placeholder="0" /></td>
        </tr>
        <tr>
            <th className={thClass} colSpan={1}>Sok jabłkowy</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" value={data.sok_jablkowy_ilosc} disabled={true} name="sok_jablkowy_ilosc" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Jajka sadzone</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" value={data.jajka_sadzone_ilosc} disabled={true} name="jajka_sadzone_ilosc" placeholder="0" /></td>
            <th className={thClass} colSpan={1}>Jogurt naturalny</th>
            <td className={thClass} colSpan={1}><Input className="box-border my-2 " type="number" value={data.jogurt_naturalny_ilosc} disabled={true} name="jogurt_naturalny_ilosc" placeholder="0" /></td>
        </tr>
       
        <tr>
            <th className={thClass} colSpan={2}>PODPIS OSOBY REALIZĄCEJ KONTROLĘ</th>
            <td className={tdClass + "h-full"} colSpan={4}><Input type="text" value={data.podpis_osoby} disabled={true} name="podpis_osoby" required/></td>
        </tr>
    </table>
    </form>
    </div>
    </>
  )
}

export default DrukSerwowaniaSniadanDoPokojuAnswer