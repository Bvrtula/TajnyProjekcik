import {React, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { useToast } from "@/hooks/use-toast"

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
    email: email,
    password: password,
    }

    console.log(userData)

    fetch("http://localhost:4000/user/login", {
    method: "POST",
    headers: {
    "Content-Type": "Application/JSON",
    },
    body: JSON.stringify(userData),
    })
    .then((respose) => respose.json())
    .then((data) =>  console.log(data))
    .then(() => navigate('/teacher'))
    .catch((error) => {
      console.log(error);
      toast({
        title: "Błąd",
        description: `Nie udało się zalogować: ${error}`,
    });
})}


  return (
<>
    {/* FORM */}
    <form className='my-[2%]' onSubmit={handleSubmit}>
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl">Zaloguj się</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="jarek@zs1-swarzedz.pl" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" onChange={(e) => setPassword(e.target.value)} type="password" required />
        </div>
        <div className='flex gap-1 text-sm'>
          <p>Nie masz jeszcze konta?</p><a className='text-custom-blue' href='/register'>Zarejestruj się</a>
        </div>
        <Button className="w-full"  type="submit">Login</Button>
        
      </CardContent>
    </Card>
    </form>
    </>
  )
}

export default Login