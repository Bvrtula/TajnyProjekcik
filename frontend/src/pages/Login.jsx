import {React, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
import { useToast } from "@/hooks/use-toast"
import { useAuth } from '@/AuthContext'

const Login = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { email, password };

    try {
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: 'include', // Allows cookies to be sent and stored
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log("User data:", data);

      // Store user data in AuthContext
      login(data); // Assume data contains { id, email, role }

      // Redirect based on role
      if (data.role === 'teacher') {
        navigate('/teacher');
      } else if (data.role === 'student') {
        navigate('/student');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: `Failed to log in`,
      });
    }
  };
 
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