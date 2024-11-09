package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"

	"github.com/Bvrtula/TajnyProjekcik/models"
	"golang.org/x/crypto/bcrypt"
)

func (app *application) createUser(w http.ResponseWriter, r *http.Request) {
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

func (app *application) loginUser(w http.ResponseWriter, r *http.Request) {
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

func (app *application) handleAnswers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != http.MethodPost {
		w.Header().Set("Allow", http.MethodPost)
		app.clientError(w, http.StatusMethodNotAllowed)

		return
	}

	var data models.Answer
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		app.notFound(w)
		app.errorLog.Println(err)
	}

	id, err := app.answers.SaveAnswers(data.UserId, data.WstawkaDlaGościSpecjalnych, data.KwitParkingowy, data.DrukUsługPralniczych, data.DrukSerwisowaniaŚniadańDoPokoju, data.KartaKontrolnaSprzątaniaPokoju)
	if err != nil {
		app.clientError(w, 400)
		return
	} else {
		msg := fmt.Sprint("created record with id: ", id)
		json.NewEncoder(w).Encode(msg)
	}
}

func (app *application) uploadHandler(w http.ResponseWriter, r *http.Request) {
	// Limit the file size to prevent large uploads
	r.Body = http.MaxBytesReader(w, r.Body, 10<<20) // 10 MB max upload size

	// Parse the multipart form, with a 10 MB max memory
	if err := r.ParseMultipartForm(10 << 20); err != nil {
		http.Error(w, "File too large", http.StatusBadRequest)
		return
	}

	testname := r.FormValue("testname")
	if testname == "" {
		http.Error(w, "Test name is required", http.StatusBadRequest)
		return
	}

	// Retrieve the file from the form-data
	file, handler, err := r.FormFile("pdfFile")
	if err != nil {
		http.Error(w, "Unable to retrieve file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Ensure the "uploads" directory exists
	err = os.MkdirAll("uploads", os.ModePerm)
	if err != nil {
		http.Error(w, "Could not create uploads directory", http.StatusInternalServerError)
		return
	}

	filePath := filepath.Join("uploads", handler.Filename)

	// Create a destination file within the uploads folder
	dst, err := os.Create(filePath)
	if err != nil {
		http.Error(w, "Unable to save file", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	// Copy the uploaded file data to the destination file
	if _, err := io.Copy(dst, file); err != nil {
		http.Error(w, "Failed to save file", http.StatusInternalServerError)
		return
	}

	app.pdfs.StorePDFPath(testname, handler.Filename, filePath)

	fmt.Fprintf(w, "File uploaded successfully: %s", handler.Filename)

}

func (app *application) logoutUser(w http.ResponseWriter, r *http.Request) {
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
