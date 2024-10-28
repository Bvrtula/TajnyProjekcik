package models

import (
	"database/sql"
)

type Answer struct {
	Id                              int    `json:"id"`
	UserId                          int    `json:"userId"`
	WstawkaDlaGościSpecjalnych      string `json:"wstawkaDlaGościSpecjalnych"`
	KwitParkingowy                  string `json:"kwitParkingowy"`
	DrukUsługPralniczych            string `json:"drukUsługPralniczych"`
	DrukSerwisowaniaŚniadańDoPokoju string `json:"drukSerwisowaniaŚniadańDoPokoju"`
	KartaKontrolnaSprzątaniaPokoju  string `json:"kartaKontrolnaSprzątaniaPokoju"`
}

type AnswerModel struct {
	DB *sql.DB
}

func (a *AnswerModel) SaveAnswers(userId int, wstawkaDlaGościSpecjalnych, kwitParkingowy, drukUsługPralniczych, drukSerwisowaniaŚniadańDoPokoju, kartaKontrolnaSprzątaniaPokoju string) (int, error) {
	res, err := a.DB.Exec(`INSERT INTO 
	answers (userid, wstawka_dla_gości_specjalnych, kwit_parkingowy, druk_usług_pralniczych, druk_serwisowania_śniadań_do_pokoju, karta_kontrolna_sprzątania_pokoju) 
	VALUES (?, ?, ?, ?, ?, ?)`, userId, wstawkaDlaGościSpecjalnych, kwitParkingowy, drukUsługPralniczych, drukSerwisowaniaŚniadańDoPokoju, kartaKontrolnaSprzątaniaPokoju)
	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}
