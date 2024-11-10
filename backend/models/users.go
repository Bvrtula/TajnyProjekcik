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
	Role      string `json:"role"`
}

type UserModel struct {
	DB *sql.DB
}

var ErrNoRecord = errors.New("models: no matching record found")

func (u *UserModel) Register(firstname, lastname, class, email, password, role string) (int, error) {
	res, err := u.DB.Exec(`INSERT INTO users (firstname, lastname, class, email, password, role) VALUES (?, ?, ?, ?, ?, ?)`, firstname, lastname, class, email, password, role)
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
	row := u.DB.QueryRow(`SELECT id, email, password, role FROM users WHERE email=?`, email)
	user := &User{}
	err := row.Scan(&user.Id, &user.Email, &user.Password, &user.Role)
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
