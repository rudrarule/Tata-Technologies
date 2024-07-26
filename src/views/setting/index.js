/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
// material-ui
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Checkbox } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting, updateSetting } from 'store/settings/setting.action';
import _ from 'lodash';

// ==============================|| SETTING PAGE ||============================== //

// Frontend code
const Setting = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { setting: { setting: { data = {} } = {} } = {} } = useSelector((state) => state);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        getSettings();
    }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    const getSettings = () => {
        dispatch(getSetting(), dispatch);
    };

    useEffect(() => {
        if (!_.isEmpty(data)) {
            setFormData({ ...data });
        }
    }, [data]);

    const onEnableChange = (e) => {
        const name = e.target.name;
        const formValue = formData;
        if (formValue[name].ENABLED) formValue[name].ENABLED = e.target.checked ? 1 : 0;
        else formValue[name].Enabled = e.target.checked ? 1 : 0;
        setFormData({ ...formValue });
    };

    const onTransmitChange = (e) => {
        const name = e.target.name;
        const formValue = formData;
        if (formValue[name].AUTOTRANSMIT) formValue[name].AUTOTRANSMIT = e.target.checked ? 1 : 0;
        else formValue[name].AutoTransmit = e.target.checked ? 1 : 0;
        setFormData({ ...formValue });
    };

    const onPortChange = (e) => {
        const name = e.target.name;
        const formValue = formData;
        if (formValue[name].PORTNO) formValue[name].PORTNO = parseInt(e.target.value, 10);
        else formValue[name].PortNo = parseInt(e.target.value, 10);
        setFormData({ ...formValue });
    };

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(updateSetting(formData, afterUpdate));
    };

    const afterUpdate = (success, data) => {
        setLoading(false);
        if (success) {
        }
    };

    if (_.isEmpty(formData)) return null;

    return (
        <>
            <MainCard title="Settings">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{ backgroundColor: '#30B6E6', color: 'white' }}>
                                <TableCell style={{ width: 100, color: 'white', paddingLeft: '70px' }} align="left">
                                    Analyzer
                                </TableCell>
                                <TableCell style={{ width: 150, color: 'white', paddingLeft: '20px' }} align="left">
                                    Port No
                                </TableCell>
                                <TableCell style={{ width: 100, color: 'white', paddingLeft: '25px' }} align="left">
                                    Read
                                </TableCell>
                                <TableCell style={{ width: 100, color: 'white', paddingLeft: '25px' }} align="left">
                                    Auto Transmit
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow>
                                <TableCell style={{ paddingLeft: '70px' }}>Spectro1</TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        id="txSpectro1"
                                        variant="outlined"
                                        name="1"
                                        value={formData['1']?.PORTNO ? formData['1']?.PORTNO : formData['1']?.PortNo}
                                        onChange={onPortChange}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Checkbox
                                        checked={formData['1']?.ENABLED ? formData['1']?.ENABLED : formData['1']?.Enabled}
                                        name="1"
                                        onChange={onEnableChange}
                                        disabled
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Checkbox
                                        checked={formData['1']?.AUTOTRANSMIT ? formData['1']?.AUTOTRANSMIT : formData['1']?.AutoTransmit}
                                        name="1"
                                        onChange={onTransmitChange}
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ paddingLeft: '70px' }}>Spectro2</TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        id="txSpectro2"
                                        variant="outlined"
                                        name="2"
                                        value={formData['2']?.PORTNO ? formData['2']?.PORTNO : formData['2']?.PortNo}
                                        onChange={onPortChange}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Checkbox
                                        checked={formData['2']?.ENABLED ? formData['2']?.ENABLED : formData['2']?.Enabled}
                                        name="2"
                                        onChange={onEnableChange}
                                        disabled
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Checkbox
                                        checked={formData['2']?.AUTOTRANSMIT ? formData['2']?.AUTOTRANSMIT : formData['2']?.AutoTransmit}
                                        name="2"
                                        onChange={onTransmitChange}
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ paddingLeft: '70px' }}>Leco1</TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        id="txLeco1"
                                        variant="outlined"
                                        name="3"
                                        onChange={onPortChange}
                                        value={formData['3']?.PORTNO ? formData['3']?.PORTNO : formData['3']?.PortNo}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Checkbox
                                        checked={formData['3']?.ENABLED ? formData['3']?.ENABLED : formData['3']?.Enabled}
                                        name="3"
                                        onChange={onEnableChange}
                                        disabled
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Checkbox
                                        checked={formData['3']?.AUTOTRANSMIT ? formData['3']?.AUTOTRANSMIT : formData['3']?.AutoTransmit}
                                        name="3"
                                        onChange={onTransmitChange}
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ paddingLeft: '70px' }}>Leco2</TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        id="txLeco2"
                                        variant="outlined"
                                        name="4"
                                        onChange={onPortChange}
                                        value={formData['4']?.PORTNO ? formData['4']?.PORTNO : formData['4']?.PortNo}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Checkbox
                                        checked={formData['4']?.ENABLED ? formData['4']?.ENABLED : formData['4']?.Enabled}
                                        name="4"
                                        onChange={onEnableChange}
                                        disabled
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Checkbox
                                        checked={formData['4']?.AUTOTRANSMIT ? formData['4']?.AUTOTRANSMIT : formData['4']?.AutoTransmit}
                                        name="4"
                                        onChange={onTransmitChange}
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ paddingLeft: '70px' }}>Leco3</TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        id="txLeco3"
                                        variant="outlined"
                                        name="5"
                                        onChange={onPortChange}
                                        value={formData['5']?.PORTNO ? formData['5']?.PORTNO : formData['5']?.PortNo}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Checkbox
                                        checked={formData['5']?.ENABLED ? formData['5']?.ENABLED : formData['5']?.Enabled}
                                        name="5"
                                        onChange={onEnableChange}
                                        disabled
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Checkbox
                                        checked={formData['5']?.AUTOTRANSMIT ? formData['5']?.AUTOTRANSMIT : formData['5']?.AutoTransmit}
                                        name="5"
                                        onChange={onTransmitChange}
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ paddingLeft: '70px' }}>XRF1</TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        id="txXRF1"
                                        variant="outlined"
                                        name="6"
                                        onChange={onPortChange}
                                        value={formData['6']?.PORTNO ? formData['6']?.PORTNO : formData['6']?.PortNo}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Checkbox
                                        checked={formData['6']?.ENABLED ? formData['6']?.ENABLED : formData['6']?.Enabled}
                                        name="6"
                                        onChange={onEnableChange}
                                        disabled
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Checkbox
                                        checked={formData['6']?.AUTOTRANSMIT ? formData['6']?.AUTOTRANSMIT : formData['6']?.AutoTransmit}
                                        name="6"
                                        onChange={onTransmitChange}
                                    />
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell style={{ paddingLeft: '70px' }}>Spectro3</TableCell>
                                <TableCell>
                                    <TextField
                                        size="small"
                                        id="txSpectro3"
                                        variant="outlined"
                                        name="7"
                                        value={formData['7']?.PORTNO ? formData['7']?.PORTNO : formData['7']?.PortNo}
                                        onChange={onPortChange}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Checkbox
                                        checked={formData['7']?.ENABLED ? formData['7']?.ENABLED : formData['7']?.Enabled}
                                        name="7"
                                        onChange={onEnableChange}
                                        disabled
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    <Checkbox
                                        checked={formData['7']?.AUTOTRANSMIT ? formData['7']?.AUTOTRANSMIT : formData['7']?.AutoTransmit}
                                        name="7"
                                        onChange={onTransmitChange}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ mt: 1.5, textAlign: 'end' }}>
                    <AnimateButton>
                        <LoadingButton
                            loading={loading}
                            loadingPosition="end"
                            fullWidth={false}
                            size="medium"
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={submit}
                            style={{ paddingLeft: '80px', paddingRight: '80px', alignItems: 'end' }}
                        >
                            SAVE
                        </LoadingButton>
                    </AnimateButton>
                </Box>
            </MainCard>
        </>
    );
};

export default Setting;
