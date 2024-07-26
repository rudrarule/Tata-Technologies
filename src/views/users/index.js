/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// material-ui
import { useState, useEffect } from 'react';
import {
    FormControl,
    Select,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    MenuItem,
    Box,
    IconButton,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TablePagination
} from '@mui/material';

import { IconPlus } from '@tabler/icons';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { geUserByRole } from 'store/user/user.action';
// =============================|| SAMPLE PAGE ||============================== //

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const Users = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [Addopen, setAddOpen] = useState(false);
    const [deleteUser, setDeleteUser] = useState('');
    const [role, setRole] = useState('Guest');
    const { user: { userByRole: { data = [] } = {} } = {} } = useSelector((state) => state);
    const [formData, setFormData] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        getUsers(role);
    }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

    const getUsers = (role) => {
        dispatch(geUserByRole(role), dispatch);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        if (data.length) {
            setFormData([...data]);
        } else {
            setFormData();
        }
    }, [data]);

    const handleOpen = (i) => {
        setOpen(true);
        setDeleteUser(i);
    };

    const handleChange = (event) => {
        setRole(event.target.value);
        getUsers(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAddOpen = () => {
        setAddOpen(true);
    };
    const handleAddClose = () => {
        setAddOpen(false);
    };

    return (
        <>
            <MainCard title="Users">
                <Box sx={{ paddingLeft: '100px', paddingRight: '100px' }}>
                    <Box display="flex" flexDirection="row" justifyContent="space-between" sx={{ marginLeft: '10px', marginRight: '20px' }}>
                        <Box display="flex" flexDirection="row">
                            <Typography sx={{ marginTop: '17px' }}>Select Role :</Typography>
                            <FormControl sx={{ m: 1, width: 200 }}>
                                <Select
                                    size="small"
                                    onChange={handleChange}
                                    value={role}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value={''}>Select Role</MenuItem>
                                    <MenuItem value={'Admin'}>Admin</MenuItem>
                                    <MenuItem value={'Spectro1'}>Spectro1</MenuItem>
                                    <MenuItem value={'Spectro2'}>Spectro2</MenuItem>
                                    <MenuItem value={'Leco1'}>Leco1</MenuItem>
                                    <MenuItem value={'Leco2'}>Leco2</MenuItem>
                                    <MenuItem value={'Leco3'}>Leco3</MenuItem>
                                    <MenuItem value={'XRF1'}>XRF1</MenuItem>
                                    <MenuItem value={'Guest'}>Guest</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Button
                            startIcon={<IconPlus />}
                            variant="contained"
                            onClick={handleAddOpen}
                            sx={{ height: '35px', marginTop: '10px' }}
                        >
                            Add User
                        </Button>
                    </Box>
                    <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: '#30B6E6', color: 'white' }}>
                                    <TableCell style={{ width: 150, color: 'white', paddingLeft: '150px' }} align="left">
                                        Name
                                    </TableCell>
                                    <TableCell style={{ width: 150, color: 'white' }} align="left">
                                        Activate
                                    </TableCell>
                                    <TableCell style={{ width: 150, color: 'white', paddingLeft: '20px' }} align="left">
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {formData &&
                                    formData.length &&
                                    (rowsPerPage > 0 ? formData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : formData).map(
                                        (i, index) => (
                                            <TableRow key={index}>
                                                <TableCell style={{ paddingLeft: '150px' }} align="Left" key={index}>
                                                    {i.USER_NAME}
                                                </TableCell>
                                                <TableCell align="Left" key={index}>
                                                    {i.ACTIVE ? 'YES' : 'NO'}
                                                </TableCell>
                                                <TableCell align="Left">
                                                    <IconButton aria-label="delete" onClick={() => handleOpen(i.USER_NAME)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                            </TableBody>
                        </Table>
                        {formData?.length && (
                            <TablePagination
                                component="div"
                                count={formData?.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        )}
                    </TableContainer>
                </Box>
            </MainCard>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogContent>
                    <Grid container justifyContent="center" display="grid" sx={{ mt: 1 }}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                            <ErrorOutlineIcon className="errorIconDelete" />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                                mb: 2.5,
                                fontSize: '2rem',
                                color: '#D21E17',
                                textTransform: 'capitalize'
                            }}
                        >
                            Delete User
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align="center">Are you sure want to delete the {deleteUser}?</Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel </Button>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={Addopen}
                fullWidth={true}
                onClose={handleAddClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ fontSize: '20px' }}>
                    Add User
                </DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Enter UserName" margin="dense" id="outlined-basic" variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>Cancel </Button>
                    <Button onClick={handleAddClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Users;
