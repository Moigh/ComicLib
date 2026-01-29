import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function NotFoundPage() {
	const navigate = useNavigate();	
  
  useEffect(() => {
    navigate('/404', { replace: true });
  }, [navigate]);

  return (
    <div className="container mt-3">
      <h3 className="mb-3">Хз ничё не нашел</h3> 
    </div>
  );
}

export default NotFoundPage;