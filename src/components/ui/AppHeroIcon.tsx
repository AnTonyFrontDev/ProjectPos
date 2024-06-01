// AppHeroIcon.tsx
import React from 'react';
import { APP_HERO_ICONS } from "@/shared/constants/icons-constants";

export interface AppIconProps {
    type: keyof typeof APP_HERO_ICONS;
    wrapperClassName?: string;
    iconClassName?: string;
    width?: number;
    height?: number;
    children?: React.ReactNode;
}

export const AppHeroIcon = (props: AppIconProps) => {
    const { type, wrapperClassName, iconClassName, width = 68, height = 68, children } = props;
    const IconComponent = APP_HERO_ICONS[type];

    return (
        <div className={`flex items-center gap-1 ${wrapperClassName || ''}`}>
            <IconComponent className={iconClassName} width={width} height={height} />
            {children}
        </div>
    );
}