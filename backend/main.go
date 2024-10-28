package main

import (
	"database/sql"
	"flag"
	"log"
	"net/http"
	"os"

	"github.com/Bvrtula/TajnyProjekcik/models"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type application struct {
	errorLog *log.Logger
	infoLog  *log.Logger
	users    *models.UserModel
	answers  *models.AnswerModel
	pdfs     *models.PDFModel
}

func main() {
	addr := flag.String("addr", ":4000", "HTTP network address")
	dsn := flag.String("dsn", "root:root@/zs1?parseTime=true", "MySQL data source name")
	flag.Parse()

	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	errorLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	db, err := openDB(*dsn)
	if err != nil {
		errorLog.Fatal(err)
	}

	defer db.Close()

	app := &application{
		errorLog: errorLog,
		infoLog:  infoLog,
		users:    &models.UserModel{DB: db},
		answers:  &models.AnswerModel{DB: db},
		pdfs:     &models.PDFModel{DB: db},
	}

	// mux := http.NewServeMux()
	// mux.HandleFunc("/", app.home)

	r := mux.NewRouter()
	r.HandleFunc("/user/register", app.createUser)
	r.HandleFunc("/user/login", app.loginUser)
	r.HandleFunc("/user/handleAnswers", app.handleAnswers)
	r.HandleFunc("/teacher/upload", app.uploadHandler)
	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type"}),
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
