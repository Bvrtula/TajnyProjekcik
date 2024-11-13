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
	OkresKorzystaniaZUslugiParkingowejOd string `json:"okres_korzystania_do"`
	OkresKorzystaniaZUslugiParkingowejDo string `json:"okres_korzystania_od"`
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
