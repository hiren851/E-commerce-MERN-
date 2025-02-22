import CommonForm from '@/components/common/Form';
import { loginFormControls } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/Store/auth-slice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'


const initialState = {
  email : '',
  password : ''
}
const Login = () => {

  const [formData , setFormaData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();


  function onSubmit (e){
    e.preventDefault();

    dispatch(loginUser(formData)).then((data)=> {
      if(data?.payload?.success){
        toast({
          title : data?.payload?.message,

        })
      }else{
        toast({
          title : data?.payload?.message,
          variant: "destructive"
        })
      }
      console.log(data);
    })
  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in your account</h1>
          <p className='mt-2'>Don't have an account</p>
          <Link to="/auth/register" className='font-medium text-primary hover:underline'>Register</Link>
        </div>
        <CommonForm 
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormaData}
        onSubmit={onSubmit}
        />
    </div>
  )
}

export default Login