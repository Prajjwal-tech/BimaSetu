import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'

import {

Mail,
Lock,
LogIn,
CheckCircle,
Eye,
EyeOff,
Sprout,
Shield,
Zap

} from 'lucide-react'

const BimaSetuLogin=()=>{

const navigate=useNavigate()
const { login } = useAuth()
const { t } = useLanguage()

const [formData,setFormData]=useState({

email:'',
password:''

})

const [showPassword,setShowPassword]=useState(false)

const [isLoading,setIsLoading]=useState(false)

const [error,setError]=useState('')

const handleLogin=(e)=>{

e.preventDefault()

setError('')

if(

!formData.email

){

setError(

t('auth.enterEmail')

)

return

}

if(

!formData.password

){

setError(

t('auth.enterPassword')

)

return

}

setIsLoading(true)

setTimeout(()=>{

login({ email: formData.email, tokenPrefix: 'token' })

navigate('/home')

},1000)

}

const handleGoogle=()=>{

setIsLoading(true)

setTimeout(()=>{

login({ email: 'google@gmail.com', name: 'Google User', tokenPrefix: 'google' })

navigate('/home')

},1000)

}

return(

<div
className="
min-h-screen
bg-gradient-to-br
from-[#0A120E]
via-[#0D1811]
to-[#0A120E]
flex
justify-center
items-center
px-4
"
>

<div
className="
max-w-5xl
w-full
grid
md:grid-cols-2
gap-10
"
>

<div
className="
hidden
md:flex
flex-col
justify-center
space-y-6
"
>

<div
className="
flex
items-center
gap-3
"
>

<Sprout
className="
w-10
h-10
text-amber-500
"
/>

<span
className="
text-4xl
font-bold
bg-gradient-to-r
from-emerald-300
to-amber-400
bg-clip-text
text-transparent
"
>

BimaSetu

</span>

</div>

<h1
className="
text-5xl
font-bold
text-white
"
>

{t('auth.aiCropDamage')}

<span
className="
block
text-amber-500
"
>

{t('auth.assessment')}

</span>

</h1>

<div
className="
space-y-3
"
>

<div
className="
flex
gap-3
"
>

<Shield/>

{t('auth.geoVerified')}

</div>

<div
className="
flex
gap-3
"
>

<Zap/>

{t('auth.aiAnalysis')}

</div>

<div
className="
flex
gap-3
"
>

<CheckCircle/>

{t('auth.pmfbyReports')}

</div>

</div>

</div>

<div>

<div
className="
rounded-3xl
p-8
shadow-2xl
bg-[#102315AA]
border
border-emerald-700
"
>

<h2
className="
text-4xl
font-bold
text-center
text-white
mb-2
"
>

{t('auth.welcomeBack')}

</h2>

<p
className="
text-center
text-gray-400
mb-8
"
>

{t('auth.signInContinue')}

</p>

{

error &&

<div
className="
bg-red-900/30
border
border-red-500
p-3
rounded-xl
text-red-300
mb-5
"
>

{error}

</div>

}

<form
onSubmit={handleLogin}
className="
space-y-5
"
>

<div
className="
relative
"
>

<Mail
className="
absolute
left-4
top-4
text-gray-500
"
/>

<input

type="email"

placeholder={t('auth.enterEmail')}

value={formData.email}

onChange={(e)=>{

setFormData({

...formData,

email:e.target.value

})

}}

className="
w-full
pl-12
py-3
rounded-xl
bg-gray-100
text-black
"
/>

</div>

<div
className="
relative
"
>

<Lock
className="
absolute
left-4
top-4
text-gray-500
"
/>

<input

type={

showPassword

?

'text'

:

'password'

}

placeholder={t('auth.enterPassword')}

value={formData.password}

onChange={(e)=>{

setFormData({

...formData,

password:e.target.value

})

}}

className="
w-full
pl-12
pr-12
py-3
rounded-xl
bg-gray-100
text-black
"
/>

<button

type="button"

onClick={()=>{

setShowPassword(

!showPassword

)

}}

className="
absolute
right-4
top-4
"

>

{

showPassword

?

<EyeOff/>

:

<Eye/>

}

</button>

</div>

<button

type="submit"

disabled={isLoading}

className="
w-full
bg-amber-500
py-3
rounded-xl
font-bold
flex
justify-center
gap-2
"

>

{

isLoading

?

t('auth.loadingBtn')

:

<>

<LogIn/>

{t('nav.login')}

</>

}

</button>

<button

type="button"

onClick={handleGoogle}

className="
w-full
border
border-emerald-700
py-3
rounded-xl
text-white
"

>

{t('auth.googleLogin')}

</button>

<div
className="
text-center
text-gray-400
"
>

{t('auth.noAccount')}

<button

type="button"

onClick={()=>{

navigate('/signup')

}}

className="
text-amber-400
ml-2
"

>

{t('nav.signup')}

</button>

</div>

</form>

</div>

</div>

</div>

</div>

)

}

export default BimaSetuLogin