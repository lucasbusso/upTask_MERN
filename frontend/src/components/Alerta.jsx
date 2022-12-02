const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'text-white bg-red-500' : 'text-white bg-green-400'} text-center p-3 my-3 uppercase font-semibold text-sm rounded`}>
        {alerta.msg}
    </div>  
  )
}

export default Alerta