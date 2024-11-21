import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from '../../hooks/use-toast';
import { useParams, useNavigate } from 'react-router-dom';

const KwitParkingowyAnswer = () => {
    const { userid } = useParams();
    const navigate = useNavigate()
    console.log(userid)
    const thClass = 'p-2 border-solid border-2 border-black w-3/12';
    const tdClass = 'p-2 border-solid border-2 border-black text-left';
    const [okresKorzystaniaOd, setOkresKorzystaniaOd] = useState('');
    const [okresKorzystaniaDo, setOkresKorzystaniaDo] = useState('');
    const { toast } = useToast();
    const [data, setData] = useState({
        imie_i_nazwisko_goscia: '',
        nr_pokoju: '',
        samochod_marki: '',
        nr_rejestracyjny: '',
        podpis_pracownika: '',
        okres_korzystania_od: '',
        okres_korzystania_do: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/teacher/odpowiedzi/kwitParkingowy/${userid}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const result = await response.json();
                if (result && result[0]) {
                    const { okres_korzystania_od, okres_korzystania_do, ...rest } = result[0];
                    setData(rest);
                    setOkresKorzystaniaOd(okres_korzystania_od); 
                    setOkresKorzystaniaDo(okres_korzystania_do); 
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
        <div className='my-[3%] mx-[10%]'>
            <Button onClick={() => navigate(`/teacher/test/answertabs/${userid}`)}>Powrót</Button>
            <form onSubmit={handleSubmit}>
                <table className='w-full border-collapse'>
                    <tr>
                        <th className={`${thClass} text-center`} colSpan={4}>
                            <p>KWIT PARKINGOWY</p>
                        </th>
                    </tr>
                    <tr>
                        <td className={tdClass} colSpan={4}>
                            <h2>Imię i nazwisko gościa / lub nazwa firmy korzystającej z parkingu:</h2>
                            <div className='w-full my-2 p-1'>
                                <Input className="h-full" rows={2} name="imie_i_nazwisko_goscia" value={data.imie_i_nazwisko_goscia} disabled={true} />
                            </div>
                        </td>
                    </tr>
                    <tr>
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
                                        <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal", !okresKorzystaniaOd && "text-muted-foreground")} disabled={true}>
                                            <CalendarIcon />
                                            {okresKorzystaniaOd ? okresKorzystaniaOd : <span>Wybierz datę</span>}
                                        </Button>
                                    </PopoverTrigger>
                                </Popover>
                            </div>
                        </td>
                        <td className={tdClass} colSpan={2}>
                            <div className='flex justify-start items-center gap-3'>
                                <h2>Do:</h2>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal", !okresKorzystaniaDo && "text-muted-foreground")} disabled={true}>
                                            <CalendarIcon />
                                            {okresKorzystaniaDo ? okresKorzystaniaDo : <span>Wybierz datę</span>}
                                        </Button>
                                    </PopoverTrigger>
                                </Popover>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className={tdClass} colSpan={2}>
                            <div className='flex justify-start gap-3 flex-col'>
                                <h2 className='w-[65%]'>Numer pokoju:</h2>
                                <Input type="number" value={data.nr_pokoju} name="nr_pokoju" className="h-full" rows={1} disabled={true} />
                            </div>
                        </td>
                        <td className={tdClass} colSpan={2}>
                            <h2>Samochód marki:</h2>
                            <div className='w-full my-2 p-1'>
                                <Input className="h-full" value={data.samochod_marki} name="samochod_marki" rows={2} disabled={true} />
                            </div>
                            <h2>Nr rejestracyjny:</h2>
                            <div className='w-full my-2 p-1'>
                                <Input className="h-full" value={data.nr_rejestracyjny} name="nr_rejestracyjny" rows={2} disabled={true} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th className={thClass} colSpan={2}>Podpis pracownika parkingu</th>
                        <td className={tdClass + "h-full"} colSpan={2}><Input type="text" value={data.podpis_pracownika} name="podpis_pracownika" disabled={true} /></td>
                    </tr>
                </table>
            </form>
        </div>
    );
};

export default KwitParkingowyAnswer;