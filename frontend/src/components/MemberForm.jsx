import { useState } from "react"
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const MemberForm = () => {
    const [email, setEmail] = useState('');
    const { showAlert, alerta, submitCollaborator } = useProyectos();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(email === '') {
            showAlert({
                msg: 'Fill the email field',
                error: true
            })
            return
        }

        submitCollaborator(email)
    }

    const { msg } = alerta;

    return (
        <form
            className="bg-white rounded-lg shadow py-10 px-5 md:w-2/3"
            onSubmit={handleSubmit}
        >

            {msg && <Alerta alerta={alerta} />}
            
            <div className='mb-5'>
                <label
                    htmlFor='email'
                    className='text-gray-700 uppercase font-bold text-sm'
                    >
                    Email 
                </label>
                <input
                    type='email'
                    id='email'
                    className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    placeholder='User email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div> 

            <input 
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 w-full mt-5 p-3 text-white font-bold cursor-pointer transition-colors rounded"
                value='Send invitation'
            />
        </form>
    )
}

export default MemberForm