import React, { useMemo, useEffect } from "react";
import {
  Router as RouterOriginal,
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import queryString from "query-string";

import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

export function Router({ children }) {
  return (
    <RouterOriginal history={history}>
      <ScrollToTop />
      {children}
    </RouterOriginal>
  );
}

export function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
 
  return useMemo(() => {
    return {
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search),
        ...params,
      },
      match,
      location,
      history,
    };
  }, [params, match, location, history]);
}

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

export {
  Route,
  Switch,
  Link,
  NavLink,
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
