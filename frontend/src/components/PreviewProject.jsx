import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProject = ({proyecto}) => {
  const { auth } = useAuth();
  const { name, _id, client, creador } = proyecto;
    
    return (
      <div className="border-b p-5 flex flex-col md:flex-row justify-between">
        <div className="flex items-center gap-2">
          <p className="flex-1 font-bold">
              {name} 
              <small className="font-semibold"> for</small>
              <span className="text-sm text-gray-500 uppercase font-semibold ">
                  {' '} {client}
              </span>
          </p>
          {auth._id !== creador && 
            <p className="p-1 text-xs rounded bg-green-600 text-white font-semibold">Collaborator</p>
          }
        </div>
        <Link 
            to={`${_id}`}
            className="text-gray-600 hover:text-gray-700 uppercase text-sm font-bold"    
        >See project</Link>
      </div>
    );
}

export default PreviewProject