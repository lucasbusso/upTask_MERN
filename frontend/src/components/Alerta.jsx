const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'text-red-400' : 'text-green-500'} text-center p-3 uppercase font-semibold text-sm`}>
        {alerta.msg}
    </div>  
  )
}

export default Alerta