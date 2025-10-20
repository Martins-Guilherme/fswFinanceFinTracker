import { EyeClosed, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'

const PasswordInput = ({ placeholder = 'Digite sua senha' }) => {
  const [passwordIsVisible, setPassowordIsVisible] = useState(false)

  return (
    <div className="relative flex">
      <Input
        placeholder={placeholder}
        type={passwordIsVisible ? 'text' : 'password'}
      />
      <Button
        variant="ghost"
        className="absolute bottom-0 right-0 top-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
        onClick={() => setPassowordIsVisible((prev) => !prev)}
      >
        {passwordIsVisible ? <EyeOffIcon /> : <EyeClosed />}
      </Button>
    </div>
  )
}

export default PasswordInput
