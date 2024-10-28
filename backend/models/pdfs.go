package models

import (
	"database/sql"
)

type PDFModel struct {
	DB *sql.DB
}

func (p *PDFModel) StorePDFPath(testname, filename, filepath string) (int, error) {
	res, err := p.DB.Exec("INSERT INTO tests (testname, filename, filepath) VALUES (?, ?, ?)", testname, filename, filepath)
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	return int(id), nil
}
