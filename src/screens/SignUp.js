import React from 'react';
import { Image, View, Dimensions } from 'react-native';
import { BRAND_HORIZONTAL } from 'app/assets/images';
import { Divider, makeStyles } from 'react-native-elements';
import { FormView } from 'app/layouts/FormView';
import { WavyHeader } from 'app/components/WavyHeader';
import { StyledButton } from 'app/components/StyledButton';
import { TextInput } from 'app/components/TextInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Se requiere un usuario'),
  password: Yup.string().required('Se requiere una contraseña'),
  code: Yup.string().required('Ingrese su codigo de alumno'),
  name: Yup.string().required('Ingrese su nombre'),
  date: Yup.string().required('Ingrese la fecha'),
  school: Yup.string().required('Ingrese el nombre de la institucion a la que asiste'),
  grade: Yup.string().required('Ingrese el grado al que asiste'),
  phone: Yup.number().required('Ingrese el telefono'),
});

export const SignUp = ({ navigation }) => {
  const styles = useStyles();
  const formHeight = Dimensions.get('window').height;

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      name: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
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
            label={'DD/MM/YYYY'}
            value={formik.values.date}
            onChangeText={formik.handleChange('date')}
            onBlur={formik.handleBlur('date')}
            errorMessage={formik.errors.date}
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
