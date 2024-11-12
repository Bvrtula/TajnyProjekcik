package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/Bvrtula/TajnyProjekcik/models"
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

func (app *application) getUserIdFromSession(r *http.Request) (string, error) {
	session, err := app.sessionStore.Get(r, "auth")
	if err != nil {
		return "", err
	}

	userId, ok := session.Values["userId"].(string)
	if !ok || userId == "" {
		return "", errors.New("user not authenticated")
	}
	fmt.Print("userid ", userId)
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

	id, err := app.answers.SaveKwitParkingowy(data.NrPokoju, userId, data.ImieINazwiskoGoscia, data.OkresKorzystaniaZUslugiParkingowejOd, data.OkresKorzystaniaZUslugiParkingowejDo, data.SamochodMarki, data.NrRejestracyjny, data.PodpisPracownikaParkingu)

	if err != nil {
		app.serverError(w, err)
	}

	json.NewEncoder(w).Encode(map[string]string{"message": fmt.Sprint("succesfully insterted row with id ", id)})
}

func (app *application) serveExams(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	exams, err := app.answers.GetExams()
	if err != nil {
		app.serverError(w, err)
	}

	json.NewEncoder(w).Encode(exams)
}
