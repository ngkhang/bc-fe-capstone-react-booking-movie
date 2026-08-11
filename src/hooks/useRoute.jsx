import { useNavigate, useParams } from "react-router-dom";

const useRoute = (keyParam = []) => {
  const param = useParams();
  const navigate = useNavigate();

  const router = {
    param,
    navigate,
  };

  if (keyParam.length) {
    let listParam = {};
    keyParam.forEach((item) => {
      listParam[item] = param[item];
    });
    return {
      ...router,
      ...listParam,
    };
  }

  return router;
};

export default useRoute;
