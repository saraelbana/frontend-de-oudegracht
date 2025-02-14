import {useForm} from "react-hook-form";
import './RegisterForm.css';

function RegisterForm(){
    const {register, handleSubmit, formState:{errors}} = useForm();

    function handleFormSubmit(data){
    }

    return(
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <label htmlFor="username-field">
                username:
                <input type='text' id="username-field"
                       {...register("username",
                           {
                               required : {
                                   value:true,
                                   message: "Username is required"
                               },
                               maxLength :{
                                   value: 20,
                               message: "Username is too long MAX 20 characters long"
                               }
                           }
                           )
                }
                />
                {errors.username && <p>{errors.username.message}</p>}
            </label>
            <label htmlFor="password-field">
                Password:
                <input type='text' id="password-field"
                       {...register("password",
                            {
                                required :{
                                    value: true,
                                message: "Password is required"
                                },
                           minLength : {
                                    value:8,
                                message: "Password is too short MIN 8 chars"
                           },
                           validate: (value) => {
                                    if(/[0-9]/.test(value))
                                        if(/[!@#$%^&*(),.?":{}|<>]/.test(value))
                                            if(/[A-Z]/.test(value))
                                                if(/[a-z]/.test(value))
                                                    return true;
                                                else return "Password must contain at least one lowercase letter"
                                            else return "Password must contain at least one uppercase letter"
                                        else return "Password must contain at least one special character"
                                    else return "Password must contain at least one number"
                                   }
                            })
                       }
                />
                {errors.password && <p>{errors.password.message}</p>}
            </label>
            <label htmlFor="first-name-field">
                First Name:
                <input type='text' id="first-name-field" {...register("first-name")}/>
                {errors['first-name']&& <p>{errors['first-name'].message}</p>}
            </label>
            <label htmlFor="last-name-field">
                Last Name:
                <input type='text' id="last-name-field" {...register("last-name")}/>

                {errors['last-name'] && <p>{errors['last-name'].message}</p>}
            </label>
            <label htmlFor="email-field">
                Email:
                <input type='text' id="email-field" {...register("email")}/>
                {errors.email && <p>{errors.email.message}</p>}
            </label>
            <button type="button">
                Submit
            </button>
        </form>
    )
}
export default RegisterForm;