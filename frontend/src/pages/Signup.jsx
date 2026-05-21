import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../i18n/LanguageContext'

import {

User,
Mail,
Lock,
UserPlus,
Eye,
EyeOff,
Sprout,
Shield,
Zap,
ArrowLeft,
CheckCircle

} from 'lucide-react'

const BimaSetuSignup=()=>{

const navigate=useNavigate()
const { login } = useAuth()
const { t } = useLanguage()

const [formData,setFormData]=useState({

fullName:'',
email:'',
password:'',
confirmPassword:''

})

const [errors,setErrors]=useState({})

const [showPassword,setShowPassword]=useState(false)

const [showConfirmPassword,setShowConfirmPassword]=useState(false)

const [isLoading,setIsLoading]=useState(false)

const [showSuccess,setShowSuccess]=useState(false)

const validateForm=()=>{

const newErrors={}

if(!formData.fullName.trim()){

newErrors.fullName=t('auth.enterFullName')

}

if(!formData.email.trim()){

newErrors.email=t('auth.enterEmail')

}

else if(

!/^\S+@\S+\.\S+$/.test(

formData.email

)

){

newErrors.email=t('auth.validEmail')

}

if(!formData.password){

newErrors.password=t('auth.enterPassword')

}

else if(

formData.password.length<6

){

newErrors.password=

t('auth.minPassword')

}

if(

!formData.confirmPassword

){

newErrors.confirmPassword=

t('auth.confirmPwd')

}

else if(

formData.password!==

formData.confirmPassword

){

newErrors.confirmPassword=

t('auth.pwdMismatch')

}

setErrors(newErrors)

return Object.keys(

newErrors

).length===0

}

const handleSignup=(e)=>{

e.preventDefault()

setErrors({})

if(

!validateForm()

){

return

}

setIsLoading(true)

setTimeout(()=>{

login({ email: formData.email, name: formData.fullName, tokenPrefix: 'signup' })

setShowSuccess(true)

setTimeout(()=>{

navigate('/home')

},1000)

},1200)

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
py-10
"
>

<div
className="
max-w-6xl
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
space-y-8
"
>

<div

onClick={()=>{

navigate('/')

}}

className="
flex
items-center
gap-3
cursor-pointer
"

>

<Sprout
className="
w-12
h-12
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

<p
className="
text-gray-400
"
>

{t('auth.joinSubtitle')}

</p>

<div
className="
space-y-4
"
>

<div
className="
flex
gap-3
"
>

<Shield/>

{t('auth.geoVerification')}

</div>

<div
className="
flex
gap-3
"
>

<Zap/>

{t('auth.aiCropAnalysis')}

</div>

<div
className="
flex
gap-3
"
>

<CheckCircle/>

{t('auth.pmfbyCompatible')}

</div>

</div>

</div>

<div>

<div
className="
rounded-3xl
p-8
shadow-xl
"
style={{

background:

'rgba(16,35,21,0.6)',

backdropFilter:

'blur(16px)',

border:

'1px solid rgba(70,130,70,0.4)'

}}
>

<button

onClick={()=>{

navigate('/')

}}

className="
mb-6
flex
gap-2
text-gray-400
"

>

<ArrowLeft/>

{t('auth.back')}

</button>

<h2
className="
text-3xl
font-bold
text-white
text-center
mb-6
"
>

{t('auth.createAccount')}

</h2>

{

showSuccess &&

<div
className="
bg-green-900/30
border
border-green-500
rounded-xl
p-4
mb-5
text-green-300
"
>

{t('auth.accountCreated')}

</div>

}

{

Object.keys(errors).length>0 &&

<div
className="
bg-red-900/30
border
border-red-500
rounded-xl
p-4
mb-5
text-red-300
space-y-1
"
>

{

Object.values(errors)

.map(

(error,index)=>(

<div key={index}>

{error}

</div>

)

)

}

</div>

}

<form
onSubmit={handleSignup}
className="
space-y-4
"
>

<input

placeholder={t('auth.fullName')}

value={formData.fullName}

onChange={(e)=>{

setFormData({

...formData,

fullName:e.target.value

})

}}

className="
w-full
p-3
rounded-xl
bg-emerald-900/30
border
border-emerald-700
text-white
"

/>

<input

placeholder={t('auth.email')}

value={formData.email}

onChange={(e)=>{

setFormData({

...formData,

email:e.target.value

})

}}

className="
w-full
p-3
rounded-xl
bg-emerald-900/30
border
border-emerald-700
text-white
"

/>

<div className="relative">

<input

type={

showPassword

?

'text'

:

'password'

}

placeholder={t('auth.password')}

value={formData.password}

onChange={(e)=>{

setFormData({

...formData,

password:e.target.value

})

}}

className="
w-full
p-3
rounded-xl
bg-emerald-900/30
border
border-emerald-700
text-white
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
top-3
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

<div className="relative">

<input

type={

showConfirmPassword

?

'text'

:

'password'

}

placeholder={t('auth.confirmPassword')}

value={

formData.confirmPassword

}

onChange={(e)=>{

setFormData({

...formData,

confirmPassword:e.target.value

})

}}

className="
w-full
p-3
rounded-xl
bg-emerald-900/30
border
border-emerald-700
text-white
"

/>

<button

type="button"

onClick={()=>{

setShowConfirmPassword(

!showConfirmPassword

)

}}

className="
absolute
right-4
top-3
"

>

{

showConfirmPassword

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
text-black
font-bold
py-3
rounded-xl
flex
justify-center
items-center
gap-2
"

>

{

isLoading

?

t('auth.creating')

:

<>

<UserPlus/>

{t('auth.createAccount')}

</>

}

</button>

<button

type="button"

onClick={(e)=>{

e.preventDefault()

handleGoogle()

}}

className="
w-full
border
border-emerald-700
text-white
py-3
rounded-xl
"

>

{t('auth.googleSignup')}

</button>

<div
className="
text-center
text-gray-400
"
>

{t('auth.hasAccount')}

<button

type="button"

onClick={()=>{

navigate('/login')

}}

className="
text-amber-400
ml-2
"

>

{t('nav.login')}

</button>

</div>

</form>

</div>

</div>

</div>

</div>

)

}

export default BimaSetuSignup