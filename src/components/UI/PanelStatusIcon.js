import React, { useEffect, useState } from 'react';
import { CheckIcon } from '../Icons/CheckIcon';
import { WarningIcon } from '../Icons/WarningIcon';
import { InfoIcon } from '../Icons/InfoIcon';
import { get_color_bar_status } from '../../modules/DocumentControl/apis/DocumentControlCalls';

export default function PanelStatusIcon({ url }) {
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        getPanelStatus();
    }, [url]);

    const getPanelStatus = async () => {
        const result = await get_color_bar_status(url);
        setIsLoading(false);
        setStatus(result);
    }
    const icon =
        status === "OK" ?
            <CheckIcon /> :
            status === "INFO" ?
                <InfoIcon /> :
                <WarningIcon />;

    return (
        <div style={{width: 25}}>
            {
                !isLoading && icon
            }
        </div>
    );
}