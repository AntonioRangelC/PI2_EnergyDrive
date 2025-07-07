import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/pages/login');
      }
    }, [router]);

    return <Component {...props} />;
  };
}

export function showComponentIfIsAuthenticated(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const [show, setShow] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      console.log(token)
      if (token != 'undefined' && token != '' && token != null) {
        setShow(true);
      }
    }, [router]);

    return show ? <Component {...props} /> : <></> ;
  };
}