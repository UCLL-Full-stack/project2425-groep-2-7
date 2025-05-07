import UserService from '@/services/UserService';


import { useTranslation } from 'next-i18next';


import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


import React, { useState } from 'react';





const ForgotPasswordPage: React.FC = () => {


    const { t } = useTranslation();


    const [email, setEmail] = useState('');


    const [message, setMessage] = useState<string | null>(null);


    const [error, setError] = useState<string | null>(null);





    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setMessage(null);
        setError(null);

        try {


            const res = await UserService.passwordForgotten(email);


            const body = await res.json();


            if (res.ok) setMessage(body.message);


            else setError(body.message || t('general.error'));


        } catch (err: any) {


            setError(err.message || t('general.error'));


        }


    };





    return (


        <section className="p-6 min-h-screen flex flex-col items-center">


            <h3 className="mb-4">Password forgotten</h3>


            <form onSubmit={handleSubmit} className="w-full max-w-sm">


                <label className="block mb-2">Enter your email:</label>


                <input


                    type="text"


                    value={email}


                    onChange={(e) => setEmail(e.target.value)}


                    className="w-full p-2 border rounded mb-4"


                    required


                />


                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
                    Send
                </button>


            </form>


            {message && <p className="mt-4 text-green-700">{message}</p>}


            {error && <p className="mt-4 text-red-700">{error}</p>}


        </section>


    );


};





export const getServerSideProps = async (context: { locale: any }) => {


    const { locale } = context;





    return {


        props: {


            ...(await serverSideTranslations(locale ?? 'en', ['common'])),


        },


    };


};





export default ForgotPasswordPage;