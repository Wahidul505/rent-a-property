import { User } from "../modals/Auth";
import { useEffect } from "react";

const useUser = (user: User | undefined) => {
    useEffect(() => {
        const email = user?.email;
        const password = user?.password;
        if (email) {
            fetch(`http://localhost:5000/user?email=${email}&password=${password}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => res.json()).then(data => {
                if (data.result.acknowledged || data.token || data.email) {
                    const tokenInfo = {
                        token: data.token,
                        email: data.email
                    }
                    localStorage.setItem('TokenInfo', JSON.stringify(tokenInfo));
                }
            });
        }
    }, [user])

};

export default useUser;