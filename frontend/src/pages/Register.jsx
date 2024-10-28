import {React, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Register = () => {
  const { toast } = useToast()
  const [firstname, setFirstname] = useState()
  const [lastname, setLastname] = useState()
  const [studentClass, setStudentClass] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
    email: email,
    password: password,
    }

    console.log(userData)

    fetch("http://localhost:4000/user/register", {
    method: "POST",
    headers: {
    "Content-Type": "Application/JSON",
    },
    body: JSON.stringify(userData),
    })
    .then((respose) => respose.json())
    .then((data) =>  console.log(data))
    .then(() => navigate('/login'))
    .catch((error) => {
      console.log(error)
      toast({
        title: "Błąd",
        description: `Nie udało się utworzyć użytkownika: ${error}`,
    });
    });
  };
  return (
    <>
    {/* FORM */}
    <form className='my-[2%]' onSubmit={handleSubmit}>
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <CardTitle className="text-3xl">Rejestracja</CardTitle>
        <CardDescription>Podaj swoje informację aby utworzyć konto</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className='grid grid-cols-2 gap-4'>
          <div className="space-y-2">
            <Label htmlFor="firstname">Imię</Label>
            <Input id="firstname" type="text" onChange={(e) => setFirstname(e.target.value)} placeholder="Jan" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname">Nazwisko</Label>
            <Input id="lastname" type="text" onChange={(e) => setLastname(e.target.value)} placeholder="Kowalski" required />
          </div>
        </div> 
        <div className="space-y-2">
          <Label htmlFor="studentclass">Klasa</Label>
          <Select id="studentclass" onValueChange={value => setStudentClass(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Wybierz klasę" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup >
                <SelectItem className="hover:cursor-pointer" value="1TH">1TH</SelectItem>
                <SelectItem className="hover:cursor-pointer" value="2TH">2TH</SelectItem>
                <SelectItem className="hover:cursor-pointer" value="3TH">3TH</SelectItem>
                <SelectItem className="hover:cursor-pointer" value="4TH">4TH</SelectItem>
                <SelectItem className="hover:cursor-pointer" value="5TH">5TH</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="me@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Hasło</Label>
          <Input id="password"  type="password" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className='flex gap-1 text-sm'>
          <p>Masz już konto?</p><a className='text-custom-blue' href='/login'>Zaloguj się</a>
        </div>
        <Button className="w-full"  type="submit" onClick={console.log(firstname, lastname, studentClass, email, password)}>Register</Button>
        
      </CardContent>
    </Card>
    </form>
    </>
  )
}

export default Register