const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'text-red-400' : 'text-sky-400'} text-center p-3 uppercase text-white font-bold text-sm`}>
        {alerta.msg}
    </div>  
  )
}

export default Alerta