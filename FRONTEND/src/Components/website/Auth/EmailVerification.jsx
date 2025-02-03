import React, { useCallback, useState } from 'react';
import { useMessage } from '../../../Contexts/MessageContext';
import { emailVerifying } from '../../../Api/website/HandleUserApi';
import ButtonSpinner from "../../Loaders/ButtonSpinner.jsx";

const EmailVerification = ({ isAnimating, onClose, onSwitchToReset }) => {

    const { showToast } = useMessage();
    const [veriEmail, setVeriEmail] = useState({
        email: ""
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = useCallback((e) => {
        setVeriEmail({ [e.target.name]: e.target.value });
    }, [])

    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await emailVerifying(veriEmail);
            if (res?.success) {
                showToast(res?.message, "success");
                onClose();
                onSwitchToReset();
            }
        } catch (error) {
            showToast(error?.response?.data?.message, "error");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className={`bg-white rounded-2xl shadow-lg max-w-md w-full relative ${isAnimating ? 'close' : 'open'}`}>
            <div className="p-4 py-3 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-inter font-semibold text-dark">Verify Email</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Close">
                        ✕
                    </button>
                </div>
            </div>

            <form onSubmit={handleVerifyEmail}>
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="">
                        <label className="block text-sm font-description font-medium text-gray-700 mb-1">Email<span className="text-red-500 ml-1">*</span></label>

                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center"><i className="ri-mail-line text-gray-500"></i></span>
                            <input
                                autoFocus={true}
                                className="w-full border-gray-300 font-description pl-10 border px-4 py-2.5 rounded-lg outline-none transition-shadow focus:ring-2 focus:ring-dark focus:border-dark focus:ring-offset-2"
                                type="email"
                                name="email"
                                value={veriEmail.email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="p-4 flex justify-end">
                    <button className='bg-dark px-4 py-2 rounded-lg text-white font-inter gap-x-1 items-center tracking-wide flex'>
                        {
                            isLoading ? <ButtonSpinner /> : "Verify Email"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default React.memo(EmailVerification);