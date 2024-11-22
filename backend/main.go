package main

import (
	"database/sql"
	"flag"
	"log"
	"net/http"
	"os"

	"github.com/Bvrtula/TajnyProjekcik/models"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	_ "github.com/mattn/go-sqlite3"
)

type application struct {
	errorLog     *log.Logger
	infoLog      *log.Logger
	users        *models.UserModel
	answers      *models.AnswerModel
	sessionStore *sessions.CookieStore
	pdfs         *models.PDFModel
}

const file string = "database.db"

func main() {
	addr := flag.String("addr", ":4000", "HTTP network address")
	flag.Parse()

	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	db, err := sql.Open("sqlite3", file)
	if err != nil {
		errorLog.Fatal(err)
	}

	defer db.Close()

	app := &application{
		errorLog:     errorLog,
		infoLog:      infoLog,
		users:        &models.UserModel{DB: db},
		answers:      &models.AnswerModel{DB: db},
		sessionStore: sessions.NewCookieStore([]byte("gustaw")),
		pdfs:         &models.PDFModel{DB: db},
	}

	app.sessionStore.Options = &sessions.Options{
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
	}

	r := mux.NewRouter()
	r.HandleFunc("/user/register", app.register)
	r.HandleFunc("/user/login", app.login)
	r.HandleFunc("/user/logout", app.logout)
	r.HandleFunc("/student/egzaminy", app.serveExams)
	r.HandleFunc("/student/egzamin/kwitParkingowy", app.handleKwitParkingowy)
	r.HandleFunc("/student/egzamin/kartaKontrolnaSprzataniaPokoju", app.handleKartaKontrolnaSprzataniaPokoju)
	r.HandleFunc("/student/egzamin/wstawkaDlaGosciSpecjalnych", app.handleWstawkaDlaGosciSpecjalnych)
	r.HandleFunc("/student/egzamin/drukSerwowaniaSniadanDoPokoju", app.handleDrukSerwowaniaSniadanDoPokoju)
	r.HandleFunc("/student/egzamin/drukUslugPralniczych", app.handleDrukUslugPralniczych)
	r.HandleFunc("/student/egzamin/zakoncz", app.saveStudentSolvedTest)
	r.HandleFunc("/teacher/odpowiedzi", app.serveResults)
	r.HandleFunc("/teacher/odpowiedzi/drukSerwowaniaSniadanDoPokoju/{userID}", app.serveDrukSerwowaniaSniadanDoPokojuAnswers)
	r.HandleFunc("/teacher/odpowiedzi/drukUslugPralniczych/{userID}", app.serveDrukUslugPralniczych)
	r.HandleFunc("/teacher/odpowiedzi/kartaKontrolnaSprzataniaPokoju/{userID}", app.serveKartaKontrolnaSprzataniaPokoju)
	r.HandleFunc("/teacher/odpowiedzi/kwitParkingowy/{userID}", app.serveKwitParkingowy)
	r.HandleFunc("/teacher/odpowiedzi/wstawkaDlaGosciSpecjalnych/{userID}", app.serveWstawkaDlaGosciSpecjalnych)
	r.HandleFunc("/user/data/{userID}", app.serveUserData)

	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:5173"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "auth"}),
		handlers.AllowCredentials(),
	)

	srv := &http.Server{
		Addr:     *addr,
		ErrorLog: errorLog,
		Handler:  corsHandler(r),
	}

	infoLog.Printf("server started on %s", *addr)
	err = srv.ListenAndServe()
	errorLog.Fatal(err)
}

func openDB(dsn string) (*sql.DB, error) {
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, err
	}
	if err = db.Ping(); err != nil {
		return nil, err
	}
	return db, nil
}
