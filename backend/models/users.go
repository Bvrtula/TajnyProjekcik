package models

import (
	"database/sql"
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id        int    `json:"id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Class     string `json:"class"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type UserModel struct {
	DB *sql.DB
}

var ErrNoRecord = errors.New("models: no matching record found")

func (u *UserModel) Register(email, password string) (int, error) {
	res, err := u.DB.Exec(`INSERT INTO users (email, password) VALUES (?, ?)`, email, password)
	if err != nil {
		return 0, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}

func (u *UserModel) Login(email, password string) (*User, error) {
	row := u.DB.QueryRow(`SELECT id, email, password FROM users WHERE email=?`, email)
	user := &User{}
	err := row.Scan(&user.Id, &user.Email, &user.Password)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNoRecord
		}
		return nil, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return nil, err
	}
	return user, nil
}
