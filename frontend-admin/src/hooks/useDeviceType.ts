import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceInfo {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    deviceType: DeviceType;
}

export const useDeviceType = (): DeviceInfo => {
    // Function to get device type based on width
    const getDeviceInfo = (width: number): DeviceInfo => {
        const isMobile = width < 768;       // < 768px
        const isTablet = width >= 768 && width < 1024; // 768px - 1024px
        const isDesktop = width >= 1024;    // >= 1024px
        const deviceType: DeviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
        return { isMobile, isTablet, isDesktop, deviceType };
    };

    // Initialize state with default value (SSR)
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
        if (typeof window === 'undefined') {
            return { isMobile: false, isTablet: false, isDesktop: true, deviceType: 'desktop' };
        }
        return getDeviceInfo(window.innerWidth);
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setDeviceInfo(getDeviceInfo(window.innerWidth));
        };

        // Call initial resize to sync with SSR
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return deviceInfo;
};