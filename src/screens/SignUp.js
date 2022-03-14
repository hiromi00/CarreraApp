import React from 'react';
import { Image, View, Dimensions, Alert } from 'react-native';
import { BRAND_HORIZONTAL } from 'app/assets/images';
import { Divider, makeStyles } from 'react-native-elements';
import { FormView } from 'app/layouts/FormView';
import { WavyHeader } from 'app/components/WavyHeader';
import { StyledButton } from 'app/components/StyledButton';
import { TextInput } from 'app/components/TextInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signupRequest } from 'app/services/Connection';

const useStyles = makeStyles({
  mainContainer: {
    height: '100%',
    maxHeight: '100%',
    backgroundColor: 'white',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 200,
  },
  logo: {
    height: 120,
    resizeMode: 'contain',
  },
  formContainer: {
    height: Dimensions.get('window').height - 400,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
  },
});

const signupSchema = Yup.object().shape({
  //username: Yup.string().required('Se requiere un usuario'),
  password: Yup.string().required('Se requiere una contraseña'),
  code: Yup.string().required('Ingrese su codigo de alumno'),
  name: Yup.string().required('Ingrese su nombre'),
  email: Yup.string().email().required('Ingrese su email'),
  school: Yup.string().required('Ingrese el nombre de la institucion a la que asiste'),
  grade: Yup.string().required('Ingrese el grado al que asiste'),
  phone: Yup.number().required('Ingrese el telefono'),
});

export const SignUp = ({ navigation }) => {
  const styles = useStyles();
  const formHeight = Dimensions.get('window').height;

  const formik = useFormik({
    initialValues: {
      /* username: '', */
      password: '',
      name: '',
      code: '',
      school: '',
      grade: '',
      email: ''
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log(values);
      signupRequest(values)
      .then((response) => {
        if(response.data === 1){
          Alert.alert('Echele!!!');
          navigateLogin();
        } else if (response.data === 0){
          Alert.alert('Error en la peticion');
        } else {
          Alert.alert('Ese usuario ya existe');
        }
      });
    },
  });

  const navigateLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <FormView>
      <View style={styles.mainContainer}>
        <WavyHeader height={160} top={120} backgroundColor={'#3587A4'} />
        <View style={styles.headerContainer}>
          <Image source={BRAND_HORIZONTAL} style={styles.logo} />
        </View>
        <View style={[styles.formContainer, { height: formHeight }]}>
          <TextInput
            label={'Codigo'}
            /* iconName="account-circle" */
            value={formik.values.code}
            onChangeText={formik.handleChange('code')}
            onBlur={formik.handleBlur('code')}
            errorMessage={formik.errors.code}
          />
          <TextInput
            label={'Nombre'}
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            errorMessage={formik.errors.name}
          />
          <TextInput
            label={'Email'}
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            errorMessage={formik.errors.email}
          />
          <TextInput
            label={'Password'}
            password
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            errorMessage={formik.errors.password}
          />
          <TextInput
            label={'Escuela'}
            value={formik.values.school}
            onChangeText={formik.handleChange('school')}
            onBlur={formik.handleBlur('school')}
            errorMessage={formik.errors.school}
          />
          <TextInput
            label={'Grado'}
            value={formik.values.grade}
            onChangeText={formik.handleChange('grade')}
            onBlur={formik.handleBlur('grade')}
            errorMessage={formik.errors.grade}
          />
          <TextInput
            label={'Telefono'}
            keyboardType='numeric'
            value={formik.values.phone}
            onChangeText={formik.handleChange('phone')}
            onBlur={formik.handleBlur('phone')}
            errorMessage={formik.errors.phone}
          />
          <StyledButton title={'ACEPTAR'} onPress={formik.handleSubmit} />
          <Divider orientation="horizontal" subHeader="o" />
          <StyledButton
            title={'VOLVER'}
            type="outline"
            onPress={navigateLogin}
          />
        </View>
      </View>
    </FormView>
  );
};
