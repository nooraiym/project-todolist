import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from 'hooks/hooks'
import { login } from 'middleware/auth-reducer'
import { Navigate } from 'react-router-dom'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 4) {
        errors.password = 'Password must contain 6 and more symbols'
      }
      return errors
    },
    onSubmit: values => {
      dispatch(login(values))
      // alert(JSON.stringify(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              ) : null}
              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps('password')} />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              ) : null}
              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe} />}
              />
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}

export default Login
