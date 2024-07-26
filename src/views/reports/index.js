/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// material-ui
import * as React from 'react';
import { useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    Select,
    MenuItem,
    TableContainer,
    TableCell,
    FormControl,
    TextField,
    TableRow,
    Box,
    Typography,
    TableHead,
    IconButton,
    Grid,
    Divider
} from '@mui/material';
import { IconSearch, IconPrinter } from '@tabler/icons';
import './index.css';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { search } from 'store/reports/reports.action';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import moment from 'moment';
import { DateTimePicker } from '@mui/x-date-pickers';

// ==============================|| SAMPLE PAGE ||============================== //

// STATE DECLARATION

const Reports = () => {
    const [parameters, setParameters] = useState({ instrument: '', heatid: '', treatid: '', sampleno: '', fromTime: '', toTime: '' });
    const [headerPanelData, setHeaderPanelData] = useState({
        heatId: '',
        plant: '',
        sampleTime: dayjs(null),
        sampleNo: '',
        treatId: '',
        plantNo: '',
        laddleNo: '',
        grade: '',
        sampleType: ''
    });
    const [rows, setRows] = useState([]);
    const [instrument, setInstrument] = useState('');
    const [filterHeatId, setFilterHeatId] = useState('');
    const [fromTime, setFromTime] = useState(dayjs('13-Jan-01 18:30'));
    const [toTime, setToTime] = useState(dayjs('13-Jan-23 18:30'));
    const [lecoData, setLecoData] = useState({ H: '', N: '', O: '' });
    const [leco2Data, setLeco2Data] = useState({ C: '', S: '' });
    const [spectroData, setSpectroData] = useState({
        C: '',
        Mn: '',
        Si: '',
        S: '',
        P: '',
        Ni: '',
        Cr: '',
        Mo: '',
        Cu: '',
        Sn: '',
        Al: '',
        Alsol: '',
        Aloxy: '',
        Ti: '',
        B: '',
        V: '',
        Nb: '',
        Sb: '',
        Pb: '',
        W: '',
        Ca: '',
        N: '',
        Fe: '',
        Bsol: '',
        Boxy: '',
        K: '',
        F: ''
    });

    const dispatch = useDispatch();

    // CLEAR CONTENTS

    const clearContents = () => {
        setLecoData({ H: '', N: '', O: '' });
        setLeco2Data({ C: '', S: '' });
        setHeaderPanelData({
            heatId: '',
            plant: '',
            sampleTime: dayjs(null),
            sampleNo: '',
            treatId: '',
            plantNo: '',
            laddleNo: '',
            grade: '',
            sampleType: ''
        });
        setSpectroData({
            C: '',
            Mn: '',
            Si: '',
            S: '',
            P: '',
            Ni: '',
            Cr: '',
            Mo: '',
            Cu: '',
            Sn: '',
            Al: '',
            Alsol: '',
            Aloxy: '',
            Ti: '',
            B: '',
            V: '',
            Nb: '',
            Sb: '',
            Pb: '',
            W: '',
            Ca: '',
            N: '',
            Fe: '',
            Bsol: '',
            Boxy: '',
            K: '',
            F: ''
        });
    };

    // COMING SOON :-)

    // useEffect(() => {
    //     setInterval(() => {
    //         onFetchData({instrument:"SPECTRO1",heatid:"NAMAN",treatid:"cb23",sampleno:2,fromTime:"",toTime:""});
    //         }, 5000)
    // },[]) // eslint-disable-line react-hooks/exhaustive-deps

    // Onclick and Onchange handlers of textboxes and Drop drops

    const handleSpectro = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        let updatedValue = {};
        updatedValue = { name: value };
        setSpectroData((spectroData) => ({
            ...spectroData,
            ...updatedValue
        }));
    };

    const handleLeco = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        let updatedValue = {};
        updatedValue = { name: value };
        setLecoData((lecoData) => ({
            ...lecoData,
            ...updatedValue
        }));
    };

    const handleLeco2 = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        let updatedValue = {};
        updatedValue = { name: value };
        setLeco2Data((leco2Data) => ({
            ...leco2Data,
            ...updatedValue
        }));
    };

    const handleheaderPanel = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        let updatedValue = {};
        updatedValue = { name: value };
        setHeaderPanelData((headerPanelData) => ({
            ...headerPanelData,
            ...updatedValue
        }));
    };

    const onRowClicked = (row) => {
        onRowFetchData({
            instrument: instrument,
            heatid: row.HEATID,
            treatid: row.TREATID,
            sampleno: row.SAMPLENO,
            fromTime: '',
            toTime: ''
        });
    };

    const handleFilterByHeat = (event) => {
        setFilterHeatId(event.target.value);
    };

    const handleDropDownChange = (event) => {
        setInstrument(event.target.value);
    };

    // Fetching data

    const onFetchData = () => {
        clearContents();
        const filterObj = {
            instrument: instrument,
            heatid: filterHeatId,
            treatid: '',
            sampleno: '',
            fromTime: '',
            toTime: ''
        };
        setParameters(filterObj);
        dispatch(search(filterObj, FillData), dispatch);
    };

    const onFilterTimeFetchData = () => {
        clearContents();
        const temp1 = moment(fromTime.toString()).format('DD-MMM-YY hh:mm');
        const temp2 = moment(toTime.toString()).format('DD-MMM-YY hh:mm');

        const filterObj = {
            instrument: instrument,
            heatid: '',
            treatid: '',
            sampleno: '',
            fromTime: temp1,
            toTime: temp2
        };
        setParameters(filterObj);
        dispatch(search(filterObj, FillData), dispatch);
    };

    const onRowFetchData = (filterObj) => {
        clearContents();
        setParameters(filterObj);
        dispatch(search(filterObj, FillData), dispatch);
    };

    // Filling data in fields

    const FillData = (success, data) => {
        if (success) {
            if (
                parameters.instrument !== '' &&
                parameters.heatid === '' &&
                parameters.treatid === '' &&
                parameters.sampleno === '' &&
                parameters.fromTime === '' &&
                parameters.toTime === ''
            ) {
                setRows(data);
            } else if (
                parameters.instrument !== '' &&
                parameters.heatid !== '' &&
                parameters.treatid === '' &&
                parameters.sampleno === '' &&
                parameters.fromTime === '' &&
                parameters.toTime === ''
            ) {
                setRows(data);
            } else if (
                parameters.instrument !== '' &&
                parameters.heatid === '' &&
                parameters.treatid === '' &&
                parameters.sampleno === '' &&
                parameters.fromTime !== '' &&
                parameters.toTime !== ''
            ) {
                setRows(data);
            } else if (
                parameters.instrument !== '' &&
                parameters.heatid !== '' &&
                parameters.treatid !== '' &&
                parameters.sampleno !== '' &&
                parameters.fromTime === '' &&
                parameters.toTime === ''
            ) {
                switch (instrument) {
                    case 'LECO1':
                        setLecoData({ H: data[0].H, N: data[0].N, O: data[0].O });
                        setHeaderPanelData({
                            grade: data[0].GRADE,
                            sampleNo: data[0].SAMPLENO,
                            treatId: data[0].TREATID,
                            heatId: data[0].HEATID,
                            laddleNo: data[0].LADLENO,
                            plant: data[0].PLANT,
                            plantNo: data[0].PLANTNO,
                            sampleType: data[0].SAMPLETYPE,
                            sampleTime: data[0].TIMEOFANALYSIS
                        });
                        break;

                    case 'SPECTRO1':
                    case 'SPECTRO2':
                    case 'SPECTRO3':
                    case 'BOFCLAB':
                        setHeaderPanelData({
                            grade: data[0].GRADE,
                            sampleNo: data[0].SAMPLENO,
                            treatId: data[0].TREATID,
                            heatId: data[0].HEATID,
                            laddleNo: data[0].LADLENO,
                            plant: data[0].PLANT,
                            plantNo: data[0].PLANTNO,
                            sampleType: data[0].SAMPLETYPE,
                            sampleTime: data[0].TIMEOFANALYSIS
                        });
                        setSpectroData({
                            C: data[0].C,
                            Mn: data[0].MN,
                            Si: data[0].SI,
                            S: data[0].S,
                            P: data[0].P,
                            Ni: data[0].NI,
                            Cr: data[0].CR,
                            Mo: data[0].MO,
                            Cu: data[0].CU,
                            Sn: data[0].SN,
                            Al: data[0].AL,
                            Alsol: data[0].AL_S,
                            Aloxy: data[0].SP1,
                            Ti: data[0].TI,
                            B: data[0].B,
                            V: data[0].V,
                            Nb: data[0].NB,
                            Sb: data[0].SB,
                            Pb: data[0].PB,
                            W: data[0].W,
                            Ca: data[0].CA,
                            N: data[0].N,
                            Fe: data[0].FE,
                            Bsol: data[0].B_S,
                            K: data[0].K,
                            Boxy: data[0].B_OXY,
                            K: data[0].SP2,
                            F: data[0].SP3
                        });
                        break;

                    case 'LECO2':
                    case 'LECO3':
                        setHeaderPanelData({
                            grade: data[0].GRADE,
                            sampleNo: data[0].SAMPLENO,
                            treatId: data[0].TREATID,
                            heatId: data[0].HEATID,
                            laddleNo: data[0].LADLENO,
                            plant: data[0].PLANT,
                            plantNo: data[0].PLANTNO,
                            sampleType: data[0].SAMPLETYPE,
                            sampleTime: data[0].TIMEOFANALYSIS
                        });
                        setLeco2Data({ C: data[0].C, S: data[0].S });
                        break;

                    case 'XRF1':
                    case 'XRF2':
                        break;
                }
            }
        }
    };

    return (
        <>
            <MainCard title="Report">
                <Box
                    sx={{ marginTop: '40px', paddingLeft: '20px', paddingRight: '20px' }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                >
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        sx={{ paddingLeft: '20px', paddingRight: '20px' }}
                    >
                        <Box display="flex" flexDirection="row">
                            <Typography sx={{ marginTop: '10px' }}>Please Select the Instrument:&nbsp;</Typography>
                            <FormControl sx={{ minWidth: 140 }}>
                                <Select
                                    size="small"
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    name="Instrument"
                                    label="instrument"
                                    onChange={handleDropDownChange}
                                >
                                    <MenuItem value="SPECTRO1">Spectro1</MenuItem>
                                    <MenuItem value="SPECTRO2">Spectro2</MenuItem>
                                    <MenuItem value="LECO1">Leco1</MenuItem>
                                    <MenuItem value="LECO2">Leco2</MenuItem>
                                    <MenuItem value="LECO3">Leco3</MenuItem>
                                    <MenuItem value="XRF1">XRF1</MenuItem>
                                    <MenuItem value="XRF2">XRF2</MenuItem>
                                    <MenuItem value="SPECTRO3">Spectro3</MenuItem>
                                    <MenuItem value="BIOCLAB">BioCLab</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box display="flex" flexDirection="row">
                            <Typography sx={{ marginTop: '10px' }}>Filter By HeatId:&nbsp;</Typography>
                            <TextField
                                size="small"
                                id="outlined-basic"
                                variant="outlined"
                                value={filterHeatId}
                                onChange={handleFilterByHeat}
                            />
                            &nbsp;&nbsp;&nbsp;
                        </Box>
                        <Box display="flex" flexDirection="row">
                            &nbsp;&nbsp;&nbsp;
                            <IconButton
                                aria-label="filter"
                                sx={{ backgroundColor: '#2196F3', borderRadius: '4px', boxShadow: '0px 3px 1px -2px #00000033' }}
                                onClick={() => {
                                    onFetchData();
                                }}
                            >
                                <IconSearch color="white" />
                            </IconButton>
                        </Box>
                        <Box display="flex" flexDirection="row" justifyContent="space-around">
                            <IconButton
                                aria-label="filter"
                                sx={{ backgroundColor: '#2196F3', borderRadius: '4px', boxShadow: '0px 3px 1px -2px #00000033' }}
                                onClick={() => window.print()}
                            >
                                <IconPrinter color="white" />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box
                        sx={{ marginTop: '40px', paddingLeft: '20px', paddingRight: '20px' }}
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                    >
                        <Box display="flex" flexDirection="row">
                            <Typography sx={{ marginTop: '25px' }}>From Time:&nbsp;</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimeField']}>
                                    <DateTimePicker
                                        size="small"
                                        name="fromTime"
                                        value={fromTime}
                                        onChange={(newValue) => {
                                            setFromTime(newValue);
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>

                        <Box display="flex" flexDirection="row">
                            <Typography sx={{ marginTop: '25px' }}>To Time:&nbsp;</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimeField']}>
                                    <DateTimePicker
                                        size="small"
                                        name="toTime"
                                        value={toTime}
                                        onChange={(newValue) => {
                                            setToTime(newValue);
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>
                        <Box display="flex" flexDirection="row">
                            &nbsp;&nbsp;&nbsp;
                            <IconButton
                                aria-label="filter"
                                sx={{ backgroundColor: '#2196F3', borderRadius: '4px', boxShadow: '0px 3px 1px -2px #00000033' }}
                                onClick={() => {
                                    onFilterTimeFetchData();
                                }}
                            >
                                <IconSearch color="white" />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{ marginTop: '40px', marginBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Grid item xs={3}>
                        <Typography>Heat ID:</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="heatId"
                            value={headerPanelData.heatId}
                            onChange={handleheaderPanel}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Plant:</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="plant"
                            value={headerPanelData.plant}
                            onChange={handleheaderPanel}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Sample Time:</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="sampleTime"
                            value={moment(headerPanelData.sampleTime).format('DD-MMM-YY hh:mm a')}
                            onChange={handleheaderPanel}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Sample No:</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="sampleNo"
                            value={headerPanelData.sampleNo}
                            onChange={handleheaderPanel}
                        />
                    </Grid>
                </Box>
                <Box
                    sx={{ marginTop: '15px', marginBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Grid item xs={3}>
                        <Typography>Plant No:</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="plantNo"
                            value={headerPanelData.plantNo}
                            onChange={handleheaderPanel}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Grade:</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="grade"
                            value={headerPanelData.grade}
                            onChange={handleheaderPanel}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Sample:</Typography>
                        <FormControl sx={{ width: 191 }}>
                            <Select size="small" displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem value="HO">HO</MenuItem>
                                <MenuItem value="ST">ST</MenuItem>
                                <MenuItem value="SL">SL</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Treat ID:</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="treatId"
                            value={headerPanelData.treatId}
                            onChange={handleheaderPanel}
                        />
                    </Grid>
                </Box>
                <Box
                    sx={{ marginTop: '15px', marginBottom: '20px', paddingLeft: '20px', paddingRight: '200px' }}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Grid item xs={3}>
                        <Typography>Sample Type:</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="sampleType"
                            value={headerPanelData.sampleType}
                            onChange={handleheaderPanel}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>HM Laddle No:</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="laddleNo"
                            value={headerPanelData.laddleNo}
                            onChange={handleheaderPanel}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>Rejected</Typography>
                        <FormControl size="small" sx={{ minWidth: 191, width: '100%' }}>
                            <Select size="small" displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                                <MenuItem value="False">False</MenuItem>
                                <MenuItem value="True">True</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Box>
                <Divider />
                <Box
                    sx={{ marginTop: '20px', marginBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Grid item display="flex" direction="row" xs={2}>
                        <Typography sx={{ marginTop: '10px' }}>H:&nbsp;</Typography>
                        <TextField size="small" id="outlined-basic" variant="outlined" name="H" value={lecoData.H} onChange={handleLeco} />
                    </Grid>
                    <Grid item display="flex" direction="row" xs={2}>
                        <Typography sx={{ marginTop: '10px' }}>N:&nbsp;</Typography>
                        <TextField size="small" id="outlined-basic" variant="outlined" name="N" value={lecoData.N} onChange={handleLeco} />
                    </Grid>
                    <Grid item display="flex" direction="row" xs={2}>
                        <Typography sx={{ marginTop: '10px' }}>O:&nbsp;</Typography>
                        <TextField size="small" id="outlined-basic" variant="outlined" name="O" value={lecoData.O} onChange={handleLeco} />
                    </Grid>
                </Box>
                <Divider />
                <Box
                    sx={{ marginTop: '20px', marginBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                >
                    <Grid item display="flex" direction="row" xs={2}>
                        <Typography sx={{ marginTop: '10px' }}>C:&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="C"
                            value={leco2Data.C}
                            onChange={handleLeco2}
                        />
                    </Grid>
                    <Grid item display="flex" direction="row" xs={2}>
                        <Typography sx={{ marginTop: '10px' }}>S:&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="S"
                            value={leco2Data.S}
                            onChange={handleLeco2}
                        />
                    </Grid>
                </Box>
                <Divider />
                <Box
                    sx={{ marginTop: '20px', paddingLeft: '20px', paddingRight: '20px' }}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>C :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="C"
                            value={spectroData.C}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Mn :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Mn"
                            value={spectroData.Mn}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Si :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Si"
                            value={spectroData.Si}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>S :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="S"
                            value={spectroData.S}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>P :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="P"
                            value={spectroData.P}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Ni :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Ni"
                            value={spectroData.Ni}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Cr :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Cr"
                            value={spectroData.Cr}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Mo :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Mo"
                            value={spectroData.Mo}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Cu :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Cu"
                            value={spectroData.Cu}
                            onChange={handleSpectro}
                        />
                    </Grid>
                </Box>
                <Box
                    sx={{ marginTop: '30px', paddingLeft: '20px', paddingRight: '20px' }}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Sn :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Sn"
                            value={spectroData.Sn}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Al :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Al"
                            value={spectroData.Al}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Alsol :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Alsol"
                            value={spectroData.Alsol}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Aloxy :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Aloxy"
                            value={spectroData.Aloxy}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Ti :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Ti"
                            value={spectroData.Ti}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>B :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="B"
                            value={spectroData.B}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>V :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="V"
                            value={spectroData.V}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Nb :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Nb"
                            value={spectroData.Nb}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Sb :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Sb"
                            value={spectroData.Sb}
                            onChange={handleSpectro}
                        />
                    </Grid>
                </Box>
                <Box
                    sx={{ marginTop: '20px', marginBottom: '20px', paddingLeft: '20px', paddingRight: '20px' }}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Pb :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Pb"
                            value={spectroData.Pb}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>W :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="W"
                            value={spectroData.W}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Ca :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Ca"
                            value={spectroData.Ca}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>N :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="N"
                            value={spectroData.N}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Fe% :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Fe"
                            value={spectroData.Fe}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Bsol :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Bsol"
                            value={spectroData.Bsol}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>Boxy :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="Boxy"
                            value={spectroData.Boxy}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>K :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="K"
                            value={spectroData.K}
                            onChange={handleSpectro}
                        />
                    </Grid>
                    <Grid item sx={{ width: '75px' }}>
                        <Typography sx={{ marginTop: '10px' }}>F :&nbsp;</Typography>
                        <TextField
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            name="F"
                            value={spectroData.F}
                            onChange={handleSpectro}
                        />
                    </Grid>
                </Box>
                <Divider />
                <Box sx={{ marginTop: '30px', paddingLeft: '20px', paddingRight: '20px', marginBottom: '100px' }}>
                    <Table aria-label="a dense table" size="small">
                        <TableContainer component={Paper}>
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#30B6E6', color: 'white' }}>
                                    <TableCell style={{ width: 200, color: 'white' }} align="left">
                                        Heat Id
                                    </TableCell>
                                    <TableCell style={{ width: 200, color: 'white' }} align="left">
                                        Treat Id
                                    </TableCell>
                                    <TableCell style={{ width: 200, color: 'white' }} align="left">
                                        Sample No
                                    </TableCell>
                                    <TableCell style={{ width: 200, color: 'white' }} align="left">
                                        Plant
                                    </TableCell>
                                    <TableCell style={{ width: 200, color: 'white' }} align="left">
                                        Plant No
                                    </TableCell>
                                    <TableCell style={{ width: 200, color: 'white' }} align="left">
                                        Time
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow onClick={() => onRowClicked(row)} key={index}>
                                        <TableCell style={{ width: 200, color: 'black' }} align="left">
                                            {row.HEATID}
                                        </TableCell>
                                        <TableCell style={{ width: 200, color: 'black' }} align="left">
                                            {row.TREATID}
                                        </TableCell>
                                        <TableCell style={{ width: 200, color: 'black' }} align="left">
                                            {row.SAMPLENO.toString()}
                                        </TableCell>
                                        <TableCell style={{ width: 200, color: 'black' }} align="left">
                                            {row.PLANT}
                                        </TableCell>
                                        <TableCell style={{ width: 200, color: 'black' }} align="left">
                                            {row.PLANTNO}
                                        </TableCell>
                                        <TableCell style={{ width: 200, color: 'black' }} align="left">
                                            {row.TIMEOFANALYSIS}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </TableContainer>
                    </Table>
                </Box>
            </MainCard>
        </>
    );
};

export default Reports;
