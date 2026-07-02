import React, {useEffect, useRef} from 'react';
import {Season} from '../utils/seasonConfig';
import {useFocusTrap} from '../utils/useFocusTrap';

interface ClientModalProps {
    isOpen: boolean;
    onClose: (e: React.MouseEvent | KeyboardEvent) => void;
    clientName: string;
    clientLogo?: string;
    clientLogoBg?: string;
    clientInitials: string;
    role: string;
    duration: string;
    summary: string[];
    tech: string[];
    season?: Season;
}

const ClientModal: React.FC<ClientModalProps> = ({
    isOpen,
    onClose,
    clientName,
    clientLogo,
    clientLogoBg,
    clientInitials,
    role,
    duration,
    summary,
    tech,
    season = 'summer',
}) => {
    const isMonsoon = season === 'monsoon';
    const dialogRef = useRef<HTMLDivElement>(null);

    useFocusTrap(isOpen, dialogRef);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose(e);
        };
        if (isOpen) window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const bg = isMonsoon
        ? 'linear-gradient(135deg, #1e293b, #0f172a, #020617)'
        : season === 'winter'
            ? 'linear-gradient(135deg, #f0f4f8, #e2ecf4, #d4e4f0)'
            : 'linear-gradient(135deg, #fffbf0, #f5eddd, #f0dbb5)';

    const borderColor = isMonsoon ? 'border-gray-700/50' : 'border-gray-200/50';
    const textColor = isMonsoon ? 'text-gray-200' : 'text-gray-700';
    const headingColor = isMonsoon ? 'text-white' : 'text-gray-800';
    const mutedColor = isMonsoon ? 'text-gray-400' : 'text-gray-500';
    const tagBg = isMonsoon ? 'rgba(91,155,213,0.12)' : 'rgba(0,0,0,0.05)';
    const tagText = isMonsoon ? '#8cbdea' : '#4a3f35';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/70 transition-opacity backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="client-modal-title"
                tabIndex={-1}
                className="relative mx-auto rounded-lg shadow-2xl overflow-hidden w-[96vw] max-w-2xl max-h-[80vh] flex flex-col"
                style={{background: bg}}
            >
                {/* Header */}
                <div className={`px-5 sm:px-8 py-4 border-b ${borderColor} flex items-center gap-4`}>
                    {clientLogo ? (
                        <img
                            src={clientLogo}
                            alt={clientName}
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 10,
                                objectFit: 'contain',
                                background: clientLogoBg || 'rgba(255,255,255,0.9)',
                                padding: 4,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.9rem',
                                fontWeight: 700,
                                background: isMonsoon ? 'rgba(91,155,213,0.15)' : 'rgba(0,0,0,0.06)',
                                color: isMonsoon ? '#8cbdea' : '#4a3f35',
                            }}
                        >
                            {clientInitials}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <h2 id="client-modal-title" className={`text-lg sm:text-xl font-bold tracking-tight ${headingColor} truncate`}>
                            {clientName}
                        </h2>
                        <p className={`text-xs sm:text-sm ${mutedColor}`}>
                            {role} &middot; {duration}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-1 rounded-full flex-shrink-0 ${
                            isMonsoon
                                ? 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
                                : 'hover:bg-gray-200/50 text-gray-600 hover:text-gray-800'
                        } transition-colors`}
                        aria-label="Close dialog"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div
                    className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-6"
                    style={{
                        background: isMonsoon ? 'rgba(15, 23, 42, 0.4)' : 'rgba(255, 255, 255, 0.4)',
                    }}
                >
                    <ul className={`space-y-3 text-sm sm:text-base ${textColor}`}>
                        {summary.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                    style={{background: isMonsoon ? '#5b9bd5' : '#d4880f'}} />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    {tech.length > 0 && (
                        <div className="mt-6">
                            <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${mutedColor}`}>
                                Tech Stack
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {tech.map((t) => (
                                    <span
                                        key={t}
                                        className="px-2.5 py-1 rounded-md text-xs font-medium"
                                        style={{background: tagBg, color: tagText}}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div
                    className={`px-5 sm:px-8 py-3 border-t ${borderColor} flex justify-end`}
                    style={{
                        background: isMonsoon ? 'rgba(15, 23, 42, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                    }}
                >
                    <button
                        onClick={onClose}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            isMonsoon
                                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                        }`}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClientModal;
