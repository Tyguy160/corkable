import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import getCurrentUser from '../api/getCurrentUser';
import AuthContext from '../context/AuthContext';
import cookie from 'cookie';

export default function useAuth() {
  // Get the auth context
  const auth = useContext(AuthContext);

  //   Fetch the query for getting the current user
  const { isLoading, data, isError } = useQuery('me', getCurrentUser);

  //   If data changes, then update the auth context
  useEffect(() => {
    try {
      if (data && data.id) {
        auth.token = cookie.parse(document.cookie).token;
        auth.login();
      } else {
        auth.logout();
        auth.token = null;
      }
    } catch (err) {
      console.error(err);
    }
  }, [data]);

  //   return { auth };
  return { auth, isLoading, data, isError };
}
