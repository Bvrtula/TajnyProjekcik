package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/Bvrtula/TajnyProjekcik/models"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
)

func (app *application) register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", http.MethodPost)
		app.clientError(w, http.StatusMethodNotAllowed)

		return
	}
	var u models.User

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		app.notFound(w)
		app.errorLog.Println(err)
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		app.errorLog.Println(err)
	}

	id, err := app.users.Register(u.Firstname, u.Lastname, u.Class, u.Email, string(hashedPassword), "student")
	if err != nil {
		app.errorLog.Println(err)
	}

	if id == 0 {
		app.clientError(w, 400)
		return
	} else {
		msg := fmt.Sprint("created an user with id: ", id)
		json.NewEncoder(w).Encode(msg)
	}

}

func (app *application) login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", http.MethodPost)
		app.clientError(w, http.StatusMethodNotAllowed)

		return
	}

	var data models.User
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		app.notFound(w)
		app.errorLog.Println(err)
	}

	var user *models.User
	user, err = app.users.Login(data.Email, data.Password)
	if err != nil {
		app.clientError(w, 400)
		return
	}

	session, err := app.sessionStore.Get(r, "auth")
	if err != nil {
		app.serverError(w, err)
		return
	}
	session.Values["userId"] = user.Id
	session.Values["role"] = user.Role
	session.Save(r, w)

	json.NewEncoder(w).Encode(struct {
		Id   int    `json:"id"`
		Role string `json:"role"`
	}{
		Id:   user.Id,
		Role: user.Role,
	})
}

func (app *application) getUserIdFromSession(r *http.Request) (int, error) {
	session, err := app.sessionStore.Get(r, "auth")
	if err != nil {
		return 0, err
	}

	userId, ok := session.Values["userId"].(int)
	if !ok || userId == 0 {
		return 0, errors.New("user not authenticated")
	}
	return userId, nil
}

func (app *application) logout(w http.ResponseWriter, r *http.Request) {
	session, err := app.sessionStore.Get(r, "auth")
	if err != nil {
		app.serverError(w, err)
		return
	}

	// Clear the session
	session.Options.MaxAge = -1
	session.Save(r, w)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Logged out successfully"})
}

func (app *application) handleKwitParkingowy(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", http.MethodPost)
		app.clientError(w, http.StatusMethodNotAllowed)

		return
	}

	userId, err := app.getUserIdFromSession(r)
	if err != nil {
		app.serverError(w, err)
	}

	var data models.KwitParkingowy
	err = json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		app.notFound(w)
		app.errorLog.Println(err)
	}

	id, err := app.answers.SaveKwitParkingowy(userId, data.NrPokoju, data.ImieINazwiskoGoscia, data.OkresKorzystaniaZUslugiParkingowejOd, data.OkresKorzystaniaZUslugiParkingowejDo, data.SamochodMarki, data.NrRejestracyjny, data.PodpisPracownikaParkingu)

	if err != nil {
		app.serverError(w, err)
	}

	json.NewEncoder(w).Encode(map[string]string{"message": fmt.Sprint("succesfully insterted row with id ", id)})
}

func (app *application) handleKartaKontrolnaSprzataniaPokoju(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", http.MethodPost)
		app.clientError(w, http.StatusMethodNotAllowed)

		return
	}

	userId, err := app.getUserIdFromSession(r)
	if err != nil {
		app.serverError(w, err)
	}

	var data models.KartaKontrolnaSprzątaniaPokoju
	err = json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		app.notFound(w)
		app.errorLog.Println(err)
	}

	id, err := app.answers.SaveKartaKontrolnaSprzataniaPokoju(userId, data.NrPokoju, data.DataKontroli, data.RodzajSprzatania, data.DodatkoweZlecenie, data.PoprawnoscWykonania, data.PodpisOsobyRealizujacejKontrole)

	if err != nil {
		app.serverError(w, err)
	}

	json.NewEncoder(w).Encode(map[string]string{"message": fmt.Sprint("succesfully insterted row with id ", id)})
}

func (app *application) handleDrukSerwowaniaSniadanDoPokoju(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", http.MethodPost)
		app.clientError(w, http.StatusMethodNotAllowed)

		return
	}

	userId, err := app.getUserIdFromSession(r)
	if err != nil {
		app.serverError(w, err)
	}
	var data models.DrukSerwowaniaSniadanDoPokoju
	err = json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		app.notFound(w)
		app.errorLog.Println(err)
	}

	id, err := app.answers.SaveDrukSerwowaniaSniadanDoPokoju(
		userId,
		data.Termin,
		data.LiczbaOsob,
		data.NrPokoju,
		data.PrzedzialCzasowyOd,
		data.PrzedzialCzasowyDo,
		data.DostarczoneProdukty,
		data.KawaCzarnaIlosc,
		data.KawaZMlekiemIlosc,
		data.HerbataCzarnaIlosc,
		data.HerbataZielonaIlosc,
		data.SokPomaranczowyIlosc,
		data.SokJablkowyIlosc,
		data.PieczywoMieszaneIlosc,
		data.TostyIlosc,
		data.RogalikiIlosc,
		data.ParowkiIlosc,
		data.JajecznicaIlosc,
		data.JajkaSadzoneIlosc,
		data.DzemTruskawkowyIlosc,
		data.DzemWisniowyIlosc,
		data.MiodIlosc,
		data.OwoceSwiezeIlosc,
		data.OwoceMrozoneIlosc,
		data.JogurtNaturalnyIlosc,
		data.PodpisOsoby,
	)

	if err != nil {
		app.serverError(w, err)
	}

	json.NewEncoder(w).Encode(map[string]string{"message": fmt.Sprint("succesfully insterted row with id ", id)})
}

func (app *application) handleWstawkaDlaGosciSpecjalnych(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", http.MethodPost)
		app.clientError(w, http.StatusMethodNotAllowed)
		return
	}

	userId, err := app.getUserIdFromSession(r)
	if err != nil {
		app.serverError(w, err)
		return
	}

	var data models.WstawkaDlaGosciSpecjalnych
	err = json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		app.notFound(w)
		app.errorLog.Println(err)
		return
	}

	id, err := app.answers.SaveWstawkaDlaGosciSpecjalnych(
		userId,
		data.TerminPobytuOd, data.TerminPobytuDo, data.LiczbaOsob, data.NrPokoju,
		data.TerminWykonaniaUslugi, data.ZyczeniaDodatkowe, data.KoszPrezentowy,
		data.CenaZaWybranaWstawke, data.DodatkoweOplaty, data.RazemDoZaplaty,
		data.DataZleceniaUslugi, data.PodpisPracownikaRecepcji, data.PodpisDyrektoraHotelu,
	)
	if err != nil {
		app.serverError(w, err)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": fmt.Sprintf("Successfully inserted row with ID %d", id)})
}

func (app *application) handleDrukUslugPralniczych(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", http.MethodPost)
		app.clientError(w, http.StatusMethodNotAllowed)
		return
	}

	userId, err := app.getUserIdFromSession(r)
	if err != nil {
		app.serverError(w, err)
		return
	}

	var data models.DrukUslugPralniczych
	err = json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		app.notFound(w)
		app.errorLog.Println(err)
		return
	}

	id, err := app.answers.SaveDrukUslugPralniczych(userId, data.NazwiskoIImieGoscia, data.NrPokoju, data.DataRealizacjiUslugi, data.IloscKoszulaDamskaMeska, data.IloscSpodnicaLubSpodnieDamski, data.IloscGarniturDamski, data.IloscGarniturMeski, data.IloscUslugaEkspresowa, data.DoZaplaty, data.PodpisPracownikaRealizujacegoZlecenie)
	if err != nil {
		app.serverError(w, err)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": fmt.Sprintf("Successfully inserted row with ID %d", id)})
}

func (app *application) serveExams(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	exams, err := app.answers.GetExams()
	if err != nil {
		app.serverError(w, err)
	}

	json.NewEncoder(w).Encode(exams)
}

func (app *application) serveResults(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	idParam := vars["id"]
	id, err := strconv.Atoi(idParam)

	results, err := app.answers.ServeTestResults(id)
	if err != nil {
		app.serverError(w, err)
	}

	json.NewEncoder(w).Encode(results)
}

func (app *application) saveStudentSolvedTest(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", http.MethodPost)
		app.clientError(w, http.StatusMethodNotAllowed)
		return
	}

	userId, err := app.getUserIdFromSession(r)
	if err != nil {
		app.serverError(w, err)
		return
	}

	_, err = app.answers.SaveUserSolvedTest(userId)
	if err != nil {
		app.serverError(w, err)
		return
	}
}

func (app *application) serveDrukSerwowaniaSniadanDoPokojuAnswers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	idParam := vars["userID"]
	userID, err := strconv.Atoi(idParam)
	if err != nil {
		app.clientError(w, 400)
		return
	}

	data, err := app.answers.GetDrukSerwowaniaSniadanDoPokoju(userID)
	if err != nil {
		app.serverError(w, err)
		return
	}

	json.NewEncoder(w).Encode(data)
}
func (app *application) serveDrukUslugPralniczych(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	idParam := vars["userID"]
	userID, err := strconv.Atoi(idParam)
	if err != nil {
		app.clientError(w, 400)
		return
	}

	data, err := app.answers.GetDrukUslugPralniczych(userID)
	if err != nil {
		app.serverError(w, err)
		return
	}

	json.NewEncoder(w).Encode(data)
}
func (app *application) serveKartaKontrolnaSprzataniaPokoju(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	idParam := vars["userID"]
	userID, err := strconv.Atoi(idParam)
	if err != nil {
		app.clientError(w, 400)
		return
	}

	data, err := app.answers.GetKartaKontrolnaSprzataniaPokoju(userID)
	if err != nil {
		app.serverError(w, err)
		return
	}

	json.NewEncoder(w).Encode(data)
}
func (app *application) serveKwitParkingowy(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	idParam := vars["userID"]
	userID, err := strconv.Atoi(idParam)
	if err != nil {
		app.clientError(w, 400)
		return
	}

	data, err := app.answers.GetKwitParkingowy(userID)
	if err != nil {
		app.serverError(w, err)
		return
	}

	json.NewEncoder(w).Encode(data)
}
func (app *application) serveWstawkaDlaGosciSpecjalnych(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	idParam := vars["userID"]
	userID, err := strconv.Atoi(idParam)
	if err != nil {
		app.clientError(w, 400)
		return
	}

	data, err := app.answers.GetWstawkaDlaGosciSpecjalnych(userID)
	if err != nil {
		app.serverError(w, err)
		return
	}

	json.NewEncoder(w).Encode(data)
}
