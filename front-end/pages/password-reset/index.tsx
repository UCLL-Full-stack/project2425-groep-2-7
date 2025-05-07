import UserService from '@/services/UserService';


import { useTranslation } from 'next-i18next';


import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


import { useRouter } from 'next/router';


import React, { useEffect, useState } from 'react';





const ResetPasswordPage: React.FC = () => {


    const { t } = useTranslation();


    const router = useRouter();


    const { token } = router.query as { token?: string };





    const [newPass, setNewPass] = useState('');


    const [confirmPass, setConfirmPass] = useState('');


    const [error, setError] = useState<string | null>(null);


    const [message, setMessage] = useState<string | null>(null);





    // Don’t render form until token is available


    useEffect(() => {


        if (!token) {


            setError('No token found');


        }


    }, [token, t]);





    const handleSubmit = async (e: React.FormEvent) => {


        e.preventDefault();


        setError(null);


        setMessage(null);





        // Basic client-side validation


        if (!newPass || newPass.length < 8) {


            setError('password must be at least 8 charcaters long.');


            return;


        }


        if (newPass !== confirmPass) {


            setError("Passwords don't match.");


            return;


        }





        try {
            const res = await UserService.passwordReset(token!, newPass);
            const body = await res.json();
            if (res.ok) {
                setMessage(body.message);
                setTimeout(() => void router.push('/login'), 3000);
            } else {
                setError(body.message || t('general.error'));
            }
        } catch (err: any) {
            setError(err.message || t('general.error'));
        }


    };





    if (!token) {


        return <p className="p-6">{'Loading...'}</p>;


    }





    return (


        <section className="p-6 min-h-screen flex flex-col items-center">


            <h3 className="mb-4">{'Password reset:'}</h3>


            <form onSubmit={handleSubmit} className="w-full max-w-sm">


                <div className="mb-4">


                    <label className="block mb-1">{'New password:'}</label>


                    <input


                        type="password"


                        value={newPass}


                        onChange={(e) => setNewPass(e.target.value)}


                        className="w-full p-2 border rounded"


                        required


                    />


                </div>


                <div className="mb-4">


                    <label className="block mb-1">{'Confirm password:'}</label>


                    <input


                        type="password"


                        value={confirmPass}


                        onChange={(e) => setConfirmPass(e.target.value)}


                        className="w-full p-2 border rounded"


                        required


                    />


                </div>


                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">


                    {'Save new password'}


                </button>


            </form>


            {error && <p className="mt-4 text-red-700">{error}</p>}


            {message && <p className="mt-4 text-green-700">{message}</p>}


        </section>


    );


};





export const getServerSideProps = async ({ locale }: { locale: string }) => ({


    props: {


        ...(await serverSideTranslations(locale ?? 'en', ['common'])),


    },


});





export default ResetPasswordPage;