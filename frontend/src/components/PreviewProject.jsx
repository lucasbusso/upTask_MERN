import { Link } from "react-router-dom";

const PreviewProject = ({proyecto}) => {
  const { name, _id, client } = proyecto;
    
    return (
      <div className="border-b p-5 flex">
        <p className="flex-1 font-bold">
            {name} 
            <small className="font-semibold"> for</small>
            <span className="text-sm text-gray-500 uppercase font-semibold ">
                {' '} {client}
            </span>
        </p>
        <Link 
            to={`${_id}`}
            className="text-gray-600 hover:text-gray-700 uppercase text-sm font-bold"    
        >See project</Link>
      </div>
    );
}

export default PreviewProject