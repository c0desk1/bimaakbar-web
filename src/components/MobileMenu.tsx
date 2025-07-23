// src/components/MobileMenu.tsx
import React, { useState, useEffect } from 'react';
import { LINKS } from '../consts';
import ThemeToggleButton from './ThemeToggleButton';

export interface MobileMenuProps extends React.HTMLAttributes<HTMLElement> {
    currentPath: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
    currentPath,
    className = '',
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [clientPathname, setClientPathname] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setClientPathname(window.location.pathname.replace(import.meta.env.BASE_URL, ''));
        }

        const handleToggle = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (typeof customEvent.detail?.isOpen === 'boolean') {
                setIsOpen(customEvent.detail.isOpen);
            }
        };

        const selfElement = document.getElementById(props.id || '');
        if (selfElement) {
            selfElement.addEventListener('mobileMenuToggle', handleToggle);
        }

        return () => {
            if (selfElement) {
                selfElement.removeEventListener('mobileMenuToggle', handleToggle);
            }
        };
    }, [props.id]);

    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        }
    }, [isOpen]);

    const getMobileLinkClass = (href: string) => {
        const pathnameToCheck = clientPathname || currentPath;

        const subpath = pathnameToCheck.match(/[^\/]+/g);
        const isActive = href === pathnameToCheck || href === '/' + (subpath?.[0] || '') || (href === '/' && pathnameToCheck === '/');

        return `text-lg ${isActive ? 'text-[var(--color-fg)] font-semibold' : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'}`;
    };

    const handleLinkClick = () => {
        setIsOpen(false);
        const selfElement = document.getElementById(props.id || '');
        if (selfElement) {
            selfElement.dispatchEvent(new CustomEvent('mobileMenuLinkClick'));
        }
    };

    return (
        <div
            role="navigation"
            aria-hidden={!isOpen}
            {...props}
            className={`md:hidden fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-[var(--color-bg)] backdrop-blur-lg transition-all duration-300 ease-in-out
                ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible -translate-y-4'} ${className}`}>
            <div className="container mx-auto flex flex-col items-center justify-center h-full gap-8">
                {LINKS.map((link) => (
                    <a
                        key={link.HREF}
                        href={link.HREF}
                        className={getMobileLinkClass(link.HREF)}
                        onClick={handleLinkClick}
                    >
                        {link.TEXT}
                    </a>
                ))}
                <div className="w-24 h-px bg-[var(--color-border)] my-2" />
                <ThemeToggleButton />
            </div>
        </div>
    );
};

export default MobileMenu;