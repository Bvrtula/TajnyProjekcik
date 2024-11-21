import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast'
import { useParams, useNavigate } from 'react-router-dom';

const DrukUslugPralniczychAnswer = () => {
  const { userid } = useParams();
    const navigate = useNavigate()
  const thClass = 'p-2 border-solid border-2 border-black w-3/12';
  const tdClass = 'p-2 border-solid border-2 border-black text-left';
  const { toast } = useToast()
  const [date, setDate] = useState();
  
  const [data, setData] = useState({
    nazwisko_i_imie_goscia: '',
    nr_pokoju: '',
    data_realizacji_uslugi: '',
    ilosc_koszula_damska_meska: '',
    ilosc_spódnica_lub_spodnie_damski: '',
    ilosc_garnitur_damski: '',
    ilosc_garnitur_meski: '',
    ilosc_usluga_ekspresowa: '',
    do_zaplaty: '',
    podpis_pracownika_realizujacego_zlecenie: '',
  });

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:4000/teacher/odpowiedzi/drukUslugPralniczych/${userid}`, {
                method: 'GET',
                credentials: 'include',
            });
            const result = await response.json();
            if (result && result[0]) {
                const { data_realizacji_uslugi, ...rest } = result[0];
                setData(rest);
                setDate(data_realizacji_uslugi) 
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
    <div className="my-[3%] mx-[10%]">
    <Button onClick={() => navigate(`/teacher/test/answertabs/${userid}`)}>Powrót</Button>
      <form onSubmit={handleSubmit} method="post">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className={`${thClass} text-center`} colSpan={6}>
                <p>DRUK USŁUG PRALNICZYCH</p>
              </th>
            </tr>
            <tr>
              <td className={tdClass} colSpan={3}>
                <h2>Nazwisko i imię gościa:</h2>
                <div className="w-full my-2 p-1">
                  <Input
                    className="h-full"
                    rows={2}
                    name="nazwisko_i_imie_goscia"
                    value={data.nazwisko_i_imie_goscia} disabled={true}
                  />
                </div>
              </td>
              <td className={tdClass} colSpan={3}>
                <h2>Nr pokoju:</h2>
                <div className="w-full my-2 p-1">
                  <Input
                    type="number"
                    className="h-full"
                    rows={2}
                    name="nr_pokoju"
                    value={data.nr_pokoju} disabled={true}
                  />
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
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon />
                      {date
                        ? date
                        : <span>Wybierz datę</span>}
                    </Button>
                  </PopoverTrigger>
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
            <tr>
              <td className={tdClass} colSpan={2}><h2>Koszula damska/męska</h2></td>
              <td className={tdClass} colSpan={1}>
                <Input
                  type="number"
                  name="ilosc_koszula_damska_meska"
                  className="h-full"
                  value={data.ilosc_koszula_damska_meska} disabled={true}
                />
              </td>
              <td className={tdClass} colSpan={1}><h2>23</h2></td>
              <td className={tdClass} colSpan={1}>
                <Input
                  type="number"
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className={tdClass} colSpan={2}><h2>Spódnica/ lub spodnie damskie</h2></td>
              <td className={tdClass} colSpan={1}>
                <Input
                  type="number"
                  name="ilosc_spódnica_lub_spodnie_damski"
                  className="h-full"
                  value={data.ilosc_spódnica_lub_spodnie_damski} disabled={true}
                />
              </td>
              <td className={tdClass} colSpan={1}><h2>28</h2></td>
              <td className={tdClass} colSpan={1}>
                <Input
                  type="number"
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className={tdClass} colSpan={2}><h2>Garnitur damski</h2></td>
              <td className={tdClass} colSpan={1}>
                <Input
                  type="number"
                  name="ilosc_garnitur_damski"
                  className="h-full"
                  value={data.ilosc_garnitur_damski} disabled={true}
                />
              </td>
              <td className={tdClass} colSpan={1}><h2>45</h2></td>
              <td className={tdClass} colSpan={1}>
                <Input
                  type="number"
                  className="h-full"
  
                />
              </td>
            </tr>
            <tr>
              <td className={tdClass} colSpan={2}><h2>Garnitur męski</h2></td>
              <td className={tdClass} colSpan={1}>
                <Input
                  type="number"
                  name="ilosc_garnitur_meski"
                  className="h-full"
                  value={data.ilosc_garnitur_meski} disabled={true}
                />
              </td>
              <td className={tdClass} colSpan={1}><h2>48</h2></td>
              <td className={tdClass} colSpan={1}>
                <Input
                  type="number"
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className={tdClass} colSpan={2}><h2>Usługa ekspresowa - wykonanie usługi do 5 godzin: dodatkowo płatna</h2></td>
              <td className={tdClass} colSpan={1}>
                <Input
                  type="number"
                  name="ilosc_usluga_ekspresowa"
                  className="h-full"
                  value={data.ilosc_usluga_ekspresowa} disabled={true}
                />
              </td>
              <td className={tdClass} colSpan={1}><h2>35</h2></td>
              <td className={tdClass} colSpan={1}>
                <Input
                  type="number"
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <th className={thClass} colSpan={3}><h2>Do zapłaty</h2></th>
              <td className={tdClass} colSpan={3}>
                <Input
                  type="number"
                  name="do_zaplaty"
                  className="h-full"
                  value={data.do_zaplaty} disabled={true}
                />
              </td>
            </tr>
            <tr>
              <th className={thClass} colSpan={3}><h2>Podpis pracownika realizującego zlecenie:</h2></th>
              <td className={tdClass} colSpan={3}>
                <Input
                  className="h-full"
                  name="podpis_pracownika_realizujacego_zlecenie"
                  value={data.podpis_pracownika_realizujacego_zlecenie} disabled={true}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  </>
)}

export default DrukUslugPralniczychAnswer;