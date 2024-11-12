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
	OkresKorzystaniaZUslugiParkingowejOd string `json:"okres_korzystania_z_uslugi_parkingowej_od"`
	OkresKorzystaniaZUslugiParkingowejDo string `json:"okres_korzystania_z_uslugi_parkingowej_do"`
	SamochodMarki                        string `json:"samochod_marki"`
	NrRejestracyjny                      string `json:"nr_rejestracyjny"`
	PodpisPracownikaParkingu             string `json:"podpis_pracownika_parkingu"`
}

type Exam struct {
	ID    int    `json:"id"`
	Nazwa string `json:"nazwa"`
	Klasa string `json:"klasa"`
	Data  string `json:"data"`
}

// func (a *AnswerModel) SaveAnswers(userId int, wstawkaDlaGościSpecjalnych, kwitParkingowy, drukUsługPralniczych, drukSerwisowaniaŚniadańDoPokoju, kartaKontrolnaSprzątaniaPokoju string) (int, error) {
// 	res, err := a.DB.Exec(`INSERT INTO
// 	answers (userid, wstawka_dla_gości_specjalnych, kwit_parkingowy, druk_usług_pralniczych, druk_serwisowania_śniadań_do_pokoju, karta_kontrolna_sprzątania_pokoju)
// 	VALUES (?, ?, ?, ?, ?, ?)`, userId, wstawkaDlaGościSpecjalnych, kwitParkingowy, drukUsługPralniczych, drukSerwisowaniaŚniadańDoPokoju, kartaKontrolnaSprzątaniaPokoju)
// 	if err != nil {
// 		return 0, err
// 	}

// 	id, err := res.LastInsertId()
// 	if err != nil {
// 		return 0, err
// 	}

// 	return int(id), nil
// }

func (a *AnswerModel) SaveKwitParkingowy(nr_pokoju, userId, imie_i_nazwisko_goscia, okres_korzystania_z_uslugi_parkingowej_od, okres_korzystania_z_uslugi_parkingowej_do, samochod_marki, nr_rejestracyjny, podpis_pracownika_parkingu string) (int, error) {
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
