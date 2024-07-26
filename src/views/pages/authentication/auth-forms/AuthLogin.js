/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import LoadingButton from '@mui/lab/LoadingButton';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login } from 'store/auth/login.action';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = () => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ user_name: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
        if (formData.user_name && formData.password) setIsSubmitting(false);
    };

    const handleBlur = (event) => {
        let value = event.target.value;
        if (!value) {
            const { user_name = '', password = '' } = formData;
            const { valid = false, message = '', field = '' } = validateFields(user_name, password);
            if (!valid) {
                setErrors({ [field]: message });
                return;
            }
        }
    };

    const validateFields = (user_name, password) => {
        if (!user_name) {
            return { valid: false, message: 'Please enter User Name', field: 'user_name' };
        } else if (!password) {
            return { valid: false, message: 'Please enter password', field: 'password' };
        } else return { valid: true, message: '', field: '' };
    };

    const submit = (e) => {
        e.preventDefault();
        const { user_name = '', password = '' } = formData;
        const { valid = false, message = '', field = '' } = validateFields(user_name, password);
        if (!valid) {
            setErrors({ [field]: message });
            return;
        }
        setLoading(true);
        dispatch(login(formData, afterLogin), dispatch);
    };

    const afterLogin = (success, data) => {
        setLoading(false);
        if (success) {
            navigate('/dashboard');
        } else {
            console.log(data);
        }
    };

    return (
        <>
            <Formik>
                <form>
                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-login">User Name</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="text"
                            value={formData.user_name}
                            name="user_name"
                            onBlur={(e) => handleBlur(e)}
                            onChange={handleChange}
                            label="User Name"
                            inputProps={{}}
                            error={errors['user_name']}
                        />
                        {errors.user_name && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                {errors['user_name']}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl fullWidth error={false} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-login"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            inputProps={{}}
                            error={errors['password']}
                        />
                        {errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>
                    <Stack direction="row" justifyContent="right" spacing={1}>
                        <Typography variant="subtitle1" color="primary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                            Forgot Password?
                        </Typography>
                    </Stack>
                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <LoadingButton
                                loading={loading}
                                loadingPosition="end"
                                disableElevation
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={submit}
                            >
                                Sign in
                            </LoadingButton>
                        </AnimateButton>
                    </Box>
                </form>
            </Formik>
        </>
    );
};

export default FirebaseLogin;
