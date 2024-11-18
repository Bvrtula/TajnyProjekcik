package models

import (
	"database/sql"
)

type AnswerModel struct {
	DB *sql.DB
}

type Answer struct {
	Id                              int    `json:"id"`
	UserId                          int    `json:"userId"`
	WstawkaDlaGościSpecjalnych      string `json:"wstawkaDlaGościSpecjalnych"`
	KwitParkingowy                  string `json:"kwitParkingowy"`
	DrukUsługPralniczych            string `json:"drukUsługPralniczych"`
	DrukSerwisowaniaŚniadańDoPokoju string `json:"drukSerwisowaniaŚniadańDoPokoju"`
	KartaKontrolnaSprzątaniaPokoju  string `json:"kartaKontrolnaSprzątaniaPokoju"`
}

type KwitParkingowy struct {
	NrPokoju                             string `json:"nr_pokoju"`
	ImieINazwiskoGoscia                  string `json:"imie_i_nazwisko_goscia"`
	OkresKorzystaniaZUslugiParkingowejOd string `json:"okres_korzystania_od"`
	OkresKorzystaniaZUslugiParkingowejDo string `json:"okres_korzystania_do"`
	SamochodMarki                        string `json:"samochod_marki"`
	NrRejestracyjny                      string `json:"nr_rejestracyjny"`
	PodpisPracownikaParkingu             string `json:"podpis_pracownika"`
}

type KartaKontrolnaSprzątaniaPokoju struct {
	NrPokoju                        string `json:"nr_pokoju"`
	DataKontroli                    string `json:"data_kontroli"`
	RodzajSprzatania                string `json:"rodzaj_sprzatania"`
	DodatkoweZlecenie               string `json:"dodatkowe_zlecenie"`
	PoprawnoscWykonania             string `json:"poprawnosc_wykonania"`
	PodpisOsobyRealizujacejKontrole string `json:"podpis_osoby_realizujacej_kontrole"`
}

type DrukSerwowaniaSniadanDoPokoju struct {
	Termin                string `json:"termin"`
	LiczbaOsob            string `json:"liczba_osob"`
	NrPokoju              string `json:"nr_pokoju"`
	PrzedzialCzasowyOd    string `json:"przedzial_czasowy_od"`
	PrzedzialCzasowyDo    string `json:"przedzial_czasowy_do"`
	DostarczoneProdukty   string `json:"dostarczone_produkty"`
	KawaCzarnaIlosc       string `json:"kawa_czarna_ilosc"`
	KawaZMlekiemIlosc     string `json:"kawa_z_mlekiem_ilosc"`
	HerbataCzarnaIlosc    string `json:"herbata_czarna_ilosc"`
	HerbataZielonaIlosc   string `json:"herbata_zielona_ilosc"`
	SokPomaranczowyIlosc  string `json:"sok_pomaranczowy_ilosc"`
	SokJablkowyIlosc      string `json:"sok_jablkowy_ilosc"`
	PieczywoMieszaneIlosc string `json:"pieczywo_mieszane_ilosc"`
	TostyIlosc            string `json:"tosty_ilosc"`
	RogalikiIlosc         string `json:"rogaliki_ilosc"`
	ParowkiIlosc          string `json:"parowki_ilosc"`
	JajecznicaIlosc       string `json:"jajecznica_ilosc"`
	JajkaSadzoneIlosc     string `json:"jajka_sadzone_ilosc"`
	DzemTruskawkowyIlosc  string `json:"dzem_truskawkowy_ilosc"`
	DzemWisniowyIlosc     string `json:"dzem_wisniowy_ilosc"`
	MiodIlosc             string `json:"miod_ilosc"`
	OwoceSwiezeIlosc      string `json:"owoce_swieze_ilosc"`
	OwoceMrozoneIlosc     string `json:"owoce_mrozone_ilosc"`
	JogurtNaturalnyIlosc  string `json:"jogurt_naturalny_ilosc"`
	PodpisOsoby           string `json:"podpis_osoby"`
}

type WstawkaDlaGosciSpecjalnych struct {
	TerminPobytuOd           string `json:"termin_pobytu_od"`
	TerminPobytuDo           string `json:"termin_pobytu_do"`
	LiczbaOsob               string `json:"liczba_osob"`
	NrPokoju                 string `json:"nr_pokoju"`
	TerminWykonaniaUslugi    string `json:"termin_wykonania_uslugi"`
	ZyczeniaDodatkowe        string `json:"zyczenia_dodatkowe"`
	KoszPrezentowy           string `json:"kosz_prezentowy"`
	CenaZaWybranaWstawke     string `json:"cena_za_wybrana_wstawke"`
	DodatkoweOplaty          string `json:"dodatkowe_oplaty"`
	RazemDoZaplaty           string `json:"razem_do_zaplaty"`
	DataZleceniaUslugi       string `json:"data_zlecenia_uslugi"`
	PodpisPracownikaRecepcji string `json:"podpis_pracownika_recepcji"`
	PodpisDyrektoraHotelu    string `json:"podpis_dyrektora_hotelu"`
}

type DrukUslugPralniczych struct {
	NazwiskoIImieGoscia                   string `json:"nazwisko_i_imie_goscia"`
	NrPokoju                              string `json:"nr_pokoju"`
	DataRealizacjiUslugi                  string `json:"data_realizacji_uslugi"`
	IloscKoszulaDamskaMeska               string `json:"ilosc_koszula_damska_meska"`
	IloscSpodnicaLubSpodnieDamski         string `json:"ilosc_spódnica_lub_spodnie_damski"`
	IloscGarniturDamski                   string `json:"ilosc_garnitur_damski"`
	IloscGarniturMeski                    string `json:"ilosc_garnitur_meski"`
	IloscUslugaEkspresowa                 string `json:"ilosc_usluga_ekspresowa"`
	DoZaplaty                             string `json:"do_zaplaty"`
	PodpisPracownikaRealizujacegoZlecenie string `json:"podpis_pracownika_realizujacego_zlecenie"`
	UserID                                int    `json:"user_id"`
}

type TestResults struct {
	Id        int    `json:"id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

type Exam struct {
	ID    int    `json:"id"`
	Nazwa string `json:"nazwa"`
	Klasa string `json:"klasa"`
	Data  string `json:"data"`
}

func (a *AnswerModel) SaveKwitParkingowy(userId int, nr_pokoju, imie_i_nazwisko_goscia, okres_korzystania_z_uslugi_parkingowej_od, okres_korzystania_z_uslugi_parkingowej_do, samochod_marki, nr_rejestracyjny, podpis_pracownika_parkingu string) (int, error) {
	res, err := a.DB.Exec(`INSERT INTO 
	kwit_parkingowy (imie_i_nazwisko_goscia, okres_korzystania_z_uslugi_parkingowej_od, okres_korzystania_z_uslugi_parkingowej_do, nr_pokoju, samochod_marki, nr_rejestracyjny, podpis_pracownika_parkingu, userid) 
	VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, imie_i_nazwisko_goscia, okres_korzystania_z_uslugi_parkingowej_od, okres_korzystania_z_uslugi_parkingowej_do, nr_pokoju, samochod_marki, nr_rejestracyjny, podpis_pracownika_parkingu, userId)
	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

func (a *AnswerModel) SaveKartaKontrolnaSprzataniaPokoju(userId int, nr_pokoju, data_kontroli, rodzaj_sprzatania, dodatkowe_zlecenie, poprawnosc_wykonania, podpis_osoby_realizujacej_kontrole string) (int, error) {
	res, err := a.DB.Exec(`INSERT INTO 
	karta_kontrolna_sprzatania_pokoju (numer_pokoju, data_kontroli_pokoju, rodzaj_sprzatania_wykonanego_przez_pokojowa, dodatkowe_zlecenie_dla_pokojowej, poprawnosc_wykonania, podpis_osoby_realizujacej_kontrole, userid) 
	VALUES (?, ?, ?, ?, ?, ?, ?)`, nr_pokoju, data_kontroli, rodzaj_sprzatania, dodatkowe_zlecenie, poprawnosc_wykonania, podpis_osoby_realizujacej_kontrole, userId)
	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

func (a *AnswerModel) SaveDrukSerwowaniaSniadanDoPokoju(userId int, termin, liczba_osob, nr_pokoju, przedzial_czasowy_od, przedzial_czasowy_do, dostarczone_produkty, kawa_czarna_ilosc, kawa_z_mlekiem_ilosc, herbata_czarna_ilosc, herbata_zielona_ilosc, sok_pomaranczowy_ilosc, sok_jablkowy_ilosc, pieczywo_mieszane_ilosc, tosty_ilosc, rogaliki_ilosc, parowki_ilosc, jajecznica_ilosc, jajka_sadzone_ilosc, dzem_truskawkowy_ilosc, dzem_wisniowy_ilosc, miod_ilosc, owoce_swieze_ilosc, owoce_mrozone_ilosc, jogurt_naturalny_ilosc, podpis_osoby string) (int, error) {
	res, err := a.DB.Exec(`INSERT INTO 
	druk_serwowania_sniadan_do_pokoju (
		termin_wykonania_uslugi, liczba_osob, numer_pokoju, przedzial_czasowy_od, przedzial_czasowy_do, dostarczone_produkty, kawa_czarna,
		kawa_z_mlekiem, herbata_czarna, herbata_zielona, sok_pomaranczowy, sok_jablkowy, pieczywo_mieszane, tosty, rogaliki, parowki,
		jajecznica, jajka_sadzone, dzem_truskawkowy, dzem_wisniowy, miod, owoce_swieze, owoce_mrozone, jogurt_naturalny, podpis_osoby_realizujacej_kontrole, userid
	) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
		termin, liczba_osob, nr_pokoju, przedzial_czasowy_od, przedzial_czasowy_do, dostarczone_produkty, kawa_czarna_ilosc,
		kawa_z_mlekiem_ilosc, herbata_czarna_ilosc, herbata_zielona_ilosc, sok_pomaranczowy_ilosc, sok_jablkowy_ilosc, pieczywo_mieszane_ilosc, tosty_ilosc, rogaliki_ilosc, parowki_ilosc,
		jajecznica_ilosc, jajka_sadzone_ilosc, dzem_truskawkowy_ilosc, dzem_wisniowy_ilosc, miod_ilosc, owoce_swieze_ilosc, owoce_mrozone_ilosc, jogurt_naturalny_ilosc, podpis_osoby, userId)

	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

func (a *AnswerModel) GetExams() ([]*Exam, error) {
	rows, err := a.DB.Query(`SELECT id, nazwa, klasa, data FROM egzaminy`)
	if err != nil {
		return nil, err
	}

	defer rows.Close()
	egzams := []*Exam{}
	for rows.Next() {
		e := &Exam{}
		err := rows.Scan(&e.ID, &e.Nazwa, &e.Klasa, &e.Data)
		if err != nil {
			return nil, err
		}
		egzams = append(egzams, e)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return egzams, nil
}

func (a *AnswerModel) SaveWstawkaDlaGosciSpecjalnych(
	userId int,
	termin_pobytu_od, termin_pobytu_do, liczba_osob, nr_pokoju,
	termin_wykonania_uslugi, zyczenia_dodatkowe, kosz_prezentowy,
	cena_za_wybrana_wstawke, dodatkowe_oplaty, razem_do_zaplaty,
	data_zlecenia_uslugi, podpis_pracownika_recepcji, podpis_dyrektora_hotelu string) (int, error) {

	res, err := a.DB.Exec(`INSERT INTO 
        wstawka_dla_gosci_specjalnych 
        (termin_pobytu_od, termin_pobytu_do, liczba_osob, nr_pokoju, termin_wykonania_uslugi, zyczenia_dodatkowe, kosz_prezentowy, cena_za_wybrana_wstawke, dodatkowe_oplaty, razem_do_zaplaty, data_zlecenia_uslugi, podpis_pracownika_recepcji, podpis_dyrektora_hotelu, userid) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		termin_pobytu_od, termin_pobytu_do, liczba_osob, nr_pokoju, termin_wykonania_uslugi,
		zyczenia_dodatkowe, kosz_prezentowy, cena_za_wybrana_wstawke, dodatkowe_oplaty,
		razem_do_zaplaty, data_zlecenia_uslugi, podpis_pracownika_recepcji, podpis_dyrektora_hotelu, userId)
	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

func (a *AnswerModel) SaveDrukUslugPralniczych(
	userId int,
	nazwisko_i_imie_goscia, nr_pokoju, data_realizacji_uslugi,
	ilosc_koszula_damska_meska, ilosc_spódnica_lub_spodnie_damski,
	ilosc_garnitur_damski, ilosc_garnitur_meski, ilosc_usluga_ekspresowa,
	do_zaplaty, podpis_pracownika_realizujacego_zlecenie string,
) (int, error) {

	res, err := a.DB.Exec(`INSERT INTO 
		druk_uslug_pralniczych 
		(nazwisko_i_imie_goscia, nr_pokoju, data_realizacji_uslugi, 
		 ilosc_koszula_damska_meska, ilosc_spódnica_lub_spodnie_damski, 
		 ilosc_garnitur_damski, ilosc_garnitur_meski, ilosc_usluga_ekspresowa, 
		 do_zaplaty, podpis_pracownika_realizujacego_zlecenie, userid) 
		 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		nazwisko_i_imie_goscia, nr_pokoju, data_realizacji_uslugi,
		ilosc_koszula_damska_meska, ilosc_spódnica_lub_spodnie_damski,
		ilosc_garnitur_damski, ilosc_garnitur_meski, ilosc_usluga_ekspresowa,
		do_zaplaty, podpis_pracownika_realizujacego_zlecenie, userId)
	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

func (a *AnswerModel) ServeTestResults(testID int) ([]*TestResults, error) {
	query := `
    SELECT e.id, u.firstname, u.lastname
	FROM egzamin_testowy_odpowiedzi e
	JOIN users u ON e.userid = u.id;`

	rows, err := a.DB.Query(query, testID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	results := []*TestResults{}
	for rows.Next() {
		r := &TestResults{}
		err := rows.Scan(&r.Id, &r.Firstname, &r.Lastname)
		if err != nil {
			return nil, err
		}
		results = append(results, r)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return results, nil
}

func (a *AnswerModel) SaveUserSolvedTest(userID int) (int, error) {
	res, err := a.DB.Exec(`INSERT INTO egzamin_testowy_odpowiedzi(userid) VALUES (?)`, userID)
	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}
