import React, { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw, Send } from 'lucide-react';

const ToastNotification = () => {
    const [notifications, setNotifications] = useState([]);

    const statusConfig = {
        success: {
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            text: 'Success',
            borderColor: 'border-green-200',
        },
        failed: {
            icon: XCircle,
            color: 'text-red-600',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            text: 'Failed'
        },
        'in-progress': {
            icon: RefreshCw,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            text: 'In progress'
        },
        submitted: {
            icon: Send,
            color: 'text-[#1966d2]',
            bgColor: 'bg-[#f0f6fe]',
            borderColor: 'border-[#1966d240]',
            text: 'Submitted'
        },

    };

    const notification = (type, message = null, duration = 3000) => {
        const id = Date.now() + Math.random();
        const config = statusConfig[type];

        if (!config) {
            console.warn(`Unknown notification type: ${type}`);
            return;
        }

        const newNotification = {
            id,
            type,
            message: message || config.text,
            ...config
        };

        setNotifications(prev => [...prev, newNotification]);

        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, duration);
    };

    // Make notification function available globally for easy access
    React.useEffect(() => {
        window.Notification = notification;
        return () => {
            delete window.Notification;
        };
    }, []);

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className="fixed z-[999] space-y-2 bottom-8 left-4 md:left-8">

            {notifications.map((notif) => {
                const IconComponent = notif.icon;

                return (
                    <div
                        key={notif.id}
                        className={`flex items-center gap-3 px-4 py-3 rounded-[.8rem] border
                                    ${notif.bgColor} ${notif.borderColor}
                                    transform transition-all duration-300 ease-in-out cursor-pointer min-w-[250px] max-w-[250px] sm:max-w-[100%] w-[100%] shadow-md`}
                        onClick={() => removeNotification(notif.id)}>
                        <IconComponent className={`w-4 h-4 md:w-7 md:h-5 ${notif.color} ${notif.type === 'in-progress' ? 'animate-spin' : ''}`} />
                        <span className={`font-medium ${notif.color} text-[.7rem] md:text-[.8rem]`}>
                            {notif.message}
                        </span>
                    </div>
                );
            })}

        </div>
    );
};

export default ToastNotification;