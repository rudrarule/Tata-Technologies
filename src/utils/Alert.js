import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import * as React from 'react';
import { Box, Collapse, Alert } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

export default function Alert(props) {
    let icon = '';
    let color = '';

    switch (props.types) {
        case 'Success':
            color = 'success';
            icon = <CheckCircleIcon />;
            break;
        case 'Warning':
            color = 'warning';
            icon = <WarningIcon />;
            break;
        case 'Error':
            color = 'danger';
            icon = <ReportIcon />;
            break;
        case 'Info':
            color = 'info';
            icon = <InfoIcon />;
            break;
    }

    return (
        <Collapse in={props.open} sx={inStyles} className={configClass}>
            <Box sx={{ display: 'flex', gap: 2, width: '100%', flexDirection: 'column' }}>
                <Alert
                    key={title}
                    sx={{ alignItems: 'flex-start' }}
                    startDecorator={React.cloneElement(icon, {
                        sx: { mt: '2px', mx: '4px' },
                        fontSize: 'xl2'
                    })}
                    variant="soft"
                    color={color}
                    endDecorator={
                        <IconButton variant="soft" size="sm" color={color} onClick={() => {}}>
                            <CloseRoundedIcon />
                        </IconButton>
                    }
                >
                    <div>
                        <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
                            This is a time-sensitive {title} Alert.
                        </Typography>
                    </div>
                </Alert>
            </Box>
        </Collapse>
    );
}
