import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import Alerta from './Alerta';

const FormularioProyecto = () => {
    const [name, setName] = useState('');
    const [id, setId] = useState(null);
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [client, setClient] = useState('');

    const params = useParams();

    const { showAlert, alerta, submitProject, proyecto } = useProyectos();

    useEffect(() => {
        if( params.id ){
            setId(proyecto._id)
            setName(proyecto.name);
            setDescription(proyecto.description);
            setDeadline(proyecto.deadline?.split('T')[0]);
            setClient(proyecto.client);
        }
    }, [params]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([name, description, deadline, client].includes('')){
            showAlert({
                msg: 'All the fields are required ',
                error: true
            });
            return
        }
        //Pasar los datos al provider
        await submitProject({ id, name, description, deadline, client}); 
        setId(null);
        setName('');
        setDescription('');
        setDeadline('');
        setClient('');
    }

    const { msg } = alerta;
  return (
    <form
        className='bg-white py-10 px-5 md:w-2/3 rounded-log shadow'
        onSubmit={handleSubmit}
    >
        <div className='mb-5'>
            <label
                htmlFor='name'
                className='text-gray-700 uppercase font-bold text-sm'
                >
                Project name
            </label>
            <input
                type='text'
                id='name'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Project name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label
                htmlFor='description'
                className='text-gray-700 uppercase font-bold text-sm'
                >
                Description
            </label>
            <textarea
                type='text'
                id='description'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label
                htmlFor='deadline'
                className='text-gray-700 uppercase font-bold text-sm'
                >
                Deadline
            </label>
            <input
                type='date'
                id='deadline'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Deadline'
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label
                htmlFor='client'
                className='text-gray-700 uppercase font-bold text-sm'
                >
                Client name
            </label>
            <input
                type='text'
                id='client'
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                placeholder='Client name'
                value={client}
                onChange={(e) => setClient(e.target.value)}
            />
        </div>

        { msg && <Alerta alerta={alerta} />}

        <input 
            type='submit'
            value={id ? 'Save changes' : 'Create project'}
            className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
        />

    </form>
  )
}

export default FormularioProyecto